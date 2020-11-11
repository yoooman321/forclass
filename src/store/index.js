import Vue from 'vue'
import Vuex from 'vuex'
import state from './module-example/state'
import * as mutations from './module-example/mutations'
import * as actions from './module-example/actions'
import * as getters from './module-example/getters'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// export default function (/* { ssrContext } */) {
const Store = new Vuex.Store({
  modules: {
    // example
  },
  state,
  mutations,
  actions,
  getters,
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})
export default Store
// return Store
// }
