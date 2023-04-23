import { openBlock as o, createElementBlock as l, renderSlot as h } from "vue";
const c = (t, i) => {
  const e = t.__vccOpts || t;
  for (const [n, a] of i)
    e[n] = a;
  return e;
};
let s = document.createElement("style"), r = document.createElement("style");
s.id = "vue-glitch";
r.id = "glitch-global-style";
r.innerHTML = ".glitch{position:relative;overflow:hidden;white-space:nowrap;}.glitch::before,.glitch::after{position:absolute;user-select:none;top:0;overflow:hidden;clip-path:inset(100% 0 0 0);}.glitch::before{ left: -1px; }.glitch::after{left:1px;}";
document.head.appendChild(s);
s.appendChild(r);
const d = {
  data: function() {
    return {
      DOMStyleObject: null,
      DOMStyleKeyframesObject: null,
      DOMGlobalContainerObject: s
    };
  },
  props: {
    id: {
      type: String,
      required: !0
    },
    start: {
      type: Boolean,
      default: !0
    },
    text: {
      type: String,
      defualt: ""
    },
    fg: {
      type: String,
      default: "var(--glitch-global-fg, #fff)"
    },
    bg: {
      type: String,
      default: "var(--glitch-global-bg, #000)"
    },
    colour: {
      type: String,
      default: ""
    },
    intensity: {
      type: Number,
      default: 0.7
    },
    steps: {
      type: Number,
      default: 20
    }
  },
  expose: ["noglitch", "glitch"],
  methods: {
    noglitch: function() {
      document.getElementById(this.id).classList.remove("glitching");
    },
    glitch: function() {
      document.getElementById(this.id).classList.add("glitching");
    },
    generateKeyframes: function() {
      let t = "", i = "", e = "";
      for (let n = 0; n < this.steps; n++)
        t += `${100 * n / this.steps}%{clip-path:inset(${Math.random() * 3 > this.intensity * 2 ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`, i += `${100 * n / this.steps}%{clip-path:inset(${Math.random() * 3 > this.intensity * 2 ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`, e += `${100 * n / this.steps}%{clip-path:inset(${Math.random() * 25 > this.intensity ? 0 : 50}% 0 ${Math.random() * 25 > this.intensity ? 0 : 25}% 0);}`;
      return `@-webkit-keyframes noise-anim-${this.id}{${e}}@keyframes noise-anim-${this.id}{${e}}@-webkit-keyframes noise-anim-${this.id}-before{${t}}@keyframes noise-anim-${this.id}-before{${t}}@-webkit-keyframes noise-anim-${this.id}-after{${i}}@keyframes noise-anim-${this.id}-after{${i}}`;
    },
    regurgitateStyling: function() {
      const t = 7.9 + Math.random(), i = 3.7 + Math.random(), e = 4.1 + Math.random();
      return this.content = this.text || this.$refs.wrapper.innerText, this.glitchColour = this.colour || this.fg, `#${this.id}.glitching{-webkit-animation:noise-anim-${this.id} ${t}s infinite step-end alternate-reverse;animation:noise-anim-${this.id} ${t}s infinite step-end alternate-reverse;}#${this.id}.glitch{color:${this.fg};}#${this.id}.glitching::before{-webkit-animation:noise-anim-${this.id}-before ${i}s infinite step-end alternate-reverse;animation:noise-anim-${this.id}-before ${i}s infinite step-end alternate-reverse;}#${this.id}.glitch::before{content:"${this.content}";color:${this.glitchColour};background:${this.bg};text-shadow:-1px 0px ${this.glitchColour};}#${this.id}.glitching::after{-webkit-animation:noise-anim-${this.id}-after ${e} infinite step-end alternate-reverse;animation:noise-anim-${this.id}-after ${e}s infinite step-end alternate-reverse;}#${this.id}.glitch::after{content:"${this.content}";color:${this.glitchColour};background:${this.bg};text-shadow:1px 0 ${this.glitchColour};}`;
    }
  },
  mounted: function() {
    const t = this.generateKeyframes(), i = this.regurgitateStyling();
    this.DOMStyleObject = document.createElement("style"), this.DOMStyleKeyframesObject = document.createElement("style"), this.DOMStyleObject.id = `${this.id}-style`, this.DOMStyleObject.innerHTML = i, this.DOMStyleKeyframesObject.id = `${this.id}-keyframes`, this.DOMStyleKeyframesObject.innerHTML = t, this.DOMGlobalContainerObject.appendChild(this.DOMStyleObject), this.DOMGlobalContainerObject.appendChild(this.DOMStyleKeyframesObject), this.start && this.glitch(), this.glitch !== "" && (this.observer = new MutationObserver(function(e) {
      this.DOMStyleObject.innerHTML = this.regurgitateStyling();
    }.bind(this)), this.observer.observe(this.$el, {
      characterData: !0,
      childList: !0,
      subtree: !0
    }));
  },
  beforeDestroy: function() {
    this.glitch !== "" && this.observer.disconnect();
  }
}, f = ["id"];
function m(t, i, e, n, a, g) {
  return o(), l("span", {
    id: e.id,
    class: "glitch",
    ref: "wrapper"
  }, [
    h(t.$slots, "default")
  ], 8, f);
}
const p = /* @__PURE__ */ c(d, [["render", m]]);
export {
  p as Glitch
};
