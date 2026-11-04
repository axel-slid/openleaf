/* HTML previews never run page scripts; editing keeps the original scripts and LaTeX in the saved source. */
window.OpenleafHtmlEditor = (() => {
  function create({ editable = false, onChange = () => {}, onOpenDocument = () => {} } = {}) {
    const frame = document.createElement("iframe");
    frame.className = "html-live-frame";
    frame.title = editable ? "Visual HTML editor" : "Live HTML preview";
    frame.setAttribute("sandbox", "allow-same-origin");
    let sourceDocument, sourceText = "", fileUrl = "", scrollTop = 0;
    const matrixIntents=new Map(), matrixPins=new Map(), runManifests=new Map();
    const matrixPreviewCache = new Map();

    function serialize() {
      const body = frame.contentDocument.body.cloneNode(true);
      body.querySelectorAll("[data-openleaf-video-player]").forEach((player) => player.remove());
      body.querySelectorAll("[data-openleaf-plot-player],[data-openleaf-matrix-player]").forEach((player) => player.remove());
      body.querySelectorAll(".openleaf-matrix-ready").forEach((block) => block.classList.remove("openleaf-matrix-ready"));
      body.querySelectorAll(".openleaf-matrix-pinned").forEach((block) => block.classList.remove("openleaf-matrix-pinned"));
      body.querySelectorAll(".openleaf-plot-ready").forEach((block) => block.classList.remove("openleaf-plot-ready"));
      body.querySelectorAll("[data-openleaf-latex]").forEach((token) => {
        token.replaceWith(body.ownerDocument.createTextNode(token.dataset.openleafLatex));
      });
      const clean = sourceDocument.cloneNode(true);
      clean.body.innerHTML = body.innerHTML;
      return (sourceDocument.doctype ? "<!DOCTYPE html>\n" : "") + clean.documentElement.outerHTML;
    }

    async function readLocalJson(path, base, signal) {
      const url = new URL(path, base);
      if (url.protocol !== "file:" || !/\.json$/i.test(url.pathname)) throw new Error("Expected local JSON data");
      const response = await fetch(url.href, { cache: "no-store", signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error("Could not read local JSON data");
      return { value: await response.json(), url: url.href };
    }

    function renderMatrices(doc) {
      const labels={pending:"Pending",queued:"Queued",running:"Running",failed:"Failed",unknown:"Unknown",completed:"Done",unqualified:"Done",blocked:"Blocked",cancelled:"Cancelled",prepared:"Prepared",awaiting_initial:"Awaiting initial"};
      const style=doc.createElement("style");
      style.textContent=`table.openleaf-matrix-ready{display:none!important}
        .openleaf-benchmark-matrix{width:100%;table-layout:fixed;border-collapse:separate;border-spacing:2px;margin:16px 0;font:11px/1.25 Georgia,"Times New Roman",serif;color:#344653;font-variant-numeric:tabular-nums}
        .openleaf-benchmark-matrix th{padding:7px 1px;text-align:center;font-size:9px;font-weight:normal;line-height:1.2;white-space:pre-line;border:0;border-bottom:1px solid #c5cfd4;color:#556472;background:white;overflow-wrap:anywhere}
        .openleaf-benchmark-matrix td{height:32px;box-sizing:border-box;padding:4px 1px;text-align:center;font:14px/1 Georgia,serif;border:0;color:#8a7549;background:#faf3df;border-radius:2px;white-space:nowrap}
        .openleaf-benchmark-matrix th:first-child,.openleaf-benchmark-matrix td:first-child{width:58px;text-align:left;padding-left:0;background:white;color:#344653;font-size:10px;border-radius:0}
        .openleaf-benchmark-matrix td[data-state=running]{background:#dfeef8;color:#2675a5}
        .openleaf-benchmark-matrix td[data-state=completed],.openleaf-benchmark-matrix td[data-state=unqualified]{background:#e5f1e9;color:#32654b}
        .openleaf-benchmark-matrix td[data-state=failed]{background:#f7e2e1;color:#a3504c}
        .openleaf-benchmark-matrix td[data-state=blocked],.openleaf-benchmark-matrix td[data-state=cancelled],.openleaf-benchmark-matrix td[data-state=unknown],.openleaf-benchmark-matrix [data-availability=occupied]{background:#eceff1!important;color:#7b858c!important}
        .openleaf-benchmark-matrix td[data-graph-link]{cursor:pointer}
        .openleaf-benchmark-matrix td[data-selected=true]{box-shadow:inset 0 0 0 1px #698ca3}
        .openleaf-benchmark-matrix td[data-graph-link]:hover,.openleaf-benchmark-matrix td[data-graph-link]:focus{outline:1px solid #68899e;outline-offset:-1px}
      `;doc.head.append(style);
      doc.querySelectorAll("table[data-openleaf-benchmark-matrix]").forEach(block=>{
        const matrixId=block.dataset.openleafMatrixId || "default",selected=()=>matrixIntents.get(matrixId);
        const wrapper=doc.createElement("div");wrapper.dataset.openleafMatrixPlayer="";wrapper.contentEditable="false";wrapper.style.cssText="width:100%;max-width:100%;position:relative";
        wrapper.setAttribute("aria-label","Production comparison matrix");
        const table=doc.createElement("table");table.className="openleaf-benchmark-matrix";table.setAttribute("aria-label","Measured GPU and pipeline comparisons");wrapper.append(table);block.after(wrapper);
        const preview=doc.createElement("div"),title=doc.createElement("div"),status=doc.createElement("span"),eta=doc.createElement("span"),detail=doc.createElement("div");
        preview.dataset.openleafMatrixPreview="";preview.hidden=true;preview.id="matrix-tip-"+Math.random().toString(36).slice(2);preview.setAttribute("role","tooltip");
        preview.style.cssText="position:fixed;z-index:10000;box-sizing:border-box;width:250px;max-width:calc(100vw - 24px);padding:10px 12px;background:white;border:1px solid #ccd6dc;box-shadow:0 4px 16px #20394a14;font:12px/1.45 Georgia,serif;color:#344653;pointer-events:none";
        title.style.cssText="margin-bottom:4px;font-size:11px;color:#667783";eta.dataset.openleafCellEta="";eta.style.cssText="font-size:15px;font-variant-numeric:tabular-nums";
        detail.style.cssText="font-size:11px;color:#71808b;margin-top:3px";preview.append(title,status,doc.createTextNode(" · "),eta,detail);wrapper.append(preview);
        let active=null,hoverBase=null,hoverTimer=null,hideTimer=null,revision=0,fingerprint="",refreshing=false;
        function info(cell,gpu){
          const state=cell.state || "pending",paused=(gpu.enabled===false || gpu.availability==="occupied")&&!["completed","unqualified","failed"].includes(state);
          const stateLabel=paused ? "Paused":labels[state] || "Pending";let clock="—";
          const value=cell.estimated_ready_at;let target=typeof value==="number" ? value*(value<1e12?1000:1):typeof value==="string" ? Date.parse(value):NaN;
          const evidence=typeof cell.eta_evidence==="string" ? cell.eta_evidence.trim():"";
          const duration=cell.estimated_duration_s,offset=cell.estimated_offset_s,budget=Number.isFinite(duration)&&duration>0&&Number.isFinite(offset)&&offset>=0 ? duration+offset:NaN;
          if(!Number.isFinite(target)&&Number.isFinite(cell.scheduler_start_unix_s)&&Number.isFinite(budget))target=(cell.scheduler_start_unix_s+budget)*1000;
          if(!paused&&!["completed","unqualified","failed","blocked","cancelled"].includes(state)&&evidence){
            if(Number.isFinite(target)){const seconds=Math.ceil((target-Date.now())/1000);if(seconds<=0)clock=state==="queued"?"Start unknown":"ETA unavailable";else{const h=Math.floor(seconds/3600),m=Math.floor(seconds%3600/60),s=seconds%60;clock="~"+(h?h+":"+String(m).padStart(2,"0"):m)+":"+String(s).padStart(2,"0");}}
            else if(Number.isFinite(budget)){const minutes=Math.ceil(budget/60);clock="~"+(Math.floor(minutes/60)?Math.floor(minutes/60)+"h ":"")+(minutes%60)+"m"+(cell.eta_waiting_for_allocation ? " + queue":"");}
          }
          if(state==="queued"&&cell.scheduler_state==="PENDING"&&Number.isFinite(cell.scheduler_checked_unix_s)&&!Number.isFinite(target)&&!Number.isFinite(cell.scheduler_start_unix_s))clock="Start unknown";
          const done=["completed","unqualified"].includes(state),run=runManifests.get(matrixId)?.value?.runs?.find(r=>r.id===cell.run_id),elapsed=Number.isFinite(cell.wall_seconds)?cell.wall_seconds:run?.progress?.runtime_s;
          if(done&&Number.isFinite(elapsed)&&elapsed>=0){const seconds=Math.round(elapsed),h=Math.floor(seconds/3600),m=Math.floor(seconds%3600/60),s=seconds%60;clock=(h?h+"h ":"")+(m?m+"m ":"")+s+"s elapsed";}
          const mark=done?"✓":paused||["blocked","cancelled","unknown"].includes(state)?"—":state==="failed"?"×":state==="running"?"●":"○";
          const schedulerReason=typeof cell.scheduler_reason==="string"&&!/^(Unknown|None|\(None\))$/i.test(cell.scheduler_reason)?cell.scheduler_reason:"";
          const partition=typeof cell.scheduler_partition==="string"?cell.scheduler_partition:"";
          const stage=typeof run?.progress?.stage==="string"&&!/^(unknown|telemetry missing|pending)$/i.test(run.progress.stage)?run.progress.stage:"";
          const reason=cell.blocked_reason || (state==="queued"?[schedulerReason?"Queue: "+schedulerReason:"",partition?"Partition: "+partition:""].filter(Boolean).join(" · "):state==="running"&&stage?"Stage: "+stage:"");
          const checked=Number.isFinite(cell.scheduler_checked_unix_s)?"Queue checked "+new Date(cell.scheduler_checked_unix_s*1000).toLocaleTimeString():"";
          return {state,stateLabel,clock,mark,evidence:done?"":[evidence,cell.eta_basis || "",checked].filter(Boolean).join(" · "),reason,done};
        }
        function updateTooltip(){if(!active || preview.hidden)return;const current=info(active.cell,active.gpu);title.textContent=(active.gpu.label || active.gpu.id)+" · "+(active.workload.label || active.workload.id);status.textContent=current.stateLabel;eta.textContent=current.clock;detail.textContent=current.reason;detail.hidden=!current.reason;preview.title=current.evidence;}
        function emit(intent){doc.dispatchEvent(new CustomEvent("openleaf-select-run",{detail:intent}));}
        function hidePreview(){
          clearTimeout(hoverTimer);++revision;preview.hidden=true;if(active)active.td.removeAttribute("aria-describedby");active=null;
          if(selected()?.hover){const restore=matrixPins.get(matrixId)||hoverBase;if(restore){matrixIntents.set(matrixId,restore);emit({...restore,restore:true});}else{matrixIntents.delete(matrixId);emit({matrix_id:matrixId,clear:true,restore:true});}}
          hoverBase=null;
        }
        function schedulePreview(td,gpu,workload,runId,cell){
          clearTimeout(hideTimer);clearTimeout(hoverTimer);const request=++revision;
          hoverTimer=setTimeout(()=>{
            if(request!==revision || !td.isConnected)return;
            if(!selected()?.hover)hoverBase=selected();active={td,gpu,workload,runId,cell};preview.hidden=false;updateTooltip();td.setAttribute("aria-describedby",preview.id);
            const rect=td.getBoundingClientRect(),width=Math.min(250,doc.defaultView.innerWidth-24);preview.style.width=width+"px";preview.style.left=Math.max(12,Math.min(rect.left,doc.defaultView.innerWidth-width-12))+"px";preview.style.top=(rect.bottom+100<doc.defaultView.innerHeight?rect.bottom+6:Math.max(8,rect.top-100))+"px";
            matrixIntents.set(matrixId,{matrix_id:matrixId,gpu_id:gpu.id,workload_id:workload.id,run_id:runId,label:workload.label || workload.id,state:info(cell,gpu).stateLabel,pinned:false,hover:true});emit(selected());
          },120);
        }
        function apply(matrix){
          hidePreview();const {gpus,workloads,cells}=matrix;
          if(!Array.isArray(gpus)||!Array.isArray(workloads)||!Array.isArray(cells)||!gpus.length||gpus.length>32||!workloads.length||workloads.length>16)throw new Error("Invalid matrix");
          const head=doc.createElement("thead"),headers=doc.createElement("tr"),body=doc.createElement("tbody");
          const short={blackwell:"Blackwell","4060ti":"4060 Ti\n16GB",a100:"A100\nSXM","a100-pcie":"A100\nPCIe",rtx3090:"RTX\n3090","v100-pcie":"V100\nPCIe","v100s-pcie":"V100S\nPCIe","v100-sxm2":"V100\nSXM2"};
          for(const [index,label] of ["Workload",...gpus.map(g=>short[g.id] || g.short_label || g.label || g.id)].entries()){
            const th=doc.createElement("th");th.scope="col";th.textContent=label;const gpu=gpus[index-1];if(gpu){th.title=gpu.label || gpu.id;if(gpu.enabled===false||gpu.availability==="occupied"){th.dataset.availability="occupied";th.setAttribute("aria-label",th.title+" — Occupied");}}headers.append(th);
          }
          head.append(headers);
          for(const work of workloads){const tr=doc.createElement("tr"),name=doc.createElement("td");name.textContent=work.label || work.id;tr.append(name);
            for(const gpu of gpus){const cell=cells.find(c=>c.gpu_id===gpu.id&&c.workload_id===work.id)||{},current=info(cell,gpu),td=doc.createElement("td"),value=doc.createElement("span");td.dataset.gpu=gpu.id;td.dataset.workload=work.id;td.dataset.state=current.state;
              if(gpu.enabled===false||gpu.availability==="occupied")td.dataset.availability="occupied";
              value.dataset.openleafCellValue="";value.textContent=current.mark;td.append(value);td.dataset.benchmarkEligible=String(cell.benchmark_eligible===true);td.setAttribute("aria-label",current.stateLabel+(current.done&&current.clock!=="—"?" · "+current.clock:""));
              const runId=cell.run_id || gpu.id+"-"+work.id+(matrix.run_id_suffix || "");td.dataset.graphLink="";td.tabIndex=0;td.dataset.selected=matrixPins.get(matrixId)?.run_id===runId?"true":"false";
              function choose(){const intent={matrix_id:matrixId,gpu_id:gpu.id,workload_id:work.id,run_id:runId,label:work.label || work.id,state:current.stateLabel,pinned:true};matrixPins.set(matrixId,intent);matrixIntents.set(matrixId,intent);wrapper.querySelectorAll("td[data-graph-link]").forEach(c=>c.dataset.selected=c===td?"true":"false");emit(intent);}
              td.addEventListener("click",choose);td.addEventListener("keydown",event=>{if(["Enter"," "].includes(event.key)){event.preventDefault();choose();}});
              td.addEventListener("pointerenter",()=>schedulePreview(td,gpu,work,runId,cell));td.addEventListener("focus",()=>schedulePreview(td,gpu,work,runId,cell));td.addEventListener("pointerleave",()=>{hideTimer=setTimeout(hidePreview,80);});td.addEventListener("blur",()=>{hideTimer=setTimeout(hidePreview,80);});tr.append(td);
            }body.append(tr);
          }
          table.replaceChildren(head,body);wrapper.dataset.updatedAt=matrix.updatedAt || "";block.classList.add("openleaf-matrix-ready");
        }
        async function refresh(){if(!block.isConnected||refreshing)return;refreshing=true;try{const {value}=await readLocalJson(block.dataset.openleafBenchmarkMatrix,fileUrl);if(!block.isConnected)return;const next=JSON.stringify(value);if(next!==fingerprint){apply(value);fingerprint=next;}wrapper.removeAttribute("data-stale");}catch{wrapper.dataset.stale="true";}finally{refreshing=false;}}
        void refresh();const clock=setInterval(()=>{if(!block.isConnected){clearInterval(clock);return;}updateTooltip();},1000);
        const timer=setInterval(()=>{if(!block.isConnected){clearInterval(timer);return;}void refresh();},45000);
      });
    }

    function renderPlots(doc) {
      const style = doc.createElement("style");
      style.textContent = ".openleaf-plot-ready [data-openleaf-plot-fallback]{display:none!important}[data-openleaf-matrix-hover-only=true]:not(.openleaf-matrix-pinned){display:none!important}";
      // Plotly installs its stylesheet in the host document; plots live in this iframe.
      document.querySelectorAll('style[id^="plotly.js-style"]').forEach((hostStyle) => {
        style.textContent += [...(hostStyle.sheet?.cssRules || [])].map((rule) => rule.cssText).join("\n");
      });
      doc.head.append(style);
      doc.querySelectorAll("[data-openleaf-plot]").forEach(async (block) => {
        const matrixId=block.dataset.openleafMatrixId || "default";
        const selected=()=>matrixIntents.get(matrixId);
        // Only trusted host code runs. Documents provide local JSON, never JavaScript.
        try {
          const readJson = readLocalJson;
          if (!window.Plotly || !block.isConnected) return;
          const wrapper = doc.createElement("div");
          wrapper.dataset.openleafPlotPlayer = "";
          wrapper.contentEditable = "false";
          wrapper.setAttribute("aria-label", block.getAttribute("aria-label") || "Interactive chart");
          const player = doc.createElement("div");
          player.dataset.openleafPlotCanvas = "";
          let revision = 0, renderedSource = null, renderedBounds = null;
          async function draw(path, base, runIdentity = null) {
            const current = ++revision;
            const { value: figure, url: figureUrl } = await readJson(path, base);
            if (current !== revision || !block.isConnected) return;
            if (!Array.isArray(figure.data)) throw new Error("Invalid plot data");
            const sourceIdentity = runIdentity || figureUrl;
            const previousRange = renderedSource === sourceIdentity ? player._fullLayout?.xaxis?.range : null;
            const wasOverview = Array.isArray(previousRange) && Array.isArray(renderedBounds)
              && previousRange.every((value, index) => Math.abs(value - renderedBounds[index]) <= 1e-8 * Math.max(1, Math.abs(renderedBounds[index])));
            delete player.dataset.openleafPendingRun;
            window.Plotly.purge(player);
            const layout = { ...(figure.layout || {}), autosize: true, uirevision: sourceIdentity };
            delete layout.width;
            const range = layout.xaxis?.range;
            const bounds = Array.isArray(range) && range.length === 2 && range.every(Number.isFinite)
              ? [...range].sort((a, b) => a - b) : null;
            function clampRange(requested) {
              if (!bounds) return requested;
              if (!Array.isArray(requested) || requested.length !== 2 || !requested.every(Number.isFinite)) return [...bounds];
              const sorted = [...requested].sort((a, b) => a - b);
              const width = Math.min(sorted[1] - sorted[0], bounds[1] - bounds[0]);
              if (width <= 0) return [...bounds];
              const start = Math.max(bounds[0], Math.min(sorted[0], bounds[1] - width));
              return [start, start + width];
            }
            if (bounds) {
              layout.xaxis = { ...layout.xaxis, autorange: false, range: clampRange(wasOverview ? bounds : previousRange || bounds),
                minallowed: bounds[0], maxallowed: bounds[1],
                autorangeoptions: { ...(layout.xaxis.autorangeoptions || {}), minallowed: bounds[0], maxallowed: bounds[1] } };
            }
            const reset = () => bounds && window.Plotly.relayout(player, { "xaxis.autorange": false, "xaxis.range": [...bounds] });
            await window.Plotly.newPlot(player, figure.data, layout, {
              responsive: true, displaylogo: false, scrollZoom: true,
              modeBarButtonsToRemove: ["toImage", "lasso2d", "select2d", "autoScale2d", "resetScale2d"],
              modeBarButtonsToAdd: bounds ? [{name: "Reset time range", icon: window.Plotly.Icons.home, click: reset}] : [],
            });
            if (current !== revision) return;
            renderedSource = sourceIdentity;
            renderedBounds = bounds;
            // A bar whose customdata names a run ({matrix_id, gpu_id, run_id}) opens that run in the linked runs figure.
            player.on("plotly_click", (event) => {
              const link = event?.points?.[0]?.customdata;
              if (!link || typeof link !== "object" || typeof link.run_id !== "string" || typeof link.gpu_id !== "string") return;
              doc.dispatchEvent(new CustomEvent("openleaf-select-run", {detail: {matrix_id: String(link.matrix_id || "default"),
                gpu_id: link.gpu_id, run_id: link.run_id, label: String(link.label || link.run_id), pinned: true}}));
            });
            let clamping = false;
            player.on("plotly_relayout", (event) => {
              if (!bounds || clamping || current !== revision) return;
              const requested = event["xaxis.range"] || [
                event["xaxis.range[0]"] ?? player.layout.xaxis?.range?.[0],
                event["xaxis.range[1]"] ?? player.layout.xaxis?.range?.[1],
              ];
              const target = event["xaxis.autorange"] === true ? [...bounds] : clampRange(requested);
              const actual = player.layout.xaxis?.range;
              if (player.layout.xaxis?.autorange === false && Array.isArray(actual)
                  && actual.every((value, index) => Math.abs(value - target[index]) < 1e-9)) return;
              clamping = true;
              void window.Plotly.relayout(player, { "xaxis.autorange": false, "xaxis.range": target })
                .finally(() => { clamping = false; });
            });
            block.classList.add("openleaf-plot-ready");
            const baseShapes = Array.isArray(layout.shapes) ? layout.shapes : [];
            const bands = Array.isArray(figure.openleaf?.stageBands) ? figure.openleaf.stageBands : [];
            let activeBand = -1;
            player.on("plotly_hover", (event) => {
              const index = event.points?.[0]?.customdata?.[0];
              const band = Number.isInteger(index) ? bands[index] : null;
              if (!band || activeBand === index || !Number.isFinite(band.start) || !Number.isFinite(band.end)) return;
              activeBand = index;
              void window.Plotly.relayout(player, { shapes: [...baseShapes, {
                type: "rect", xref: "x", yref: "paper", x0: band.start, x1: band.end,
                y0: 0, y1: 1, fillcolor: "rgba(193,138,45,0.15)",
                line: { color: "rgba(193,138,45,0.7)", width: 1 }, layer: "below",
              }] });
            });
            player.on("plotly_unhover", () => {
              if (activeBand < 0) return;
              activeBand = -1;
              void window.Plotly.relayout(player, { shapes: baseShapes });
            });
          }
          block.prepend(wrapper);
          if (block.dataset.openleafRuns) {
            let { value: manifest, url: manifestUrl } = await readJson(block.dataset.openleafRuns, fileUrl);
            let runs = [];
            const intention = () => selected() && selected().gpu_id === gpuSelect.value ? selected() : null;
            const hoverOnly = block.dataset.openleafMatrixHoverOnly === "true";
            const controls = doc.createElement("div"); controls.hidden = hoverOnly;
            controls.style.cssText = "margin:0 0 18px;font:14px Georgia,serif;color:#28333f";
            const row = doc.createElement("div");
            row.style.cssText = "display:flex;gap:18px;flex-wrap:wrap;align-items:center;margin-bottom:10px";
            function makeSelect(title, attribute) {
              const label = doc.createElement("label"), select = doc.createElement("select");
              label.textContent = title + " "; select.setAttribute(attribute, "");
              select.setAttribute("aria-label", "Select benchmark " + title.toLowerCase());
              select.style.cssText = "font:inherit;background:white;color:inherit;border:1px solid #bbc2c7;padding:6px 10px;margin-left:8px;max-width:100%";
              select.addEventListener("input", (event) => event.stopPropagation()); label.append(select); row.append(label); return select;
            }
            const gpuSelect = makeSelect("GPU", "data-openleaf-gpu-selector");
            const select = makeSelect("Run", "data-openleaf-run-selector");
            // one run per GPU: data-openleaf-hide-run-selector hides the run menu; the GPU menu (or a linked bar) picks the run
            if (block.dataset.openleafHideRunSelector === "true") select.parentElement.hidden = true;
            const status = doc.createElement("p");
            status.dataset.openleafRunProgress = "";
            status.style.cssText = "margin:0 0 10px;color:#66717b;font-size:12px";
            const settings = doc.createElement("dl");
            settings.dataset.openleafRunSettings = "";
            settings.style.cssText = "display:grid;grid-template-columns:max-content 1fr;gap:4px 22px;margin:0;line-height:1.45";
            const details = doc.createElement("details"), summary = doc.createElement("summary");
            summary.textContent = "Settings"; summary.style.cssText = "cursor:pointer;margin:0 0 8px";
            details.append(summary, settings); controls.append(row, status, details); wrapper.append(controls, player);
            const runGpu = (run) => run.gpu_id || "blackwell";
            function options(target, values, preferred) {
              target.replaceChildren(); target.disabled = !values.length;
              if (!values.length) {const pending = doc.createElement("option"); pending.textContent = "Pending"; pending.value = ""; target.append(pending);}
              for (const value of values) {
                const option = doc.createElement("option"); option.value = value.id; option.textContent = value.label || value.id; target.append(option);
              }
              target.value = values.some((value) => value.id === preferred) ? preferred : values[0]?.id || "";
            }
            async function choose() {
              const run = runs.find((item) => item.id === select.value);
              if (hoverOnly && !intention()) {
                ++revision; window.Plotly.purge(player); player.replaceChildren(); block.classList.remove("openleaf-matrix-pinned"); return;
              }
              settings.replaceChildren(); details.hidden = !run;
              if (!run || !run.figure) {
                ++revision; window.Plotly.purge(player); player.replaceChildren(); block.classList.remove("openleaf-matrix-pinned");
                player.removeAttribute("style");
                const intent = intention();
                player.dataset.openleafPendingRun = intent?.run_id || "";
                status.textContent = intent ? [gpuSelect.selectedOptions[0]?.textContent, intent.label, run?.progress?.state || intent.state].filter(Boolean).join(" · ") : run?.progress?.state || "Pending — no measured run yet";
                block.classList.add("openleaf-plot-ready"); return;
              }
              const pairs = Array.isArray(run.settings) ? run.settings : Object.entries(run.settings || {});
              for (const [key, value] of pairs) {
                const term = doc.createElement("dt"), detail = doc.createElement("dd");
                term.textContent = String(key); detail.textContent = String(value); detail.style.margin = "0"; settings.append(term, detail);
              }
              const progress = run.progress || {};
              const parts = [progress.state];
              if (Number.isFinite(progress.runtime_s)) parts.push(Math.floor(progress.runtime_s/60) + " min");
              if (Number.isFinite(progress.completed_footage_s)) parts.push((progress.completed_footage_s/3600).toFixed(3) + " footage-h");
              if (progress.stage) parts.push(progress.stage);
              const stamp = manifest.updatedAt;
              if (stamp) parts.push((manifest.stale ? "Last sync " : "Updated ") + new Date(stamp).toLocaleTimeString());
              if (manifest.source === "local-offline") parts.push("offline records");
              status.textContent = parts.filter(Boolean).join(" · ");
              if (hoverOnly) block.classList.add("openleaf-matrix-pinned");
              wrapper.setAttribute("aria-label",run.label || run.id);
              player.dataset.openleafRunId=run.id;
              await draw(run.figure, manifestUrl, run.id);
            }
            async function filterRuns(preferred) {
              const intent = intention(), values = runs.filter((run) => runGpu(run) === gpuSelect.value);
              if (intent && !values.some((run) => run.id === intent.run_id)) values.unshift({id:intent.run_id,label:intent.label + " · " + intent.state});
              options(select, values, intent?.run_id || preferred); await choose();
            }
            async function apply(next, initial = false) {
              const oldGpu = gpuSelect.value, oldRun = select.value;
              manifest = next; runManifests.set(matrixId,{value:manifest,url:manifestUrl}); runs = (manifest.runs || []).filter((run) => run && typeof run.id === "string");
              const gpus = manifest.gpus?.length ? manifest.gpus : [...new Set(runs.map(runGpu))].map((id) => ({id,label:id}));
              if(hoverOnly && !selected()) {
                const canonical=runs.filter(run=>{
                  const config=Array.isArray(run.settings) ? Object.fromEntries(run.settings):run.settings || {};
                  const workload=(config.pipeline==="SLAM" ? "slam":config.pipeline==="HA-Hand2.0" ? "hand":"")+"-"+config.fps;
                  return run.figure && config.benchmark_kind===(block.dataset.openleafBenchmarkKind || "production single-task matrix") && ["30","60"].includes(String(config.fps)) && run.id===runGpu(run)+"-"+workload+(block.dataset.openleafRunSuffix || "");
                });
                const candidate=canonical.find(run=>run.progress?.state==="running"&&!run.stale) || canonical.find(run=>run.id===manifest.defaultRun) || canonical[0];
                if(candidate)matrixIntents.set(matrixId,{matrix_id:matrixId,gpu_id:runGpu(candidate),run_id:candidate.id,label:candidate.label || candidate.id,state:candidate.progress?.state || "Measured",pinned:false});
              }
              const initialRun = runs.find((run) => run.id === manifest.defaultRun) || runs[0];
              options(gpuSelect, gpus, selected()?.gpu_id || (initial ? initialRun && runGpu(initialRun) : oldGpu));
              await filterRuns(initial ? manifest.defaultRun : oldRun);
            }
            gpuSelect.addEventListener("change", (event) => {event.stopPropagation(); matrixIntents.delete(matrixId); void filterRuns().catch(console.warn);});
            select.addEventListener("change", (event) => {event.stopPropagation(); matrixIntents.delete(matrixId); void choose().catch(console.warn);});
            doc.addEventListener("openleaf-select-run", (event) => {
              if (!block.isConnected) return;
              const intent = event.detail;
              if(intent?.clear && (intent.matrix_id || "default")===matrixId){void choose().catch(console.warn);return;}
              if (!intent || (intent.matrix_id || "default")!==matrixId || ![...gpuSelect.options].some((option) => option.value === intent.gpu_id)) return;
              gpuSelect.value = intent.gpu_id;
              void filterRuns(intent.run_id).then(() => {if(!intent.hover && !intent.restore)block.scrollIntoView({block:"nearest",behavior:"smooth"});}).catch(console.warn);
            });
            await apply(manifest, true);
            let fingerprint = JSON.stringify(manifest), refreshing = false;
            const timer = setInterval(async () => {
              if (!block.isConnected) {clearInterval(timer); return;}
              if (refreshing) return; refreshing = true;
              try {
                const { value: next } = await readJson(block.dataset.openleafRuns, fileUrl);
                const nextFingerprint = JSON.stringify(next);
                if (nextFingerprint !== fingerprint) {fingerprint = nextFingerprint; await apply(next);}
              } catch {status.textContent = "Refresh unavailable — showing last saved measurements";}
              finally {refreshing = false;}
            }, 45000);
          } else {
            wrapper.append(player);
            await draw(block.dataset.openleafPlot, fileUrl);
          }
        } catch (error) {
          console.warn("Could not render document plot:", error);
          // The document's static image remains visible on any failure.
        }
      });
    }

    function renderVideos(doc) {
      const style = doc.createElement("style");
      style.textContent = `
        [data-openleaf-video] { margin: 24px 0; }
        [data-openleaf-video-player] video { display:block; width:100%; max-height:70vh; background:#101619; border-radius:12px; }
        .openleaf-video-play { display:block; position:relative; width:100%; aspect-ratio:16/9; min-height:200px; border:0; border-radius:12px; overflow:hidden; cursor:pointer; background:#101619; color:white; }
        .openleaf-video-play img { width:100%; height:100%; position:absolute; inset:0; object-fit:contain; }
        .openleaf-video-play span { position:relative; display:inline-block; border-radius:30px; padding:14px 24px; background:#000c; font:bold 16px system-ui; }
        [data-openleaf-video-player] p { font:14px system-ui; }
      `;
      doc.head.append(style);
      doc.querySelectorAll("[data-openleaf-video]").forEach((block) => {
        const video = OpenleafVideo.parse(block.dataset.openleafVideo, fileUrl);
        const player = doc.createElement("div");
        player.dataset.openleafVideoPlayer = "";
        player.contentEditable = "false";
        const title = block.querySelector("figcaption")?.textContent || "Video";
        if (!video) {
          const error = doc.createElement("p");
          error.textContent = "Unsupported video. Use a YouTube link or an MP4, WebM, or Ogg video file.";
          player.append(error);
        } else {
          const button = doc.createElement("button");
          button.type = "button";
          button.className = "openleaf-video-play";
          button.setAttribute("aria-label", `Play ${title}`);
          const poster = doc.createElement("img");
          const posterUrl = video.poster || (block.dataset.openleafPoster ? new URL(block.dataset.openleafPoster, fileUrl).href : "");
          if (posterUrl) poster.src = posterUrl;
          poster.alt = "";
          poster.loading = "lazy";
          const label = doc.createElement("span");
          label.textContent = "▶ Play video";
          if (posterUrl) button.append(poster);
          button.append(label);
          button.addEventListener("click", () => OpenleafVideo.play(video, title));
          player.append(button);
        }
        block.prepend(player);
      });
    }

    function insertVideo(url, title) {
      const doc = frame.contentDocument;
      const range = doc.getSelection()?.rangeCount ? doc.getSelection().getRangeAt(0) : null;
      const template = doc.createElement("template");
      template.innerHTML = OpenleafVideo.markup(url, title);
      if (range && doc.body.contains(range.commonAncestorContainer) && !range.startContainer.parentElement?.closest("[data-openleaf-video-player]")) {
        range.deleteContents();
        range.insertNode(template.content);
      } else doc.body.append(template.content);
      const html = serialize();
      onChange(html);
      update(html, fileUrl, true);
    }

    function renderMath(doc) {
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) {
        if (!walker.currentNode.parentElement.closest("script,style,code,pre,[data-openleaf-latex]")) nodes.push(walker.currentNode);
      }
      for (const node of nodes) {
        const pattern = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
        let match, end = 0;
        const fragment = doc.createDocumentFragment();
        while ((match = pattern.exec(node.textContent))) {
          fragment.append(doc.createTextNode(node.textContent.slice(end, match.index)));
          const token = doc.createElement("span");
          token.dataset.openleafLatex = match[0];
          token.contentEditable = "false";
          token.innerHTML = katex.renderToString(match[1] ?? match[2], { displayMode: match[2] !== undefined, throwOnError: false, trust: false });
          if (editable) {
            token.title = "Double-click to edit LaTeX";
            token.addEventListener("dblclick", () => {
              const next = window.prompt("Edit LaTeX, including \\( … \\) or \\[ … \\] delimiters", token.dataset.openleafLatex);
              if (next === null) return;
              token.dataset.openleafLatex = next;
              const html = serialize();
              onChange(html);
              update(html, fileUrl, true);
            });
          }
          fragment.append(token);
          end = pattern.lastIndex;
        }
        if (end) {
          fragment.append(doc.createTextNode(node.textContent.slice(end)));
          node.replaceWith(fragment);
        }
      }
    }

    function update(html, url, force = false) {
      if (!force && sourceText === html && fileUrl === url) return;
      scrollTop = frame.contentDocument?.scrollingElement?.scrollTop || 0;
      frame.contentDocument?.querySelectorAll("[data-openleaf-plot-canvas]").forEach((plot) => window.Plotly?.purge(plot));
      if (fileUrl && fileUrl !== url) { matrixIntents.clear(); matrixPins.clear(); runManifests.clear(); matrixPreviewCache.clear(); }
      sourceText = html;
      fileUrl = url;
      sourceDocument = new DOMParser().parseFromString(html, "text/html");
      const view = sourceDocument.cloneNode(true);
      // A restrictive sandbox prevents scripts, forms, popups, and top navigation.
      view.querySelectorAll('meta[http-equiv="refresh" i]').forEach((element) => element.remove());
      const base = view.createElement("base");
      base.href = url || location.href;
      view.querySelectorAll("base").forEach((element) => element.remove());
      view.head.prepend(base);
      const mathCss = view.createElement("link");
      mathCss.rel = "stylesheet";
      mathCss.href = new URL("node_modules/katex/dist/katex.min.css", location.href).href;
      view.head.append(mathCss);
      frame.onload = () => {
        const doc = frame.contentDocument;
        renderMath(doc);
        renderVideos(doc);
        renderPlots(doc);
        renderMatrices(doc);
        doc.designMode = editable ? "on" : "off";
        doc.scrollingElement.scrollTop = scrollTop;
        doc.addEventListener("click", (event) => {
          const link = event.target.closest("a");
          if (!link) return;
          event.preventDefault();
          const url = new URL(link.getAttribute("href") || "", fileUrl);
          if (url.protocol === "https:" || url.protocol === "http:") window.localOverleaf.openExternalLink(url.href);
          else if (url.protocol === "file:" && /\.(pdf|html?)$/i.test(url.pathname)) {
            if (url.pathname === new URL(fileUrl).pathname && url.hash) doc.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
            else onOpenDocument(url.href);
          }
        });
        doc.addEventListener("input", () => onChange(serialize()));
        doc.addEventListener("keydown", (event) => {
          if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
            event.preventDefault();
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "s", metaKey: event.metaKey, ctrlKey: event.ctrlKey, bubbles: true }));
          }
        });
      };
      frame.srcdoc = "<!DOCTYPE html>" + view.documentElement.outerHTML;
    }
    function pause() {
      frame.contentDocument?.querySelectorAll("video,audio").forEach((media) => media.pause());
    }
    return { frame, update, insertVideo, pause };
  }
  return { create };
})();
