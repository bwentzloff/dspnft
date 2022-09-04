<template>
  <div class="filemanager">
    <h3>My Components</h3>
    <template v-for="file in files" :key="file">
        <a href="">
            <div class="component_list__component">
                {{ file }}
            </div>
        </a>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FileManager',
  props: {
    msg: String
  },
  data() {
    return {
        files: [
            'test_file_1.dsp',
            'test_file_2.dsp',
            'test_file_3.dsp'
        ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filemanager {
    text-align: left;
}
.component_list__component {
    width: 98%;
    background: gray;
    margin: 1%;
}
.component_list__component:hover {
    background: rgb(203, 202, 202);
}
.component_list__component a {
    color: white;
}
</style>