<template>
    <div class="canvas-container-parent">
        <div class="tabset">
            <!-- Tab 1 -->
            <input type="radio" name="tabset" id="tab1" aria-controls="File1" checked>
            <label for="tab1">File1.component</label>
            <!-- Tab 2 -->
            <input type="radio" name="tabset" id="tab2" aria-controls="File2">
            <label for="tab2">File2.component</label>
            <!-- Tab 3 -->
            <input type="radio" name="tabset" id="tab3" aria-controls="File3">
            <label for="tab3">File3.component</label>
            <button @click="playComposition()">Test Audio</button>
            <button @click="addDial()">Add Dial</button>
            <button @click="showInfo()">Show Info</button>
            <button @click="deleteAll()">Delete All</button>
            <div class="tab-panels">
                <section id="File1" class="tab-panel">
                    <input type="checkbox" v-model="connectMode" />Connection mode
                    <canvas id="canvas"></canvas>
                </section>
                <section id="File2" class="tab-panel">
                    <h2>Hello, World 2</h2>
                    <p>Test</p>
                </section>
                <section id="File3" class="tab-panel">
                    <h2>Hello, World 3</h2>
                    <p>Test</p>
                </section>
                
            </div>            
        </div>
    </div>
    <component-details></component-details>
</template>

<script>
import { fabric } from "fabric";
import * as Tone from 'tone'

import ComponentDetails from './ComponentDetails.vue'

export default {
  name: "CanvasContainer",
  components: {
    ComponentDetails,
  },
  data() {
    return {
      canvas: "",
      dials: [],
      isObjMoving : false,
      connectMode: false
    };
  },
  mounted() {
      this.initializeCanvas()
  },
  methods: {
    updateComponentCoords() {
        for (var i = 0; i < this.$store.state.dials.length; i++) {
            this.$store.state.dials[i].left = this.$store.state.dials[i].object.left
            this.$store.state.dials[i].top = this.$store.state.dials[i].object.top
        }
        this.$store.commit('updateDialCoords', 
            {'dials': this.$store.state.dials[i]}
        );
    },
    initializeCanvas() {
      this.canvas = new fabric.Canvas('canvas', { width: 800, height: 600 });
      var self = this
      this.canvas.on('object:moving', function() {
        self.isObjMoving = true
      });
      
      this.canvas.on('mouse:up', function(event) {
        if (event.target && 'id' in event.target) {
          if (self.connectMode && self.$store.state.selectedComponent != null) {
            self.$store.commit('makeConnection',
              {
                'source': self.$store.state.selectedComponent,
                'dest': event.target.id
              }
            );
            self.redrawCanvas()
          } else {
            self.$store.commit('selectComponent', 
                {'component': event.target.id}
            );
          }
        } else {
          self.$store.commit('selectComponent', 
              {'component': null}
          );
        }
        if (self.isObjMoving) {
          self.isObjMoving = false
          self.updateComponentCoords()
        }
      })
      this.redrawCanvas()
    },
    redrawCanvas() {
      this.canvas.clear()
      for (var i = 0; i < this.$store.state.dials.length; i++) {
        if (this.$store.state.dials[i].type == 'generator') {
          var dial = new fabric.Circle({
              radius : 50,
              fill : 'grey',
              stroke: '#aaf',
              strokeWidth: 5,
          });
          var label = new fabric.Text('variable1', {
              fontSize: 12,
              left: 20,
              top: 80
          });
          var group = new fabric.Group([ dial, label ], {
              left: this.$store.state.dials[i].left,
              top: this.$store.state.dials[i].top,
              width: 100,
              height: 100,
              originX: 'left',
              originY: 'top'
          });
          group.id = this.$store.state.dials[i].id
          this.$store.state.dials[i].object = group
          this.canvas.add(this.$store.state.dials[i].object)          
        }
      }

      // create connections
      for ( i = 0; i < this.$store.state.dials.length; i++) {
        for (var c=0;c<this.$store.state.dials[i].connections.length;c++) {
              for (var cto=0;cto<this.$store.state.dials.length;cto++) {
                  if (this.$store.state.dials[cto].id == this.$store.state.dials[i].connections[c]) {
                    var coords = [
                      this.$store.state.dials[i].object.left+50,
                      this.$store.state.dials[i].object.top+50,
                      this.$store.state.dials[cto].object.left+50,
                      this.$store.state.dials[cto].object.top+50
                    ]
                    var line = new fabric.Line(coords, {
                      fill: 'red',
                      stroke: 'red',
                      strokeWidth: 5,
                      selectable: false,
                      evented: false,
                    });
                    this.canvas.add(line)
                  }
              }
          }
      }
    },
    pulseBorder(dial_instance) {
        var self = this
        dial_instance.animate('strokeWidth', dial_instance.strokeWidth === 10 ? 1 : 10, {
            duration: 500,
            onChange: this.canvas.renderAll.bind(this.canvas),
            onComplete: function() {
                self.pulseBorder(dial_instance)
            },
        });
    },
    playComposition() {
        for (var i = 0; i < this.$store.state.dials.length; i++) {
          const synth = new Tone.Synth().toDestination();
          const now = Tone.now()
          // trigger the attack immediately
          synth.triggerAttack("C4", now)
          // wait one second before triggering the release
          synth.triggerRelease(now + 1)
        }
    },
    addDial() {
        const stats = {
          'left':0,
          'top':0,
          'type':'generator',
          'connections': [
              
          ]
        }
        this.$store.commit('pushDial', 
            {'stats': stats}
        );
        this.redrawCanvas()
    },
    deleteAll() {
        this.$store.commit('deleteAllDials');
        this.canvas.clear()
        this.canvas.renderAll()
    },
    showInfo() {
        for (var i = 0; i < this.$store.state.dials.length; i++) {
            console.log(this.$store.state.dials[i])
        }
        console.log(this.$store.state.count)
    },
  }
};
</script>


<style scoped>
#canvas {
    width: 100%;
    height: 100%;
    border: 1px solid;
}
.canvas-container-parent {
    width: 69%;
    height: 100%;
    float: left;
    text-align: left;
}
.tabset > input[type="radio"] {
  position: absolute;
  left: -200vw;
}

.tabset .tab-panel {
  display: none;
}

.tabset > input:first-child:checked ~ .tab-panels > .tab-panel:first-child,
.tabset > input:nth-child(3):checked ~ .tab-panels > .tab-panel:nth-child(2),
.tabset > input:nth-child(5):checked ~ .tab-panels > .tab-panel:nth-child(3),
.tabset > input:nth-child(7):checked ~ .tab-panels > .tab-panel:nth-child(4),
.tabset > input:nth-child(9):checked ~ .tab-panels > .tab-panel:nth-child(5),
.tabset > input:nth-child(11):checked ~ .tab-panels > .tab-panel:nth-child(6) {
  display: block;
}

/*
 Styling
*/
body {
  font: 16px/1.5em "Overpass", "Open Sans", Helvetica, sans-serif;
  color: #333;
  font-weight: 300;
}

.tabset > label {
  position: relative;
  display: inline-block;
  padding: 15px 15px 25px;
  border: 1px solid transparent;
  border-bottom: 0;
  cursor: pointer;
  font-weight: 600;
}

.tabset > label::after {
  content: "";
  position: absolute;
  left: 15px;
  bottom: 10px;
  width: 22px;
  height: 4px;
  background: #8d8d8d;
}

.tabset > label:hover,
.tabset > input:focus + label {
  color: #06c;
}

.tabset > label:hover::after,
.tabset > input:focus + label::after,
.tabset > input:checked + label::after {
  background: #06c;
}

.tabset > input:checked + label {
  border-color: #ccc;
  border-bottom: 1px solid #fff;
  margin-bottom: -1px;
}

.tab-panel {
  padding: 30px 0;
  border-top: 1px solid #ccc;
}

/*
 Demo purposes only
*/
*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  padding: 30px;
}

.tabset {
  max-width: 65em;
}
</style>
