import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {ElectronHarness} from './production/electron-harness.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),temp=await fs.mkdtemp(path.join(os.tmpdir(),'openleaf-matrix-'));
const app=await new ElectronHarness(root).start();
const ids=['blackwell','4060ti','l40s','a100','h100','h200','a100-pcie','a40','rtx3090','p40','v100-pcie','v100s-pcie','v100-sxm2'];
const matrix={gpus:ids.map(id=>({id,label:id})),workloads:['slam-30','slam-60','hand-30','hand-60'].map(id=>({id,label:id})),cells:[]};matrix.gpus[0].enabled=false;matrix.gpus[0].availability='occupied';
for(const gpu of matrix.gpus)for(const work of matrix.workloads)matrix.cells.push({gpu_id:gpu.id,workload_id:work.id,state:'pending'});
const cell=(gpu,work)=>matrix.cells.find(c=>c.gpu_id===gpu&&c.workload_id===work);
Object.assign(cell('l40s','slam-30'),{state:'queued',estimated_ready_at:new Date(Date.now()+3600000).toISOString(),eta_evidence:'Planning target; unknown queue delay',scheduler_reason:'Resources',scheduler_checked_unix_s:Math.floor(Date.now()/1000)});
Object.assign(cell('a100','slam-30'),{state:'running',run_id:'a100-slam-30',estimated_ready_at:new Date(Date.now()-1000).toISOString(),eta_evidence:'Expired measured projection'});
Object.assign(cell('l40s','hand-60'),{state:'unqualified',run_id:'l40s-hand-60',execution_throughput_footage_h_per_host_h:.25,wall_seconds:1068.179});
Object.assign(cell('h100','hand-30'),{state:'completed',run_id:'h100-hand-30',benchmark_eligible:true,qualified_throughput_footage_h_per_host_h:.5,wall_seconds:3661});
Object.assign(cell('4060ti','slam-30'),{state:'blocked',blocked_reason:'RAM admission gate'});Object.assign(cell('4060ti','hand-60'),{state:'failed'});
const figure=(duration,stage=false)=>({data:[...(stage?[{type:'bar',orientation:'h',x:[2],base:[0],y:[0],customdata:[[0,'a4_detection',120]],hovertemplate:'%{customdata[1]}'}]:[]),{type:'scatter',x:[0,duration],y:[10,90]}],layout:{height:340,xaxis:{range:[0,duration]},yaxis:{range:[0,100]}},openleaf:{stageBands:stage?[{start:0,end:2,name:'a4_detection',duration:120}]:[]}});
const measured=(id,gpu,pipeline,fps,asset,state='completed')=>({id,gpu_id:gpu,figure:asset,progress:{state,stage:state==='running'?'a4_detection':undefined},settings:{benchmark_kind:'production single-task matrix',pipeline,fps}});
const runs={defaultRun:'old',gpus:matrix.gpus,runs:[{id:'old',gpu_id:'blackwell',figure:'long.json'},measured('a100-slam-30','a100','SLAM',30,'staged.json','running'),measured('l40s-hand-60','l40s','HA-Hand2.0',60,'short.json'),measured('h100-hand-30','h100','HA-Hand2.0',30,'long.json')]};
const html='<html><body><article style="max-width:760px;margin:32px auto"><h2>4 One task</h2><script>window.__unsafe=true</script><table data-openleaf-matrix-id="one" data-openleaf-benchmark-matrix="matrix.json"><tr><td>Original fallback</td></tr></table><figure data-openleaf-matrix-id="one" data-openleaf-matrix-hover-only="true" data-openleaf-plot="long.json" data-openleaf-runs="runs.json"></figure></article></body></html>';
const doc='window.__editor.frame.contentDocument',main=`${doc}.querySelector('[data-openleaf-matrix-id=one] [data-openleaf-plot-canvas]')`;
const target=(gpu,work)=>`${doc}.querySelector('td[data-gpu="${gpu}"][data-workload="${work}"]')`;
const evaluate=code=>app.evaluate(code),wait=code=>app.waitForExpression(code);
try{
 for(const [file,data]of [['matrix.json',matrix],['runs.json',runs],['long.json',figure(10)],['short.json',figure(5)],['staged.json',figure(4,true)]])await fs.writeFile(path.join(temp,file),JSON.stringify(data));
 await evaluate(`(()=>{const old=window.setInterval;window.__refreshers=[];window.setInterval=(fn,ms,...args)=>{if(ms===45000)window.__refreshers.push(fn);return old(fn,ms,...args)};window.__editor=OpenleafHtmlEditor.create({editable:true,onChange:value=>window.__saved=value});document.body.append(window.__editor.frame);window.__editor.frame.style.cssText='position:fixed;inset:0;width:1100px;height:850px;z-index:99999;background:white';window.__editor.update(${JSON.stringify(html)},${JSON.stringify(pathToFileURL(path.join(temp,'index.html')).href)});})()`);
 await wait(`${doc}.querySelectorAll('[data-openleaf-matrix-player] td[data-workload]').length===52 && ${main}?._fullLayout?.xaxis.maxallowed===4`);
 assert.equal(await evaluate('window.__editor.frame.getAttribute("sandbox")'),'allow-same-origin');assert.equal(await evaluate(`Boolean(${doc}.defaultView.__unsafe)`),false);
 assert.equal(await evaluate(`${doc}.querySelector('[data-openleaf-gpu-selector]').getClientRects().length`),0);
 assert.equal(await evaluate(`${doc}.querySelector('[data-openleaf-matrix-player] tbody').rows.length`),4);
 assert.equal(await evaluate(`${doc}.querySelector('[data-openleaf-matrix-player] thead tr').cells.length`),14);
 assert.equal(await evaluate(`(()=>{const w=${doc}.querySelector('[data-openleaf-matrix-player]'),t=w.querySelector('table');return t.scrollWidth<=w.clientWidth+1 && w.getBoundingClientRect().width<=760})()`),true);
 assert.ok(await evaluate(`${target('a100','slam-30')}.getBoundingClientRect().height<=44`));
 assert.equal(await evaluate(`${target('l40s','slam-30')}.textContent`),'○');assert.equal(await evaluate(`${target('h100','hand-30')}.textContent`),'✓');
 assert.equal(await evaluate(`${target('l40s','hand-60')}.textContent`),'✓');assert.equal(await evaluate(`${target('l40s','hand-60')}.dataset.benchmarkEligible`),'false');
 assert.equal(await evaluate(`${target('4060ti','hand-60')}.textContent`),'×');assert.equal(await evaluate(`${doc}.querySelectorAll('td [data-openleaf-cell-eta]').length`),0);
 assert.notEqual(await evaluate(`getComputedStyle(${target('a100','slam-30')}).backgroundColor`),await evaluate(`getComputedStyle(${target('4060ti','hand-60')}).backgroundColor`));
 assert.equal(await evaluate(`${main}.data[0].customdata[0][1]`),'a4_detection');
 await evaluate(`${target('a100','slam-30')}.focus()`);await wait(`!${doc}.querySelector('[data-openleaf-matrix-preview]').hidden`);
 assert.match(await evaluate(`${doc}.querySelector('[data-openleaf-matrix-preview]').textContent`),/ETA unavailable/);
 assert.match(await evaluate(`${doc}.querySelector('[data-openleaf-matrix-preview]').textContent`),/Stage: a4_detection/);
 await evaluate(`${target('a100','slam-30')}.blur()`);
 // Tooltip alone owns the live ETA; queued hover clears unrelated graphs.
 await evaluate(`${target('l40s','slam-30')}.focus()`);await wait(`!${doc}.querySelector('[data-openleaf-matrix-preview]').hidden && ${main}.dataset.openleafPendingRun==='l40s-slam-30'`);
 assert.match(await evaluate(`${doc}.querySelector('[data-openleaf-matrix-preview]').textContent`),/Queue: Resources/);
 const etaBefore=await evaluate(`${doc}.querySelector('[data-openleaf-matrix-preview] [data-openleaf-cell-eta]').textContent`);
 await wait(`${doc}.querySelector('[data-openleaf-matrix-preview] [data-openleaf-cell-eta]').textContent!==${JSON.stringify(etaBefore)}`);
 assert.match(etaBefore,/~[0-9:]+/);assert.equal(await evaluate(`Boolean(${main}._fullLayout)`),false);
 await evaluate(`${target('l40s','slam-30')}.blur()`);await wait(`${main}?._fullLayout?.xaxis.maxallowed===4`);
 // A pinned graph is temporarily replaced by every hover, then restored on leave.
 await evaluate(`${target('h100','hand-30')}.click()`);await wait(`${main}.dataset.openleafRunId==='h100-hand-30' && ${main}?._fullLayout?.xaxis.maxallowed===10`);
 await evaluate(`${target('l40s','hand-60')}.focus()`);await wait(`${main}.dataset.openleafRunId==='l40s-hand-60' && ${main}?._fullLayout?.xaxis.maxallowed===5`);
 assert.match(await evaluate(`${doc}.querySelector('[data-openleaf-matrix-preview]').textContent`),/Done · 17m 48s elapsed/);
 assert.doesNotMatch(await evaluate(`${doc}.querySelector('[data-openleaf-matrix-preview]').textContent`),/Unqualified/);
 await evaluate(`${target('l40s','hand-60')}.blur()`);await wait(`${main}.dataset.openleafRunId==='h100-hand-30' && ${main}?._fullLayout?.xaxis.maxallowed===10`);
 assert.equal(await evaluate(`${doc}.querySelector('[data-openleaf-matrix-player]').compareDocumentPosition(${doc}.querySelector('[data-openleaf-plot-player]')) & Node.DOCUMENT_POSITION_FOLLOWING`),4);
 await evaluate(`Plotly.relayout(${main},{'xaxis.range':[-100,100]}).then(()=>true)`);await wait(`JSON.stringify(${main}.layout.xaxis.range)==='[0,10]'`);
 await evaluate(`Plotly.relayout(${main},{'dragmode':'pan','xaxis.range':[-20,-18]}).then(()=>true)`);await wait(`JSON.stringify(${main}.layout.xaxis.range)==='[0,2]'`);
 await evaluate(`Plotly.relayout(${main},{'xaxis.autorange':true}).then(()=>true)`);await wait(`JSON.stringify(${main}.layout.xaxis.range)==='[0,10]'`);
 await evaluate(`${doc}.querySelector('[data-title="Reset time range"]').click()`);assert.deepEqual(await evaluate(`${main}._fullLayout.xaxis.range`),[0,10]);
 // Different run identity resets to its entire measured duration, not the
 // previous short run's range. Same-run live updates retain a bounded zoom.
 await evaluate(`Plotly.relayout(${main},{'xaxis.range':[1,3]}).then(()=>true)`);
 runs.runs.find(run=>run.id==='l40s-hand-60').figure='fifty.json';
 await fs.writeFile(path.join(temp,'fifty.json'),JSON.stringify(figure(50.3967)));
 await fs.writeFile(path.join(temp,'runs.json'),JSON.stringify(runs));
 await evaluate('window.__refreshers.forEach(fn=>fn())');
 await evaluate(`${target('l40s','hand-60')}.click()`);
 await wait(`${main}.dataset.openleafRunId==='l40s-hand-60' && ${main}?._fullLayout?.xaxis.maxallowed===50.3967`);
 assert.deepEqual(await evaluate(`${main}._fullLayout.xaxis.range`),[0,50.3967]);
 // A default full overview follows expanding measurements rather than
 // preserving its first measured extent as if it were a user zoom.
 await fs.writeFile(path.join(temp,'fifty.json'),JSON.stringify(figure(52)));
 runs.updatedAt='overview expands';await fs.writeFile(path.join(temp,'runs.json'),JSON.stringify(runs));
 await evaluate('window.__refreshers.forEach(fn=>fn())');
 await wait(`${main}?._fullLayout?.xaxis.maxallowed===52`);
 assert.deepEqual(await evaluate(`${main}._fullLayout.xaxis.range`),[0,52]);
 await evaluate(`Plotly.relayout(${main},{'xaxis.range':[7,12]}).then(()=>true)`);
 await fs.writeFile(path.join(temp,'fifty.json'),JSON.stringify(figure(55)));
 runs.updatedAt='new actual scalar measurements';await fs.writeFile(path.join(temp,'runs.json'),JSON.stringify(runs));
 await evaluate('window.__refreshers.forEach(fn=>fn())');
 await wait(`${main}?._fullLayout?.xaxis.maxallowed===55`);
 assert.deepEqual(await evaluate(`${main}._fullLayout.xaxis.range`),[7,12]);
 await evaluate(`Plotly.relayout(${main},{'xaxis.range':[-100,100]}).then(()=>true)`);
 await wait(`JSON.stringify(${main}._fullLayout.xaxis.range)==='[0,55]'`);
 await evaluate(`${doc}.querySelector('[data-title="Reset time range"]').click()`);
 await fs.writeFile(path.join(temp,'fifty.json'),JSON.stringify(figure(60)));
 runs.updatedAt='reset resumes overview follow';await fs.writeFile(path.join(temp,'runs.json'),JSON.stringify(runs));
 await evaluate('window.__refreshers.forEach(fn=>fn())');
 await wait(`${main}?._fullLayout?.xaxis.maxallowed===60`);
 assert.deepEqual(await evaluate(`${main}._fullLayout.xaxis.range`),[0,60]);
 // Switching identities resets even if both runs refer to the same asset URL.
 runs.runs.find(run=>run.id==='h100-hand-30').figure='fifty.json';runs.updatedAt='same asset different run';
 await fs.writeFile(path.join(temp,'runs.json'),JSON.stringify(runs));await evaluate('window.__refreshers.forEach(fn=>fn())');
 await evaluate(`Plotly.relayout(${main},{'xaxis.range':[4,8]}).then(()=>true)`);
 await evaluate(`${target('h100','hand-30')}.click()`);
 await wait(`${main}.dataset.openleafRunId==='h100-hand-30' && ${main}?.layout?.uirevision==='h100-hand-30'`);
 assert.deepEqual(await evaluate(`${main}._fullLayout.xaxis.range`),[0,60]);
 // Data-only refresh changes a mark; failed reads retain the last real table.
 Object.assign(cell('a100','slam-60'),{state:'failed'});await fs.writeFile(path.join(temp,'matrix.json'),JSON.stringify(matrix));await evaluate('window.__refreshers.forEach(fn=>fn())');await wait(`${target('a100','slam-60')}.textContent==='×'`);
 await fs.writeFile(path.join(temp,'matrix.json'),'invalid');await evaluate('window.__refreshers.forEach(fn=>fn())');await wait(`${doc}.querySelector('[data-openleaf-matrix-player]').dataset.stale==='true'`);
 await evaluate(`${doc}.body.dispatchEvent(new Event('input',{bubbles:true}))`);const saved=await evaluate('window.__saved');assert.ok(saved.includes('Original fallback'));assert.ok(!saved.includes('data-openleaf-matrix-player'));assert.ok(!saved.includes('data-openleaf-plot-player'));
 // Section5 is isolated from section4; no initial-run chart leaks into its cells.
 await fs.writeFile(path.join(temp,'matrix.json'),JSON.stringify(matrix));const many={...matrix,run_id_suffix:'-sustained',cells:matrix.cells.map(c=>({gpu_id:c.gpu_id,workload_id:c.workload_id,state:'awaiting_initial'}))};await fs.writeFile(path.join(temp,'many.json'),JSON.stringify(many));await fs.writeFile(path.join(temp,'many-runs.json'),JSON.stringify({gpus:matrix.gpus,runs:[]}));
 const two=html.replace('</article>','<h2>5 Many tasks</h2><table data-openleaf-matrix-id="many" data-openleaf-benchmark-matrix="many.json"></table><figure data-openleaf-matrix-id="many" data-openleaf-matrix-hover-only="true" data-openleaf-benchmark-kind="production sustained allocation" data-openleaf-run-suffix="-sustained" data-openleaf-plot="long.json" data-openleaf-runs="many-runs.json"></figure></article>');
 await evaluate(`window.__editor.update(${JSON.stringify(two)},${JSON.stringify(pathToFileURL(path.join(temp,'two.html')).href)},true)`);await wait(`${doc}.querySelectorAll('[data-openleaf-matrix-player] td[data-workload]').length===104 && ${main}?._fullLayout?.xaxis.maxallowed===4`);
 await wait(`${doc}.querySelector('[data-openleaf-matrix-id=many] [data-openleaf-gpu-selector]').options.length===13`);
 await evaluate(`${doc}.querySelectorAll('[data-openleaf-matrix-player]')[1].querySelector('td[data-gpu=l40s][data-workload=hand-60]').focus()`);await wait(`${doc}.querySelector('[data-openleaf-matrix-id=many] [data-openleaf-plot-canvas]').dataset.openleafPendingRun==='l40s-hand-60-sustained'`);
 assert.equal(await evaluate(`${main}.dataset.openleafRunId`),'a100-slam-30');assert.equal(await evaluate(`Boolean(${doc}.querySelector('[data-openleaf-matrix-id=many] [data-openleaf-plot-canvas]')._fullLayout)`),false);
 console.log(JSON.stringify({cellsPerMatrix:52,compactWidth:760,completed:'checkmark;Done;measured elapsed',tooltip:'live1s ETA',hover:'below-table graph overrides pin;leave restores',clamp:'passed',sandbox:'unchanged',serialization:'clean',sectionIsolation:'passed'}));
}finally{await app.stop();await fs.rm(temp,{recursive:true,force:true});}
