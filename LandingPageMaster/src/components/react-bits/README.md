# React Bits (vendored)

`Magnet`, `OrbitImages` and `SpotlightCard` come from [React Bits](https://reactbits.dev) by David Haz and its contributors, installed from the public registry (`https://reactbits.dev/r/<Name>-TS-TW.json`) and kept as published, with each file's author header intact. They are excluded from ESLint on purpose.

License: MIT + Commons Clause, see `LICENSE.md` in this folder. Use inside a website or product is allowed; the notice must stay with the copies.

Not used here: `BlurText`. Its markup adds a hidden second copy of the sentence and puts each word on its own line, so copying a heading pastes it twice, one word per line. `src/components/brand/SectionTitle.tsx` has the same blur-in effect with one real sentence.

Also not used: `Grainient` (WebGL). On a real GPU it painted a pale wash over the dark panels, which headless Chrome without a GPU never showed. Anything WebGL needs a look on real hardware before it ships.
