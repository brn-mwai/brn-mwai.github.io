## Summary
Custom scrollbar on every Gleam site page, and Brian's team card title shortened to "Lead builder".

## gleam/assets/site.css
- `::-webkit-scrollbar*` rules (Chrome, Edge, Safari): 12px bar, page-colour track, rounded `--line-2` thumb inset by a 3px border, mint on hover and drag.
- Firefox fallback inside `@supports not selector(::-webkit-scrollbar)`: `scrollbar-width: thin` plus `scrollbar-color`. Kept behind `@supports` because Chrome 121+ drops the webkit styling (and the rounded thumb) once `scrollbar-color` is set.

## gleam/*.html
- Stylesheet link bumped to `?v=9` on all five pages so browsers fetch the new CSS.
- index.html: Brian's card subtitle "Founder, design and engineering" -> "Lead builder".
