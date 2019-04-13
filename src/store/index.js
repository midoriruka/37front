import Vue from 'vue'
import Vuex from 'vuex'
import person from './modules/person';
import app from './modules/app'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    person,
    app
  },
  state: {
    companyId: null
  },
  mutations: {
    setCompanyId(state, companyId) {
      state.companyId = companyId;
    }
  },
  actions: {

  }
})
