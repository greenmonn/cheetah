import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    username: '',
    userInfo: '',
  },
  mutations: {
    logIn: (state, user) => {
      state.authenticated = true;
      state.username = user.username;
      state.userInfo = user;
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
    updateUser: (state, updatedUser) => {
      console.log(updatedUser);
      Object.assign(state.userInfo, updatedUser);
    },
  },
  actions: {

  },
});
