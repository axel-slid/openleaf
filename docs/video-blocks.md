# Video blocks in HTML documents

Open an HTML project and choose **Insert video** next to Code and Visual. Paste a YouTube URL (including an optional `t`/`start` time), a direct HTTPS MP4/WebM/Ogg URL, or a relative path such as `media/demo.mp4`. Add a caption and insert.

Video blocks show a play card and open a player within Openleaf; Escape or Close video stops playback. Local files use native video controls. YouTube uses an isolated iframe and offers Open on YouTube when the publisher restricts embedding. YouTube requires an internet connection. Downloaded media works offline.

The source format is portable HTML:

```html
<figure data-openleaf-video="media/demo.mp4">
  <figcaption>Robot demonstration</figcaption>
</figure>
```

The attribute also accepts `https://www.youtube.com/watch?v=VIDEO_ID`. HTML previews keep document scripts disabled. Generated players are removed when saving visual edits; the original URL, caption, scripts, and LaTeX remain in the source. Standard authored `<video controls>` elements continue to work.

HTTPS reading links open in the browser. Local HTML and PDF links inside the current project open in Openleaf. Files outside the project are not opened by document links.
