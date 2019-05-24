import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyPage from './components/MyPage.vue';
import SignIn from './components/SignIn.vue';
import Join from './components/Join.vue';
import Vehicles from './components/Vehicles.vue';

Vue.use(Router);

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
      beforeEnter: (to, from, next) => {
        if (this.$store.state.authenticated) {
          next();
        }

        next(false);
      },
    },
    {
      path: '/SignIn',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/Join',
      name: 'join',
      component: Join,
    },
    {
      path: '/Vehicles',
      name: 'vehicles',
      component: Vehicles,
    }
  ]
});

