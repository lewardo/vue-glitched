"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("vue"),l=(e,i)=>{const t=e.__vccOpts||e;for(const[n,s]of i)t[n]=s;return t};let r=document.createElement("style"),o=document.createElement("style");r.id="vue-glitch";o.id="glitch-global-style";o.innerHTML=".glitch{position:relative;overflow:hidden}.glitch::before,.glitch::after{position:absolute;user-select:none;top:0;overflow:hidden;clip-path:inset(100% 0 0 0);}.glitch::before{ left: -1px; }.glitch::after{left:1px;}";document.head.appendChild(r);r.appendChild(o);const h={data:function(){return{DOMStyleObject:null,DOMKeyframesObject:null,DOMGlobalContainerObject:r}},props:{id:{type:String,required:!0},sync:{type:String,default:""},text:{type:String,defualt:""},defer:{type:Boolean},bg:{type:String,default:"var(--glitch-global-bg, black)"},fg:{type:String,default:"var(--glitch-global-fg, white)"},fga:{type:String,default:"var(--glitch-global-fg, white)"},fgb:{type:String,default:"var(--glitch-global-fg, white)"},intense:{type:Boolean},subtle:{type:Boolean},simple:{type:Boolean},complex:{type:Boolean}},computed:{DOMGlitchObject:function(){return this.$refs.glitch},steps:function(){return this.simple^this.complex?this.simple?10:40:20},intensity:function(){return this.subtle^this.intense?this.subtle?.1:1:.7},content:function(){return this.text||this.DOMGlitchObject.innerText},animation:function(){return this.sync||this.id}},expose:["noglitch","glitch"],methods:{noglitch:function(){this.DOMGlitchObject.classList.remove("glitching")},glitch:function(){this.DOMGlitchObject.classList.add("glitching")},generateKeyframes:function(){let e="",i="",t="";for(let n=0;n<this.steps;n++){const s=Math.round(100*n/this.steps);e+=`${s}%{clip-path:inset(${Math.random()*25>this.intensity?0:50}% 0 ${Math.random()*25>this.intensity?0:25}% 0);}`,i+=`${s}%{clip-path:inset(${Math.random()>this.intensity?100:Math.round(Math.random()*100)}% 0 ${Math.round(Math.random()*100)}% 0);}`,t+=`${s}%{clip-path:inset(${Math.random()>this.intensity?100:Math.round(Math.random()*100)}% 0 ${Math.round(Math.random()*100)}% 0);}`}return`@-webkit-keyframes noise-anim-${this.id}{${e}}@keyframes noise-anim-${this.id}{${e}}@-webkit-keyframes noise-anim-${this.id}-before{${i}}@keyframes noise-anim-${this.id}-before{${i}}@-webkit-keyframes noise-anim-${this.id}-after{${t}}@keyframes noise-anim-${this.id}-after{${t}}`},regurgitateStyling:function(){const e=(7.9+Math.random()).toFixed(2),i=(3.7+Math.random()).toFixed(2),t=(4.1+Math.random()).toFixed(2);return`#${this.id}.glitching{-webkit-animation:noise-anim-${this.animation} ${e}s infinite step-end alternate-reverse;animation:noise-anim-${this.animation} ${e}s infinite step-end alternate-reverse;}#${this.id}.glitch{color:${this.fg};}#${this.id}.glitching::before{-webkit-animation:noise-anim-${this.animation}-before ${i}s infinite step-end alternate-reverse;animation:noise-anim-${this.animation}-before ${i}s infinite step-end alternate-reverse;}#${this.id}.glitch::before{content:"${this.content}";color:${this.fgb};background:${this.bg};text-shadow:-1px 0px ${this.fgb};}#${this.id}.glitching::after{-webkit-animation:noise-anim-${this.animation}-after ${t} infinite step-end alternate-reverse;animation:noise-anim-${this.animation}-after ${t}s infinite step-end alternate-reverse;}#${this.id}.glitch::after{content:"${this.content}";color:${this.fga};background:${this.bg};text-shadow:1px 0 ${this.fga};}`},appendStyle:function(e,i){const t=document.createElement("style");t.id=e,t.innerHTML=i,this.DOMGlobalContainerObject.appendChild(t)}},mounted:function(){const e=this.generateKeyframes(),i=this.regurgitateStyling();this.appendStyle(`${this.id}-style`,i),this.sync||this.appendStyle(`${this.id}-keyframes`,e),this.defer||this.glitch(),this.glitch&&(this.observer=new MutationObserver(function(t){this.DOMStyleObject.innerHTML=this.regurgitateStyling()}.bind(this)),this.observer.observe(this.DOMGlitchObject,{characterData:!0,childList:!0,subtree:!0}))},beforeDestroy:function(){this.glitch!==""&&this.observer.disconnect()}},c=["id"];function d(e,i,t,n,s,g){return a.openBlock(),a.createElementBlock("span",{id:t.id,class:"glitch",ref:"glitch"},[a.renderSlot(e.$slots,"default")],8,c)}const f=l(h,[["render",d]]);exports.Glitch=f;
