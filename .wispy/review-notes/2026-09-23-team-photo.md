## Summary
Adds the build day team photo to the Gleam site's "Made in Nairobi" section, with name tags pinned on each person: Peter and Billy Mwangi as Claude Ambassadors (gold), Brian, Priscilla and Harris as the Gleam team (mint).

## gleam/index.html
- New `figure.crew` under the team cards. Photo uses `srcset` (840w and 1682w) and lazy loading.
- `.crew-tags` overlay is `aria-hidden`; each tag sets `--x`/`--y` as percentages of the photo so tags stay on the right person at any width.
- `figcaption` holds an ordered legend (the accessible version of the tags) and a one-line caption.
- Stylesheet link bumped to `?v=8` so browsers fetch the new CSS.

## gleam/assets/site.css
- `.crew`, `.crew-photo`: 1000px frame with the site's radius and border.
- `.tag`: dark pill with a mint border and a small rotated square as the pointer up to the face; `.tag-amb` switches to gold for ambassadors.
- `.crew-legend`: numbered list using a CSS counter; first and last numbers gold.
- Under 720px tags collapse to numbered dots, since full tags would overlap on a phone; the legend carries the names.

## gleam/assets/team/
- `build-day.webp` (1682x946, 297 KB) and `build-day-840.webp` (55 KB), converted from the PNG with Pillow.
