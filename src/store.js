import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    username: '',
    userInfo: '',
    token: '',
    uid: '',
  },
  mutations: {
    logIn: (state, payload) => {
      const { user } = payload;
      state.token = payload.token;

      state.authenticated = true;
      state.username = user.username;
      state.uid = user.uid;
      delete user.uid;
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
      state.userInfo = Object.assign(state.userInfo, updatedUser);
      console.log(state.userInfo);
    },
  },
  actions: {

  },
});
