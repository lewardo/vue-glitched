# Simple Vue 3 text glitching component

```html
<Glitch id="glitchy">simple text glitching vue component</Glitch>
<Glitch id="intense" intense complex>built with vue & vite</Glitch>
<Glitch id="colourful" bg="#1d2021" fg="#ebdbb2">
    simple to use, customisable
</Glitch>
<Glitch id="deferred" defer text="glitching overlay text">
    and completely open source <3
</Glitch>
```

```js
// required attributes for component to function
const required_attrs = [ 'id' ]

// default values for optional props
const prop_defaults = {
    sync: '',
    fg: 'var(--glitch-global-fg, white)',
    bg: 'var(--glitch-global-bg, black)',
    text: {{ slot.$innerText }}
}

// prop switches that alter behaviour if present
const prop_options = [
    simple,
    complex,
    defer,
    intense,
    subtle
]
```

```bash
# install latest version to project directory
npm install vue-glitched@latest
```