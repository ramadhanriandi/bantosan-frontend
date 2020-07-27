import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: null,
      role: null,
    },
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getUser: state => state.user,
  },
  modules: {
    auth,
  },
});
