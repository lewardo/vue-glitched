<template>
    <span :id="id" class="glitch" ref="glitch">
        <slot></slot>
    </span>
</template>

<script>
    let DOMComponentContainerObject = document.createElement('style');
    let DOMComponentStyleObject = document.createElement('style');

    DOMComponentContainerObject.id = 'vue-glitch';

    DOMComponentStyleObject.id = 'glitch-global-style';
    DOMComponentStyleObject.innerHTML = `.glitch{position:relative;overflow:hidden}.glitch::before,.glitch::after{position:absolute;user-select:none;top:0;overflow:hidden;clip-path:inset(100% 0 0 0);}.glitch::before{ left: -1px; }.glitch::after{left:1px;}`;
    
    document.head.appendChild(DOMComponentContainerObject);
    DOMComponentContainerObject.appendChild(DOMComponentStyleObject);

    export default {
        data: function() {
            return {
                DOMStyleObject: null,
                DOMKeyframesObject: null,
                DOMGlobalContainerObject: DOMComponentContainerObject,
            }
        },
        props: {
            id: {
                type: String,
                required: true,
            },
            sync: {
                type: String,
                default: '',
            },
            text: {
                type: String,
                defualt: '',
            },
            defer: {
                type: Boolean,
            },
            bg: {
                type: String,
                default: 'var(--glitch-global-bg, #000)',
            },
            fg: {
                type: String,
                default: 'var(--glitch-global-fg, #fff)',
            },
            fga: {
                type: String,
                default: 'var(--glitch-global-fg, #fff)',
            },
            fgb: {
                type: String,
                default: 'var(--glitch-global-fg, #fff)',
            },
            intense: {
                type: Boolean,
            },
            subtle: {
                type: Boolean,
            },
            simple: {
                type: Boolean,
            },
            complex: {
                type: Boolean,
            },
        },
        computed: {
            DOMGlitchObject: function() {
                return this.$refs.glitch;
            },
            steps: function() {
                if(this.simple ^ this.complex) {
                    if(this.simple) return 10;
                    else return 40;
                } else {
                    return 20;
                }
            },
            intensity: function() {
                if(this.subtle ^ this.intense) {
                    if(this.subtle) return 0.1;
                    else return 1;
                } else {
                    return 0.7;
                }
            },
            content: function() {
                return this.text || this.DOMGlitchObject.innerText;
            },
            animation: function() {
                return this.sync || this.id;
            }
        },
        expose: ['noglitch', 'glitch'],
        methods: {
            noglitch: function() {
                this.DOMGlitchObject.classList.remove('glitching');
            },
            glitch: function() {
                this.DOMGlitchObject.classList.add('glitching');
            },
            generateKeyframes: function() {
                let keyframes = '', keyframesBefore = '', keyframesAfter = '';

                for(let i = 0; i < this.steps; i++) {
                    const percent = Math.round(100 * i / this.steps);

                    keyframes += `${percent}%{clip-path:inset(${Math.random() * 25 > this.intensity ? 0 : 50}% 0 ${Math.random() * 25 > this.intensity ? 0 : 25}% 0);}`;
                    keyframesBefore += `${percent}%{clip-path:inset(${Math.random() > this.intensity ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`;
                    keyframesAfter += `${percent}%{clip-path:inset(${Math.random() > this.intensity ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`;
                }

                return `@-webkit-keyframes noise-anim-${this.id}{${keyframes}}@keyframes noise-anim-${this.id}{${keyframes}}@-webkit-keyframes noise-anim-${this.id}-before{${keyframesBefore}}@keyframes noise-anim-${this.id}-before{${keyframesBefore}}@-webkit-keyframes noise-anim-${this.id}-after{${keyframesAfter}}@keyframes noise-anim-${this.id}-after{${keyframesAfter}}`
            },
            regurgitateStyling: function() {
                const duraion = (7.9 + Math.random()).toFixed(2), 
                      beforeDuration = (3.7 + Math.random()).toFixed(2), 
                      afterDuration = (4.1 + Math.random()).toFixed(2);
                
                return `#${this.id}.glitching{-webkit-animation:noise-anim-${this.animation} ${duraion}s infinite step-end alternate-reverse;animation:noise-anim-${this.animation} ${duraion}s infinite step-end alternate-reverse;}#${this.id}.glitch{color:${this.fg};}#${this.id}.glitching::before{-webkit-animation:noise-anim-${this.animation}-before ${beforeDuration}s infinite step-end alternate-reverse;animation:noise-anim-${this.animation}-before ${beforeDuration}s infinite step-end alternate-reverse;}#${this.id}.glitch::before{content:"${this.content}";color:${this.fgb};background:${this.bg};text-shadow:-1px 0px ${this.fgb};}#${this.id}.glitching::after{-webkit-animation:noise-anim-${this.animation}-after ${afterDuration} infinite step-end alternate-reverse;animation:noise-anim-${this.animation}-after ${afterDuration}s infinite step-end alternate-reverse;}#${this.id}.glitch::after{content:"${this.content}";color:${this.fga};background:${this.bg};text-shadow:1px 0 ${this.fga};}`
            },
            appendStyle: function(id, style) {
                const el = document.createElement('style');

                el.id = id;
                el.innerHTML = style;

                this.DOMGlobalContainerObject.appendChild(el);
            }
        },
        mounted: function() {
            const componentKeyframes = this.generateKeyframes();
            const componentStyle = this.regurgitateStyling();

            this.appendStyle(`${this.id}-style`, componentStyle);

            this.sync || this.appendStyle(`${this.id}-keyframes`, componentKeyframes);
            this.defer || this.glitch();

            if(this.glitch) {
                this.observer = new MutationObserver(function(mutations) {
                    this.DOMStyleObject.innerHTML = this.regurgitateStyling();
                }.bind(this));

                this.observer.observe(this.DOMGlitchObject, { 
                    characterData: true, 
                    childList: true,
                    subtree: true,
                });
            }
        },
        beforeDestroy: function() {
            this.glitch !== '' && this.observer.disconnect();
        }
    }
</script>