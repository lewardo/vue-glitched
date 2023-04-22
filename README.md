# Simple Vue 3 text glitching component

```html
<glitched bg="#2E3440" fg="#D8DEE9">text glitching vue component</glitched>
<glitched id="broken" intensity="0.7">use attrs to control behaviour</glitched>
```

```js
const default_props = {
    id: "glitchy",
    fg: "black",
    bg: "white",
    intensity: "0.4",
    steps: "20",
}
```