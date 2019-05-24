import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    username: '',
  },
  mutations: {
    logIn: (state, user) => {
      state.authenticated = true;
      state.username = user.username;
    },
    logOut: (state) => {
      state.authenticated = false;
      state.username = '';
    },
    logInCheck: (state) => {
      if (!state.authenticated) {
        this.$router.push('/SignIn');
      }
    },
  },
  actions: {

  },
});
