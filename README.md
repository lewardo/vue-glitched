# Simple Vue 3 text glitching component

```html
<Glitch id="glitchy">simple text glitching vue component</Glitch>
<Glitch id="intense" :intensity=0.9>built with vue & vite</Glitch>
<Glitch id="colourful" bg="#1d2021" fg="#ebdbb2" colour="#928374">
    simple to use, customisable
</Glitch>
<Glitch id="deferred" :start=false text="glitching overlay text">
    and completely open source <3
</Glitch>
```

```js
const required_attrs = [ 'id' ]
const default_props = {
    fg: 'var(--glitch-global-fg, #fff)',
    bg: 'var(--glitch-global-bg, #000)',
    start: true,
    text: {{ slot.$innerText }},
    intensity: 0.7,
    steps: 20
}
```

```bash
npm install vue-glitched@latest
```