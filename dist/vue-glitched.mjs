/*
 * vue-glitched v0.3.3
 *
 * Copyright (c) 2023 lewardo (https://github.com/lewardo)
 * SPDX-License-Identifier: GPL-3.0+                                  
 *                       _ _ _       _         _ 
 *   _ _ _ _ ___ ___ ___| |_| |_ ___| |_ ___ _| |
 *  | | | | | -_|___| . | | |  _|  _|   | -_| . |
 *   \_/|___|___|   |_  |_|_|_| |___|_|_|___|___|
 *                  |___|                        
 */
import { openBlock as o, createElementBlock as l, renderSlot as h } from "vue";
const c = (e, i) => {
  const t = e.__vccOpts || e;
  for (const [n, s] of i)
    t[n] = s;
  return t;
};
let a = document.createElement("style"), r = document.createElement("style");
a.id = "vue-glitch";
r.id = "glitch-global-style";
r.innerHTML = ".glitch{position:relative;overflow:hidden;white-space:nowrap}.glitch::before,.glitch::after{position:absolute;user-select:none;top:0;overflow:hidden;clip-path:inset(100% 0 0 0);}.glitch::before{ left: -1px; }.glitch::after{left:1px;}";
document.head.appendChild(a);
a.appendChild(r);
const f = {
  data: function() {
    return {
      DOMStyleObject: null,
      DOMKeyframesObject: null,
      DOMGlobalContainerObject: a
    };
  },
  props: {
    id: {
      type: String,
      required: !0
    },
    sync: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      defualt: ""
    },
    defer: {
      type: Boolean
    },
    bg: {
      type: String,
      default: "var(--glitch-global-bg, #000)"
    },
    fg: {
      type: String,
      default: "var(--glitch-global-fg, #fff)"
    },
    fga: {
      type: String,
      default: "var(--glitch-global-fg, #fff)"
    },
    fgb: {
      type: String,
      default: "var(--glitch-global-fg, #fff)"
    },
    intense: {
      type: Boolean
    },
    subtle: {
      type: Boolean
    },
    simple: {
      type: Boolean
    },
    complex: {
      type: Boolean
    }
  },
  computed: {
    DOMGlitchObject: function() {
      return this.$refs.glitch;
    },
    steps: function() {
      return this.simple ^ this.complex ? this.simple ? 10 : 50 : 20;
    },
    intensity: function() {
      return this.subtle ^ this.intense ? this.subtle ? 0.1 : 1 : 0.7;
    },
    content: function() {
      return this.text || this.DOMGlitchObject.innerText;
    },
    animation: function() {
      return this.sync || this.id;
    }
  },
  expose: ["noglitch", "glitch"],
  methods: {
    noglitch: function() {
      this.DOMGlitchObject.classList.remove("glitching");
    },
    glitch: function() {
      this.DOMGlitchObject.classList.add("glitching");
    },
    generateKeyframes: function() {
      let e = "", i = "", t = "";
      for (let n = 0; n < this.steps; n++) {
        const s = 100 * n / this.steps;
        e += `${s}%{clip-path: inset(${Math.random() * 25 > this.intensity ? 0 : 50}% 0 ${Math.random() * 25 > this.intensity ? 0 : 25}% 0);}`, i += `${s}%{clip-path: inset(${Math.random() > this.intensity ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`, t += `${s}%{clip-path: inset(${Math.random() > this.intensity ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`;
      }
      return `@-webkit-keyframes noise-anim-${this.id}{${e}}@keyframes noise-anim-${this.id}{${e}}@-webkit-keyframes noise-anim-${this.id}-before{${i}}@keyframes noise-anim-${this.id}-before{${i}}@-webkit-keyframes noise-anim-${this.id}-after{${t}}@keyframes noise-anim-${this.id}-after{${t}}`;
    },
    regurgitateStyling: function() {
      const e = 7.9 + Number.parseFloat(Math.random().toFixed(3)), i = 3.7 + Number.parseFloat(Math.random().toFixed(3)), t = 4.1 + Number.parseFloat(Math.random().toFixed(3));
      return `#${this.id}.glitching{-webkit-animation:noise-anim-${this.animation} ${e}s infinite step-end alternate-reverse;animation:noise-anim-${this.animation} ${e}s infinite step-end alternate-reverse;}#${this.id}.glitch{color:${this.fg};}#${this.id}.glitching::before{-webkit-animation:noise-anim-${this.animation}-before ${i}s infinite step-end alternate-reverse;animation:noise-anim-${this.animation}-before ${i}s infinite step-end alternate-reverse;}#${this.id}.glitch::before{content:"${this.content}";color:${this.fgb};background:${this.bg};text-shadow:-1px 0px ${this.fgb};}#${this.id}.glitching::after{-webkit-animation:noise-anim-${this.animation}-after ${t} infinite step-end alternate-reverse;animation:noise-anim-${this.animation}-after ${t}s infinite step-end alternate-reverse;}#${this.id}.glitch::after{content:"${this.content}";color:${this.fga};background:${this.bg};text-shadow:1px 0 ${this.fga};}`;
    },
    appendStyle: function(e, i) {
      const t = document.createElement("style");
      t.id = e, t.innerHTML = i, this.DOMGlobalContainerObject.appendChild(t);
    }
  },
  mounted: function() {
    const e = this.generateKeyframes(), i = this.regurgitateStyling();
    this.appendStyle(`${this.id}-style`, i), this.sync || this.appendStyle(`${this.id}-keyframes`, e), this.defer || this.glitch(), this.glitch && (this.observer = new MutationObserver(function(t) {
      this.DOMStyleObject.innerHTML = this.regurgitateStyling();
    }.bind(this)), this.observer.observe(this.DOMGlitchObject, {
      characterData: !0,
      childList: !0,
      subtree: !0
    }));
  },
  beforeDestroy: function() {
    this.glitch !== "" && this.observer.disconnect();
  }
}, d = ["id"];
function m(e, i, t, n, s, p) {
  return o(), l("span", {
    id: t.id,
    class: "glitch",
    ref: "glitch"
  }, [
    h(e.$slots, "default")
  ], 8, d);
}
const u = /* @__PURE__ */ c(f, [["render", m]]);
export {
  u as Glitch
};
