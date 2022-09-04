<template>
  <div class="workspace">
        <side-bar></side-bar>
  </div>
</template>

<script>
import SideBar from './SideBar.vue'

export default {
  name: 'WorkSpace',
  components: {
    SideBar
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.workspace {
    border: 2px solid;
    width: 100%;
    padding: 0;
    margin: 0;
    height: 100%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
