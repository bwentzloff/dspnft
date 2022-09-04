<template>
  <div class="sidebar">
    <img src="/images/logo.png" />
    <file-manager></file-manager>
  </div>
</template>

<script>
import FileManager from './FileManager.vue'

export default {
  name: 'SideBar',
  components: {
    FileManager
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar {
  width: 15%;
  border: 1px solid;
  height: 100%;
  float: left;
}
.sidebar img {
  width: 40%;
}
</style>