<script setup>
  import { Glitch } from '@/components/';
</script>

<template>
  <div class="wrapper">
    <Glitch id="glitchy">vue3 text glitching component</Glitch>
    <Glitch id="intense" :intensity=1>built with <span style="color: #41b883;">vue</span> &amp; <span style="color: #bd34fe;">vite</span></Glitch>
    <div>
      <Glitch id="colourful" bg="#1d2021" fg="#ebdbb2" colour="#928374">simple to use, customisable, and&nbsp;</Glitch>
      <Glitch id="alternate" :start=true :intensity=0.25 text="different glitching overlay">completely open source <span style="color: #cc241d;">&lt;3</span></Glitch>
    </div>
      <a href="https://github.com/lewardo/vue-glitched">@lewardo</a>
  </div>
</template>

<style>
  body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
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

  .glitch {
    font-family: monospace;
    display: block;
  }

  #glitchy {
    font-size: 48px;
    margin: 20px 0;
  }

  #intense, #colourful, #alternate {
    font-size: 24px;
  }

  #colourful, #alternate {
    display: inline-block;
  }
  
  a, a:visited {
    margin: 20px;
    font-family: monospace;
    font-size: 20px;
    color: #928374;
    text-decoration: none;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>