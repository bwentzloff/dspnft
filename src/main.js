import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
    state () {
      return {
        count: 0,
        dials: []
      }
    },
    mutations: {
      increment (state) {
        state.count++
      },
      pushDial (state, dial) {
        state.dials = []
        state.dials.push(dial.group)
      },
      initialiseStore(state) {
        // Check if the ID exists
        if(localStorage.getItem('store')) {
            // Replace the state object with the stored item
            this.replaceState(
                Object.assign(state, JSON.parse(localStorage.getItem('store')))
            );
        }
      }
    }
  })
store.commit('initialiseStore')
store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});


const app = createApp(App)
app.use(store)
app.mount("#app")