<template>
    <div class="canvas-container">
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
            
            <div class="tab-panels">
                <section id="File1" class="tab-panel">
                    <h2>Hello, World 1</h2>
                    <p>Test</p>
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
</template>

<style scoped>
.canvas-container {
    width: 84%;
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
