import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

import Home from './views/Home.vue';
import MyPage from './components/MyPage.vue';
import SignIn from './components/SignIn.vue';
import Join from './components/Join.vue';
import Vehicles from './components/Vehicles.vue';

Vue.use(Router);

const requireAuth = (to, from, next) => {
  if (store.state.authenticated) {
    next();
  }
  next(false);
};

const requireNoAuth = (to, from, next) => {
  if (store.state.authenticated) {
    next(false);
  }
  next();
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/MyPage',
      name: 'mypage',
      component: MyPage,
      beforeEnter: requireAuth,
    },
    {
      path: '/SignIn',
      name: 'signin',
      component: SignIn,
      beforeEnter: requireNoAuth,
    },
    {
      path: '/Join',
      name: 'join',
      component: Join,
      beforeEnter: requireNoAuth,
    },
    {
      path: '/Vehicles',
      name: 'vehicles',
      component: Vehicles,
    },
    {
      path: '/LogOut',
      beforeEnter(to, from, next) {
        if (!store.state.authenticated) {
          next(false);
        }
        store.commit('logOut');
        next('/');
      },
    },
  ],
});
