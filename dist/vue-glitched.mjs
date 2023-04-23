import { openBlock as o, createElementBlock as l, renderSlot as h } from "vue";
const c = (t, i) => {
  const e = t.__vccOpts || t;
  for (const [s, n] of i)
    e[s] = n;
  return e;
};
let r = document.createElement("style"), a = document.createElement("style");
r.id = "vue-glitch";
a.id = "glitch-global-style";
a.innerHTML = ".glitch{position:relative;overflow:hidden;white-space:nowrap;}.glitch::before,.glitch::after{position:absolute;user-select:none;top:0;overflow:hidden;clip-path:inset(100% 0 0 0);}.glitch::before{ left: -1px; }.glitch::after{left:1px;}";
document.head.appendChild(r);
r.appendChild(a);
const d = {
  data: function() {
    return {
      DOMStyleObject: null,
      DOMStyleKeyframesObject: null,
      DOMGlobalContainerObject: r
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
      for (let s = 0; s < this.steps; s++) {
        const n = Math.round(100 * s / this.steps);
        t += `${n}%{clip-path:inset(${Math.random() > this.intensity ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`, i += `${n}%{clip-path:inset(${Math.random() > this.intensity ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`, e += `${n}%{clip-path:inset(${Math.random() * 25 > this.intensity ? 0 : 50}% 0 ${Math.random() * 25 > this.intensity ? 0 : 25}% 0);}`;
      }
      return `@-webkit-keyframes noise-anim-${this.id}{${e}}@keyframes noise-anim-${this.id}{${e}}@-webkit-keyframes noise-anim-${this.id}-before{${t}}@keyframes noise-anim-${this.id}-before{${t}}@-webkit-keyframes noise-anim-${this.id}-after{${i}}@keyframes noise-anim-${this.id}-after{${i}}`;
    },
    regurgitateStyling: function() {
      const t = (7.9 + Math.random()).toFixed(2), i = (3.7 + Math.random()).toFixed(2), e = (4.1 + Math.random()).toFixed(2), s = this.text || this.$refs.wrapper.innerText, n = this.colour || this.fg;
      return `#${this.id}.glitching{-webkit-animation:noise-anim-${this.id} ${t}s infinite step-end alternate-reverse;animation:noise-anim-${this.id} ${t}s infinite step-end alternate-reverse;}#${this.id}.glitch{color:${this.fg};}#${this.id}.glitching::before{-webkit-animation:noise-anim-${this.id}-before ${i}s infinite step-end alternate-reverse;animation:noise-anim-${this.id}-before ${i}s infinite step-end alternate-reverse;}#${this.id}.glitch::before{content:"${s}";color:${n};background:${this.bg};text-shadow:-1px 0px ${n};}#${this.id}.glitching::after{-webkit-animation:noise-anim-${this.id}-after ${e} infinite step-end alternate-reverse;animation:noise-anim-${this.id}-after ${e}s infinite step-end alternate-reverse;}#${this.id}.glitch::after{content:"${s}";color:${n};background:${this.bg};text-shadow:1px 0 ${n};}`;
    }
  },
  mounted: function() {
    const t = this.generateKeyframes(), i = this.regurgitateStyling();
    this.DOMStyleObject = document.getElementById(`${this.id}-style`) || document.createElement("style"), this.DOMStyleKeyframesObject = document.getElementById(`${this.id}-keyframes`) || document.createElement("style"), this.DOMStyleObject.id = `${this.id}-style`, this.DOMStyleObject.innerHTML = i, this.DOMStyleKeyframesObject.id = `${this.id}-keyframes`, this.DOMStyleKeyframesObject.innerHTML = t, this.DOMGlobalContainerObject.appendChild(this.DOMStyleObject), this.DOMGlobalContainerObject.appendChild(this.DOMStyleKeyframesObject), this.start && this.glitch(), this.glitch !== "" && (this.observer = new MutationObserver(function(e) {
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
function m(t, i, e, s, n, g) {
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
