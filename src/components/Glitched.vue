<template>
    <div :id="id" class="glitch glitching" ref="wrapper">
        <slot/>
    </div>
</template>
<script>
    let DOMComponentGlobalStyleObject = document.createElement('style');

    DOMComponentGlobalStyleObject.id = 'vue-glitch';
    DOMComponentGlobalStyleObject.innerHTML = `.glitch{position:relative;overflow:hidden;white-space:nowrap;}.glitch::before,.glitch::after{position:absolute;user-select:none;top:0;overflow:hidden;clip-path:inset(100% 0 0 0);}.glitch::before{ left: -1px; }.glitch::after{left:1px;}`;
    
    document.head.appendChild(DOMComponentGlobalStyleObject);

    export default {
        data: function() {
            return {
                DOMStyleObject: null,
                DOMStyleKeyframesObject: null,
                DOMGlobalStyleObject: DOMComponentGlobalStyleObject,
                observer: null,
                content: null,
            }
        },
        props: {
            id: {
                type: String,
                default: 'glitchy',
            },
            start: {
                type: Boolean,
                default: true,
            },
            glitch: {
                type: String,
                defualt: '',
            },
            fg: {
                type: String,
                default: 'var(--glitch-global-fg, #fff)',
            },
            bg: {
                type: String,
                default: 'var(--glitch-global-bg, #000)',
            },
            intensity: {
                type: Number,
                default: 0.7,
            },
            steps: {
                type: Number,
                default: 20,
            }
        },
        methods: {
            stopGlitching: function() {
                document.getElementById(this.id).classList.remove('glitching');
            },
            startGlitching: function() {
                document.getElementById(this.id).classList.add('glitching');
            },
            toggleGlitching: function() {
                document.getElementById(this.id).classList.toggle('glitching');
            },
            generateKeyframes: function() {
                let keyframesBefore = '', keyframesAfter = '', keyframesEl = '';

                for(let i = 0; i < this.steps; i++) {
                    keyframesBefore += `${100 * i / this.steps}%{clip-path:inset(${Math.random() * 3 > this.intensity * 2 ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`;
                    keyframesAfter += `${100 * i / this.steps}%{clip-path:inset(${Math.random() * 3 > this.intensity * 2 ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`;
                    keyframesEl += `${100 * i / this.steps}%{clip-path:inset(${Math.random() * 25 > this.intensity ? 0 : 50}% 0 ${Math.random() * 25 > this.intensity ? 0 : 25}% 0);}`
                }

                return `@-webkit-keyframes noise-anim-${this.id}{${keyframesEl}}@keyframes noise-anim-${this.id}{${keyframesEl}}@-webkit-keyframes noise-anim-${this.id}-before{${keyframesBefore}}@keyframes noise-anim-${this.id}-before{${keyframesBefore}}@-webkit-keyframes noise-anim-${this.id}-after{${keyframesAfter}}@keyframes noise-anim-${this.id}-after{${keyframesAfter}}`
            },
            regurgitateStyling: function() {
                const elDuraion = 7.9 + Math.random(), beforeDuration = 3.7 + Math.random(), afterDuration = 4.1 + Math.random();

                this.content = this.glitch || this.$refs.wrapper.innerText;

                return `#${this.id}.glitching{-webkit-animation:noise-anim-${this.id} ${elDuraion}s infinite step-end alternate-reverse;animation:noise-anim-${this.id} ${elDuraion}s infinite step-end alternate-reverse;}#${this.id}.glitch{color:${this.fg};}#${this.id}.glitching::before{-webkit-animation:noise-anim-${this.id}-before ${beforeDuration}s infinite step-end alternate-reverse;animation:noise-anim-${this.id}-before ${beforeDuration}s infinite step-end alternate-reverse;}#${this.id}.glitch::before{content:"${this.content}";color:${this.fg};background:${this.bg};text-shadow:-1px 0px ${this.fg};}#${this.id}.glitching::after{-webkit-animation:noise-anim-${this.id}-after ${afterDuration} infinite step-end alternate-reverse;animation:noise-anim-${this.id}-after ${afterDuration}s infinite step-end alternate-reverse;}#${this.id}.glitch::after{content:"${this.content}";color:${this.fg};background:${this.bg};text-shadow:1px 0 ${this.fg};}`
            }
        },
        mounted: function() {
            const componentKeyframes = this.generateKeyframes();
            const componentStyle = this.regurgitateStyling();

            this.DOMStyleObject = document.createElement('style');
            this.DOMStyleKeyframesObject = document.createElement('style');

            this.DOMStyleObject.id = `${this.id}-style`;
            this.DOMStyleObject.innerHTML = componentStyle;

            this.DOMStyleKeyframesObject.id = `${this.id}-keyframes`;
            this.DOMStyleKeyframesObject.innerHTML = componentKeyframes;

            this.DOMGlobalStyleObject.appendChild(this.DOMStyleObject);
            this.DOMGlobalStyleObject.appendChild(this.DOMStyleKeyframesObject);

            if(this.glitch !== '') {
                this.observer = new MutationObserver(function(mutations) {
                    this.DOMStyleObject.innerHTML = this.regurgitateStyling();
                }.bind(this));

                this.observer.observe(this.$el, { 
                    characterData: true, 
                    childList: true,
                    subtree: true,
                });
            }
        },
        beforeDestroy: function() {
            if(this.glitch !== '') {
                this.observer.disconnect();
            }
        }
    }
</script>