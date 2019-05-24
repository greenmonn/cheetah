import Vue from 'vue';
import axios from 'axios';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$Axios = axios;
Vue.prototype.$host = process.env.NODE_ENV === 'production' ? 'http://cheetah.greenmon.dev/api' : 'http://127.0.0.1:3001/api';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
