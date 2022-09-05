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
    <button @click="increment">Test</button>
    <button @click="testTone">Test Tone</button>
  </div>
</template>

<script>
import * as Tone from 'tone'

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
  },
  methods: {
    increment() {
        this.$store.commit('increment')
        console.log(this.$store.state.count)
    },
    testTone() {
        const synth = new Tone.Synth().toDestination();
        const now = Tone.now()
        // trigger the attack immediately
        synth.triggerAttack("C4", now)
        // wait one second before triggering the release
        synth.triggerRelease(now + 1)
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