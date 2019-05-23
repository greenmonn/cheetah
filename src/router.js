import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyPage from '@/components/MyPage'
import SignIn from '@/components/SignIn'
import Join from '@/components/Join.vue'
import Vehicles from '@/components/Vehicles'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/MyPage',
      name: 'mypage',
      component: MyPage
    },
    {
      path: '/SignIn',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/Join',
      name: 'join',
      component: Join
    },
    {
      path: '/Vehicles',
      name: 'vehicles',
      component: Vehicles
    }
  ]
});

