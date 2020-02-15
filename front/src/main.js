import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from '@/router';
import axios from 'axios';
import BaiduMap from 'vue-baidu-map';
import Viewer from 'v-viewer';
import i18n from '@/i18n';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/css/index.css';
import '@/assets/scss/index.scss';
import '@/assets/js/directive';
import '@/assets/js/filters';
import 'reset.css';
import '@/http/interceptors';

import '@/components/global';
import 'viewerjs/dist/viewer.css';

Vue.use(ElementUI);
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
});
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'jEVOBuDco4uCCkoDytYgVLMuTzAPHWUI'
});

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
