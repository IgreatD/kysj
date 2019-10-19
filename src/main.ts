import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugin/element-ui';
import 'normalize.css/normalize.css';
import './style/index.scss';
import axios from '@/utils/http/axios';

import '@/router/permission';
import '@/components/_globals';
import '@/directive/_globals';
Vue.use((v) => {
  v.prototype.$http = axios;
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
