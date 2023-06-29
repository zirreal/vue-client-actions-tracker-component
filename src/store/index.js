import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTracker: {},
  },
  mutations: {
    SET_USER_TRACKER(state, userTracker) {
      state.userTracker = userTracker;
    }
  }
})
