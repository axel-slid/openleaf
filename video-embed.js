/* Shared URL parsing for video blocks. Document scripts remain sandboxed. */
(function (root) {
  function seconds(value) {
    if (/^\d+$/.test(value || "")) return Number(value);
    const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(value || "");
    return match ? Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0) : 0;
  }

  function parse(raw, base) {
    let url;
    try { url = new URL(String(raw || "").trim(), base); } catch { return null; }
    if (url.username || url.password || !["https:", "file:"].includes(url.protocol)) return null;
    const host = url.hostname.toLowerCase();
    const youtube = ["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"];
    if (url.protocol === "https:" && (youtube.includes(host) || host === "youtu.be")) {
      const parts = url.pathname.split("/").filter(Boolean);
      const id = host === "youtu.be" ? parts[0] : ["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : url.searchParams.get("v");
      if (!/^[A-Za-z0-9_-]{11}$/.test(id || "")) return null;
      const start = seconds(url.searchParams.get("start") || url.searchParams.get("t"));
      const end = seconds(url.searchParams.get("end"));
      const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
      embed.searchParams.set("rel", "0");
      if (start) embed.searchParams.set("start", start);
      if (end > start) embed.searchParams.set("end", end);
      const watch = new URL(`https://www.youtube.com/watch?v=${id}`);
      if (start) watch.searchParams.set("t", start);
      return { kind: "youtube", id, start, end, url: watch.href, embedUrl: embed.href, poster: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` };
    }
    if (/\.(mp4|webm|ogv|ogg|m4v)$/i.test(url.pathname)) return { kind: "native", url: url.href };
    return null;
  }

  function markup(url, title = "Video") {
    const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
    return `<figure data-openleaf-video="${escape(url)}"><figcaption>${escape(title)}</figcaption></figure>\n`;
  }

  function play(video, title = "Video") {
    document.querySelector(".openleaf-video-dialog")?.close();
    const dialog = document.createElement("dialog");
    dialog.className = "openleaf-video-dialog";
    dialog.setAttribute("aria-label", title);
    const header = document.createElement("header");
    const heading = document.createElement("strong");
    heading.textContent = title;
    const close = document.createElement("button");
    close.type = "button";
    close.textContent = "Close video";
    close.addEventListener("click", () => dialog.close());
    header.append(heading, close);
    let player;
    let blobUrl = "";
    dialog.append(header);
    if (video.kind === "youtube") {
      player = document.createElement("iframe");
      player.title = title;
      player.setAttribute("sandbox", "allow-scripts allow-same-origin allow-presentation");
      player.allow = "fullscreen; encrypted-media; picture-in-picture";
      player.allowFullscreen = true;
      player.referrerPolicy = "strict-origin-when-cross-origin";
      player.src = video.embedUrl;
      dialog.append(player);
      const fallback = document.createElement("button");
      fallback.type = "button";
      fallback.textContent = "Open on YouTube";
      fallback.addEventListener("click", () => window.localOverleaf.openExternalLink(video.url));
      dialog.append(fallback);
    } else {
      player = document.createElement("video");
      player.controls = true;
      player.playsInline = true;
      player.preload = "metadata";
      dialog.append(player);
      const error = document.createElement("p");
      error.textContent = "This video could not load. Check the file path or internet connection.";
      const fail = () => { if (!error.isConnected && dialog.isConnected) dialog.append(error); };
      player.addEventListener("error", fail, { once: true });
      if (video.url.startsWith("file:")) {
        fetch(video.url).then((response) => {
          if (!response.ok) throw new Error("Could not read video file");
          return response.blob();
        }).then((blob) => {
          if (!dialog.isConnected) return;
          blobUrl = URL.createObjectURL(blob);
          player.src = blobUrl;
        }).catch(fail);
      } else player.src = video.url;
    }
    dialog.addEventListener("close", () => {
      if (video.kind === "native") { player.pause(); player.removeAttribute("src"); player.load(); }
      else player.src = "about:blank";
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      dialog.remove();
    }, { once: true });
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    document.body.append(dialog);
    dialog.showModal();
  }

  const api = { parse, markup, play };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.OpenleafVideo = api;
})(typeof window === "undefined" ? globalThis : window);
