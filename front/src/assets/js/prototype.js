import Vue from 'vue';
import store from '@/store';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-eighties.css'; // 样式文件

// 多权限值时使用，拥有其中一个便显示
Vue.prototype.$hasPermission = function (checkPermission) {
  const checkPermissionArr = checkPermission.replace(/ /g, '').split(',');
  const { permission } = store.state.userInfo;
  let canShow = false;
  checkPermissionArr.map(i => {
    if (permission.includes(i)) {
      canShow = true;
    }
  });
  return canShow;
};

Vue.prototype.$highlight = function (el, cb) {
  let blocks = el.querySelectorAll('pre code');
  el.style.lineHeight = '26px';
  blocks.forEach((block, index) => {
    hljs.highlightBlock(block);
    if (index === blocks.length - 1) {
      cb && cb();
    }
  });
};

Vue.prototype.formScroll = function () {
  return new Promise(resolve => {
    Vue.nextTick(() => {
      const dom = document.querySelector('.el-form-item__error').parentElement;
      dom.scrollIntoView({
        behavior: 'smooth'
      });
      resolve();
    });
  });
};
