/**
 * axios 的拦截器
 */
import axios from 'axios';
import Cookie from 'js-cookie';
import { Message } from 'element-ui';
import router from '@/router';
import store from '@/store';
import jsCookie from 'js-cookie';

// 页面加载进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// NProgress 的简单配置
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

// axios 的全局默认配置
axios.defaults.baseURL = '/api';

/**
 * axios 请求拦截
 */
axios.interceptors.request.use((config) => {
  NProgress.start();
  // 请求头添加 Authorization 参数
  config.headers.Authorization = Cookie.get('token') || 'NOTOKEN';
  return config;
}, (err) => {
  console.log(err);
  return Promise.reject(err);
});

/**
 * axios 响应拦截
 */
axios.interceptors.response.use((response) => {
  NProgress.done();
  const { status = 0, msg = ''} = response.data;
  if (status !== 0) {
    Message.error(msg);
    router.push('/Login');
    jsCookie.remove('cacheRoutes');
    jsCookie.remove('token');
    store.commit('SETMENULIST', null);
  }
  return response;
}, (err) => {
  console.log(err);
  return err;
});
