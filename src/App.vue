<template>
  <work-space msg=""/>
</template>

<script>
import WorkSpace from './components/WorkSpace.vue'

export default {
  name: 'App',
  components: {
    WorkSpace
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
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
html {
  height: 100%;
}
</style>
