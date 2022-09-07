<template>
  <div class="component-details">
    Component Details
    <hr />
    {{ test }}    
  </div>
</template>

<script>
export default {
  name: 'ComponentDetails',
  components: {
  },
  props: {
  },
  mounted() {
    
  },
  computed: {
        test: {
            get() {
                return this.$store.state.dials[this.$store.state.selectedComponent]
            }
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component-details {
    width: 15%;
    float: left;
    border: 1px solid;
    height: 100%;
}
</style>