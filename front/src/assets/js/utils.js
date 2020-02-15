/**
 * 工具函数
 */

/**
 * 防抖函数
 * 一个需要频繁触发的函数，在规定时间内，只让最好一次生效，前面的不生效
 * 规定时间内多次点击，最后一次才生效
 * @param { 需要执行的函数 } fn 
 * @param { 规定的时间期限 } delay 
 */
export const $preventShake = (fn, delay) => {
  // 记录上一次函数触发的时间
  let lastTime = 0;
  return function () {
      // 记录当前函数触发的时间
      let nowTime = new Date().getTime();
      if (nowTime - lastTime > delay) {
          // 修正 this 指向
          fn.call(this);
          // 同步时间
          lastTime = nowTime;
      }
  };
};

/**
 * 节流函数
 * 一个需要频繁触发的函数，在规定时间内，只让最好一次生效，后面的不生效
 * 规定时间内多次点击，第一次才生效
 * @param { 需要执行的函数 } fn 
 * @param { 规定的时间期限 } delay
 * @param { 传递的参数 } params
 */
export const $throttle = (fn, delay) => {
  // 记录上一次函数触发的时间
  let lastTime = 0;
  return function () {
      // 记录当前函数触发的时间
      let nowTime = new Date().getTime();
      if (nowTime - lastTime > delay) {
          // 修正 this 指向
          fn.call(this, ...arguments);
          // 同步时间
          lastTime = nowTime;
      }
  };
};

/**
 * 日期格式化
 * @param {date} date
 * @param {string} [fmt='yyyy-MM-dd hh:mm:ss']
 * @returns {string}
 */
export const $formDate = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

/**
 * jsonp 请求
 *  options {
 *  url
 *  data
 *  callback
 *  success function
 *  fail    function
 * }
 */
export const $jsonp = (options) => {
  options = options || {};
  if (!options.url || !options.callback) {
    return;
  }
  // 创建 script 标签并加入到页面中
  let callbackName = ('jsonp_' + Math.random()).replace('.', '');
  let oHead = document.getElementsByTagName('head')[0];
  options.data[options.callback] = callbackName;
  let params = formatParams(options.data);
  let oS = document.createElement('script');
  oHead.appendChild(oS);
  // 创建jsonp回调函数
  window[callbackName] = (json) => {
    oHead.removeChild(oS);
    clearTimeout(oS.timer);
    window[callbackName] = null;
    options.success && options.success(json);
  };
  // 请求失败
  oS.onerror = (err) => {
    window[callbackName] = null;
    oHead.removeChild(oS);
    options.fail && options.fail(err);
  };
  // 发送请求
  oS.src = options.url + '?' + params;
  // 超时处理
  if (options.time) {
    oS.timer = setTimeout(() => {
      window[callbackName] = null;
      oHead.removeChild(oS);
      options.fail && options.fail({
        message: '超时'
      });
    }, options.time);
  }
  // 格式化参数
  function formatParams (data) {
    let arr = [];
    for (let name in data) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return arr.join('&');
  }
};
