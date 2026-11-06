## Summary
Expert avatars in the bento tiles now use the real Gleam mascot, recoloured per expert, instead of CSS circles. The hero mascot is back on the bottom-left corner of the product screenshot, and the floating "Gleam" tag beside it is gone.

## gleam/assets/mascots/faces/*.webp
- gleam (mint), maya (orange), dev (blue), ines (pink), sam (purple). Each is 96x96 and about 3.5 KB.
- Rendered in headless Chromium from the saved colour SVGs (mascots.json, `colours/gleam-<colour>`), cropped square to the SVG bounding box, then downscaled from 384px.

## gleam/index.html
- The 10 `<i class="face" style="--c:...">` placeholders became `<img class="face" src="assets/mascots/faces/<name>.webp">` (roster, memory thread head, "Asking Dev" pill and its stacked faces).
- `.hero-pointer` (mascot plus "Gleam" tag outside the screenshot) was replaced by the old `.hero-mascot` image on the screenshot corner.

## gleam/assets/site.css
- `.face` is now a plain contained image; the blob and eye pseudo-elements were removed.
- `.hero-mascot` is back: absolute at left -40px, bottom -36px, 118px wide. It shrinks to 90px under 1100px and 64px under 480px. Motion start state updated.

## gleam/assets/site.js
- The intro animation targets `.hero-mascot` again, with the original rise-and-rotate entrance.
- site.css bumped to v11 and site.js to v6 across the pages.
