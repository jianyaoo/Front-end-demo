<template>
  <div id="app">
    <CompomentA></CompomentA>
    <ComponentB></ComponentB>
    <hr>
    <componentD></componentD>
    <ComponentC></ComponentC>

  </div>
</template>

<script>
import CompomentA from './components/CompomentA.vue'
import ComponentB from './components/ComponentB.vue'
import ComponentC from './components/componentC.vue'
import componentD from './components/componentD'

export default {
  name: 'App',
  components: {
      CompomentA,
      ComponentB,
      ComponentC,
      componentD,

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
