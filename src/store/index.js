import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      username: 'your_username',
      role: 'Admin',
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
  },
});
