<script setup>
  import { glitch } from './components/';
</script>

<template>
  <glitch bg="#2E3440" fg="#D8DEE9">simple text glitching vue component</glitch>
  <glitch id="secondary" :intensity=0.2 bg="#2E3440" fg="#8FBCBB" glitch="not the same text">because whyn't re-invent the wheel amrite?</glitch>
  <a href="http://t.ly/qIQs">@lewardo</a>
</template>

<style>
  :root {
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
    background: #2E3440;
  }

  .glitch {
    font-family: monospace;
  }

  #glitchy {
    font-size: 48px;
  }

  #secondary {
    font-size: 24px;
  }
  
  a, a:visited {
    margin: 20px;
    font-family: monospace;
    font-size: 20px;
    color: #5E81AC;
    text-decoration: none;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>