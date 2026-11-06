## Summary
Fixed overlapping sparkles on two mascots and restyled the Gleam site toward the Grok Bot reference: near-black canvas, white pill CTAs, a centred hero with the mascot inline in the headline, borderless bento tiles with built UI vignettes instead of an icon-card grid, no uppercase kicker labels, and a chip picker in place of the brains table.

## gleam/assets/mascots/gold-trophy.webp, pointing.webp
- Cause: each mascot SVG carries its own yellow sparkles, and a second cream sparkle layer was stacked on top at nearly the same spots.
- pointing.webp: re-rendered from the saved SVG (cta-mascots.json) in headless Chromium with the two overlapping cream stars removed and the late yellow sparkle moved clear of the arrow; now 320x232 (HTML size attributes updated).
- gold-trophy.webp: the trophy placement was not saved, so it was repaired in pixels: the cream star shapes were rendered as a mask and cut out, the two overlap corners cleared, and the two yellow sparkles redrawn on top at the measured scale (0.8) and offset.

## gleam/index.html
- Hero: announcement pill linking to the award, "Meet [mascot] Gleam" headline, white Download and dark Watch-the-demo pills, full-width product window, floating Gleam pointer tag.
- Features: four bento tiles (pointing mock with pencil ring, expert roster, memory thread, five coloured pointers with an "Asking Dev..." pill), then six secondary features as a plain text grid.
- "Inside Gleam" keeps two screenshot rows; the third (expert editor) moved into the new "Give each expert a brain" section.
- Brains table replaced by six service chips (role="tablist") with a detail panel.
- All kicker paragraphs removed.

## gleam/assets/site.css
- Rewritten: new neutral tokens (#0a0a0a background, #161616 panels, translucent lines), 400 body weight, pill buttons, frosted sticky header, borderless 28px tiles and cards.
- New components: .announce, .h1-mascot, .hero-pointer, .bento/.tile, .mock*, .ptr, .bubble, .face (CSS mascot face), .roster, .thread-head, .msg, .memo, .asking, .also, .chips/.chip-detail.
- Steps use mono 01/02/03 numbers; ticks are small mint dots; FAQ plus icon is grey.
- Removed styles for markup that no longer exists (.award-pill, .icon, .brains table, .head-with-mascot, .section-mascot).

## gleam/assets/site.js
- Intro animation targets `.hero-copy > *` and `.hero-pointer` instead of the old hero grid and mascot.
- New chip picker: `selectChip` sets aria-selected and roving tabIndex and fills the detail panel from data-use and data-need; arrow keys move between chips.
- Press feedback now covers .announce and .chip.

## gleam/*.html
- site.css bumped to v10 and site.js to v5 so browsers fetch the new files.
