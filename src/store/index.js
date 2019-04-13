import Vue from 'vue'
import Vuex from 'vuex'
import person from './modules/person';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    person
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
