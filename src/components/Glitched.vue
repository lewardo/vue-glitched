<template>
    <div :id="id" class="glitch" ref="wrapper">
        <slot/>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                DOMStyleObject: null,
                DOMStyleKeyframesObject: null,
                observer: null,
            }
        },
        props: {
            id: {
                type: String,
                default: 'glitchy',
            },
            glitch: {
                type: String,
                defualt: '',
            },
            fg: {
                type: String,
                default: 'black',
            },
            bg: {
                type: String,
                default: 'white',
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
            generateKeyframes: function() {
                let keyframes1 = '', keyframes2 = '';

                for(let i = 0; i < this.steps; i++) {
                    keyframes1 += `${100 * i / this.steps}%{clip-path:inset(${Math.random() > this.intensity ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`
                    keyframes2 += `${100 * i / this.steps}%{clip-path:inset(${Math.random() > this.intensity ? 100 : Math.round(Math.random() * 100)}% 0 ${Math.round(Math.random() * 100)}% 0);}`
                }

                return `@-webkit-keyframes noise-anim-${this.id}-1 {${keyframes1}}@keyframes noise-anim-${this.id}-1 {${keyframes1}}@-webkit-keyframes noise-anim-${this.id}-2 {${keyframes2}}@keyframes noise-anim-${this.id}-2 {${keyframes2}}`
            },
            regurgitateStyling: function() {
                this.slotText = this.glitch || this.$refs.wrapper.innerText;

                return `#${this.id}.glitch{color:${this.fg};}#${this.id}.glitch:before{content:"${this.slotText}";-webkit-animation:noise-anim-${this.id}-2 3.7s infinite steps(2,end) alternate-reverse;animation:noise-anim-${this.id}-2 3.7s infinite steps(2,end) alternate-reverse;color:${this.fg};background:${this.bg};text-shadow:-1px 0px ${this.fg};}#${this.id}.glitch:after{content:"${this.slotText}";-webkit-animation:noise-anim-${this.id}-1 4.1s infinite steps(2,end) alternate-reverse;animation:noise-anim-${this.id}-1 4.1s infinite steps(2,end) alternate-reverse;color:${this.fg};background:${this.bg};text-shadow:1px 0 ${this.fg};}`
            }
        },
        mounted: function() {
            const componentKeyframes = this.generateKeyframes();
            const componentStyle = this.regurgitateStyling();

            this.DOMStyleObject = document.createElement('style');
            this.DOMStyleKeyframesObject = document.createElement('style');

            this.observer = new MutationObserver(function(mutations) {
                this.DOMStyleObject.innerHTML = this.regurgitateStyling();
            }.bind(this));

            this.DOMStyleObject.id = `${this.id}-style`;
            this.DOMStyleObject.innerHTML = componentStyle;

            this.DOMStyleKeyframesObject.id = `${this.id}-keyframes`;
            this.DOMStyleKeyframesObject.innerHTML = componentKeyframes;

            document.head.appendChild(this.DOMStyleObject);
            document.head.appendChild(this.DOMStyleKeyframesObject);

            this.observer.observe(this.$el, { 
                characterData: true, 
                childList: true,
                subtree: true,
            });
        },
        beforeDestroy: function() {
            this.observer.disconnect();
        }
    }
</script>
<style>
     .glitch {
        position: relative;
        overflow: hidden;
     }

     .glitch:before, .glitch:after {
        position: absolute;
        top: 0;
        overflow: hidden;
        clip-path: inset(0 0 0 0);
     }

     .glitch:before {
        left: -1px;
     }

     .glitch:after {
        left: 1px;
     }
</style>