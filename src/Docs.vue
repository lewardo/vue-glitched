<!-- 
  Copyright (c) 2023 lewardo (https://github.com/lewardo)
  SPDX-License-Identifier: GPL-3.0+ 
-->

<script setup>
  import Glitch from '@/components/Glitched.vue';
</script>

<template>
  <div class="wrapper">
    <Glitch id="glitchy">vue3 text glitching component</Glitch>
    <Glitch id="intense" sync="glitchy">built with <span style="color: #41b883;">vue</span> &amp; <span style="color: #bd34fe;">vite</span></Glitch>
    <div class="paragraph">
      <Glitch id="colourful">simple to use, customisable, and&nbsp;</Glitch>
      <Glitch id="alternate" text="different glitching overlay">completely open source <span style="color: #cc241d;">&lt;3</span></Glitch>
    </div>
      <a href="https://github.com/lewardo/vue-glitched">@lewardo</a>
  </div>
</template>

<script>
  export default {
    mounted: function() {
      const setHeight = () => {
        return document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`)
      }

      setHeight() || window.addEventListener('resize', setHeight);
    }
  }
</script>

<style>
  :root {
    --doc-height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    height: var(--doc-height);
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    box-sizing: border-box;
    place-items: center;
    display: grid;
    background: #1d2021;

    --glitch-global-bg: #1d2021;
    --glitch-global-fg: #ebdbb2;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .paragraph {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .glitch {
    font-family: monospace;
  }

  #glitchy {
    font-size: min(48px, 4vmax);
    text-align: center;
    margin: 5vh 5vw;
  }

  #intense, #colourful, #alternate {
    font-size: min(24px, 2vmax);
  }

  #colourful, #alternate {
    display: inline-block;
  }
  
  a, a:visited {
    margin: 2vmax;
    font-family: monospace;
    font-size: min(20px, 2vmax);
    color: #928374;
    text-decoration: none;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>