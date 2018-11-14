import Vue from 'vue'
import App from './App'
// import VueLazyload from 'vue-lazyload'

//将components文件底下的组件作为全局组件引入
import './components/global'
//单独将该组件作为全局组件
// import BackNavBar from './components/backNavBar.vue'

import store from './store'
import router from './router'
import http from '@/utils/request'

import YDUI from 'vue-ydui'
import './style/base.css'
import './style/custom.css'
import 'vue-ydui/dist/ydui.rem.css'

import * as filters from './filters'

/* 提示层 */
import {Confirm, Alert, Toast, Notify, Loading} from 'vue-ydui/dist/lib.rem/dialog';
import tip from '@/utils/tip'

/*
函数劫持
发布版本不会在控制台打印信息
*/
import '@/utils/hijack'

/*
* 自定义指令
* */
import './directive/lazy-button'

Vue.use(YDUI);

// Vue.use(VueLazyload, {
//   preLoad: 1.3, // 预压高度的比例
//   error: require('@assets/tip-img/error.png'), // 图像的加载失败时 显示的error图标
//   loading: require('@assets/tip-img/loading.png'), // 图像正常加载时 显示的loading图标
//   attempt: 1 // 图像尝试加载 次数
// });

//注册全局组件
// Vue.component('BackNavBar', BackNavBar);

Vue.prototype.$http = http;
Vue.prototype.$dialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  notify: Notify,
  loading: Loading,
};
Vue.prototype.$tip = tip;

//全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {},
  router,
  store,
  components: {App},
  template: '<App/>'
});
