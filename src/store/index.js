import Vue from 'vue'
import Vuex from 'vuex'

import articles from "@/store/modules/articles";
import user from "@/store/modules/user";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    articles,
    user
  }
})
