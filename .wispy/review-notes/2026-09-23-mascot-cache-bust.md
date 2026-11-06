## Summary
The overlapping trophy stars reappeared in the browser because it kept its cached copy of gold-trophy.webp. The live file on GitHub Pages already matched the fixed local file (same SHA-1, b34556d2...). The old version was 0d873c99...

## gleam/index.html
- `gold-trophy.webp` and `pointing.webp` are now requested with `?v=2`. The new URL makes every browser fetch the fixed image instead of reusing the old cached one. Bump the number whenever either image is replaced again.
- Checked og.png (the link share card): it has no sparkles, so nothing to fix there.
