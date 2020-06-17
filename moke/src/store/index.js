import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    SET_LOADING: (state, loading) => {
      state.loading = loading;
    },
  },
  actions: {
    setLoading: ({ commit }, loading) => {
      commit("SET_LOADING", loading);
    },
  },
  modules: {}
});
