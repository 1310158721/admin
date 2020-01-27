import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from '@/router';
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'reset.css';
import '@/http/interceptors';

Vue.use(ElementUI);

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
