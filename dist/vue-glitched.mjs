import { openBlock as a, createElementBlock as o, renderSlot as l } from "vue";
const h = (t, i) => {
  const e = t.__vccOpts || t;
  for (const [n, r] of i)
    e[n] = r;
  return e;
};
let s = document.createElement("style");
s.id = "vue-glitch";
s.innerHTML = ".glitch{position:relative;overflow:hidden;white-space:nowrap;}.glitch::before,.glitch::after{position:absolute;user-select:none;top:0;overflow:hidden;clip-path:inset(100% 0 0 0);}.glitch::before{ left: -1px; }.glitch::after{left:1px;}";
document.head.appendChild(s);
const c = {
  data: function() {
    return {
      DOMStyleObject: null,
      DOMStyleKeyframesObject: null,
      DOMGlobalStyleObject: s,
      observer: null,
      content: null
    };
  },
  props: {
    id: {
      type: String,
      default: "glitchy"
    },
    start: {
      type: Boolean,
      default: !0
    },
    glitch: {
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
    intensity: {
      type: Number,
      default: 0.7
    },
    steps: {
      type: Number,
      default: 20
    }
  },
  methods: {
    stopGlitching: function() {
      document.getElementById(this.id).classList.remove("glitching");
    },
    startGlitching: function() {
      document.getElementById(this.id).classList.add("glitching");
    },
    toggleGlitching: function() {
      document.getElementById(this.id).classList.toggle("glitching");
    },
    generateKeyframes: function() {
      let t = "", i = "", e = "";
      for (let n = 0; n < this.steps; n++)
        t += `${100 * n / this.steps}%{clip-path:inset(${Math.random() * 3 > this.intensity * 2 ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`, i += `${100 * n / this.steps}%{clip-path:inset(${Math.random() * 3 > this.intensity * 2 ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`, e += `${100 * n / this.steps}%{clip-path:inset(${Math.random() * 25 > this.intensity ? 0 : 50}% 0 ${Math.random() * 25 > this.intensity ? 0 : 25}% 0);}`;
      return `@-webkit-keyframes noise-anim-${this.id}{${e}}@keyframes noise-anim-${this.id}{${e}}@-webkit-keyframes noise-anim-${this.id}-before{${t}}@keyframes noise-anim-${this.id}-before{${t}}@-webkit-keyframes noise-anim-${this.id}-after{${i}}@keyframes noise-anim-${this.id}-after{${i}}`;
    },
    regurgitateStyling: function() {
      const t = 7.9 + Math.random(), i = 3.7 + Math.random(), e = 4.1 + Math.random();
      return this.content = this.glitch || this.$refs.wrapper.innerText, `#${this.id}.glitching{-webkit-animation:noise-anim-${this.id} ${t}s infinite step-end alternate-reverse;animation:noise-anim-${this.id} ${t}s infinite step-end alternate-reverse;}#${this.id}.glitch{color:${this.fg};}#${this.id}.glitching::before{-webkit-animation:noise-anim-${this.id}-before ${i}s infinite step-end alternate-reverse;animation:noise-anim-${this.id}-before ${i}s infinite step-end alternate-reverse;}#${this.id}.glitch::before{content:"${this.content}";color:${this.fg};background:${this.bg};text-shadow:-1px 0px ${this.fg};}#${this.id}.glitching::after{-webkit-animation:noise-anim-${this.id}-after ${e} infinite step-end alternate-reverse;animation:noise-anim-${this.id}-after ${e}s infinite step-end alternate-reverse;}#${this.id}.glitch::after{content:"${this.content}";color:${this.fg};background:${this.bg};text-shadow:1px 0 ${this.fg};}`;
    }
  },
  mounted: function() {
    const t = this.generateKeyframes(), i = this.regurgitateStyling();
    this.DOMStyleObject = document.createElement("style"), this.DOMStyleKeyframesObject = document.createElement("style"), this.DOMStyleObject.id = `${this.id}-style`, this.DOMStyleObject.innerHTML = i, this.DOMStyleKeyframesObject.id = `${this.id}-keyframes`, this.DOMStyleKeyframesObject.innerHTML = t, this.DOMGlobalStyleObject.appendChild(this.DOMStyleObject), this.DOMGlobalStyleObject.appendChild(this.DOMStyleKeyframesObject), this.glitch !== "" && (this.observer = new MutationObserver(function(e) {
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
}, d = ["id"];
function f(t, i, e, n, r, g) {
  return a(), o("div", {
    id: e.id,
    class: "glitch glitching",
    ref: "wrapper"
  }, [
    l(t.$slots, "default")
  ], 8, d);
}
const u = /* @__PURE__ */ h(c, [["render", f]]);
export {
  u as glitch
};
