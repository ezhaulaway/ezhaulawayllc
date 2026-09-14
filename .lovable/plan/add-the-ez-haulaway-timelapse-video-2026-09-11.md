# Add the EZ Haulaway Timelapse Video

## Goal
Replace the placeholder "See EZ Haulaway in Action" video frame with the real uploaded timelapse, sized down to downplay the lower video quality.

## Plan

1. **Optimize and resize the source video**
   - Transcode `videoplayback.mp4` (640×360, ~18 s) to a smaller web-friendly MP4.
   - Target ~480 px width (or a lower bitrate) so it looks intentional rather than blown up.
   - Keep audio if present; the player will remain muted by default.

2. **Upload as a Lovable Asset**
   - Create the asset pointer at `src/assets/ez-haulaway-timelapse.mp4.asset.json`.
   - Use the CDN URL in the component; do not commit the binary MP4 to the repo.

3. **Update the "See EZ Haulaway in Action" section**
   - Point the `<video>` element to the new asset URL.
   - Keep `controls`, `muted`, `playsInline`, and `preload="metadata"`.
   - Do **not** add `autoPlay` or `loop`.
   - Reduce the displayed video size so lower quality is less noticeable:
     - Use a narrower max-width container (e.g., `max-w-2xl` or `max-w-3xl`) and center it.
     - Keep the rounded frame and subtle shadow.
   - Remove the placeholder note text below the video.
   - Optionally keep a real-job still as the `poster` if a better frame isn't extracted.

4. **Verify**
   - Run the TypeScript check.
   - Take Playwright desktop and mobile screenshots of the video section.
   - Confirm the video loads, shows controls, and has no console errors.
