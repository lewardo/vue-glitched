# Simple Vue 3 text glitching component


![build validation](https://github.com/lewardo/vue-glitched/actions/workflows/build-validation.yml/badge.svg)
![demo validation](https://github.com/lewardo/vue-glitched/actions/workflows/demo-validation.yml/badge.svg)
![demo deployment](https://github.com/lewardo/vue-glitched/actions/workflows/pages/pages-build-deployment/badge.svg)


A simple to use, customisable `vue` component to add a glitch effect to text, built with `vite`<sup>[\[1\]](https://t.ly/Ltdz)</sup>

![npm version](https://img.shields.io/npm/v/vue-glitched?style=plastic)
![github version](https://img.shields.io/npm/v/vue-glitched/latest?label=github&registry_uri=https%3A%2F%2Fnpm.pkg.github.com&style=plastic)

```bash
# instal latest component version to project directory
npm install vue-glitched
```
```js
// global-scope registration
import { createApp } from 'vue'
import { Glitch } from 'vue-glitched'

createApp({}).component('Glitch', Glitch);  
```

### 
```html
<!-- component-scope registration -->
<script>
import { Glitch } from 'vue-glitched'

export default {
  components: {
    Glitch
  }
}
</script>
``` 
```html
<!-- component usage -->
<Glitch id="glitchy">
    simple text glitching vue component (requires unique id)
</Glitch>
<Glitch id="intense" intense>
    you can change intensity with the `intense` and `subtle` attributes
</Glitch>
<Glitch id="complex" complex>
    or the number of steps in animation with `simple` and `complex` attributes
</Glitch>
<Glitch id="colourful" bg="#1d2021" fg="#ebdbb2">
    you can customise the text and background colours with `bg` and `fg`
</Glitch>
<Glitch id="psychadelic" fga="red" fgb="blue">
    and the glitching colours with `fga` and `fgb`
</Glitch>
<Glitch id="different" text="glitching overlay text">
    even set the text that glitches on top (reactive innerText by default)
</Glitch>
<Glitch id="synced" sync="glitchy">
    or synchronise glitching effect with another element (by id)
</Glitch>
<Glitch id="stopped" defer>
    and even not start the effect by default (use exposed `glitch` and `noglitch` methods to control effect)
</Glitch>
<!-- set defaults for glitching colours -->
<style>
    :root {
        --glitch-global-bg: #1d2021;
        --glitch-global-fg: #ebdbb2;

        --glitch-global-fga: #076678;
        --glitch-global-fgb: #cc241d;
    }
</style>
```
```js
// required attributes for component to function
const required_attrs = [ 'id' ]

// default values for props
const prop_defaults = {
    fg:  'var(--glitch-global-fg,  black)',
    bg:  'var(--glitch-global-bg,  white)',
    fga: 'var(--glitch-global-fga, black)',
    fgb: 'var(--glitch-global-fgb, black)',
    text: {{ slot.$innerText }},
    sync: ''
}

// prop switches to customise behaviour
const prop_options = [
    simple,
    complex,
    intense,
    subtle,
    defer
]
```
```bash
# start vite development server
npm run dev
# build library from component
npm run build
# build demo site to docs directory
npm run docs
```

## acknowledgements
based on the effect described in [this article](https://css-tricks.com/glitch-effect-text-images-svg/) with some improvements, inspired by the legacy [vue-glitch](https://github.com/ianaya89/vue-glitch), and hoping to be to vue what [mgGlitch](https://github.com/hmongouachon/mgGlitch) was to [jquery](https://jquery.com)

## license
![license](https://img.shields.io/npm/l/vue-glitched?style=plastic)