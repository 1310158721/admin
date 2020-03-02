import Vue from 'vue';
import VueRouter from 'vue-router';
import $axios from 'axios';
import jsCookie from 'js-cookie';
import store from '@/store';

import originAsyncMenuRoutes from './asyncMenuRoutes';
import notMenuRoutes from './notMenuRoutes';
import demoRouters from './demoRouters';
import devRoutes from './devRoutes';

import NProgress from 'nprogress'; // 页面加载进度条
import 'nprogress/nprogress.css';

import ErrorPage from '@/views/Error/Error';

Vue.use(VueRouter);

// NProgress 的简单配置
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

if (process.env.NODE_ENV === 'development') {
  originAsyncMenuRoutes.push(...devRoutes);
}

let asyncMenuRoutes = [...originAsyncMenuRoutes];

// 保存权限菜单的第一个路由（一般为最外层布局）
const asyncMenuRoutesFirst = asyncMenuRoutes[0];

const fixRouteConfig = [
  {
    path: '/',
    name: 'root',
    redirect: {
      path: '/LayoutBase'
    }
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {
      title: 'Login',
      keepAlive: false
    },
    component: () => import('@/layout/Login')
  },
  {
    path: '/Share',
    name: 'Share',
    meta: {},
    component: () => import('@/layout/Share'),
    redirect: '/MemorandumShare',
    children: [
      {
        path: '/MemorandumShare',
        name: 'MemorandumShare',
        meta: {
          title: '备忘录分享页面',
          isNotMenu: true,
          keepAlive: false
        },
        component: () => import('@/views/Memorandum/Components/Share'),
        children: null
      }
    ]
  },
  {
    path: '/NotMenu',
    name: 'NotMenu',
    meta: {},
    component: () => import('@/layout/NotMenu'),
    children: [
      {
        path: '/ErrorPage',
        name: 'ErrorPage',
        meta: {
          title: '404页面',
          isNotMenu: true,
          keepAlive: true
        },
        component: ErrorPage,
        children: null
      }
    ]
  }
];

const router = new VueRouter({
  routes: fixRouteConfig
});

/**
 * 获取接口返回权限菜单的所有 item 的所有标题，
 * 用于匹配权限菜单异步路由 asyncMenuRoutes
 * @param {权限菜单接口返回的列表数据} list
 * @param {用于保存匹配标题的数组，外部传进来} allTitleArray
 */
const getPermissionMenuAllTitle = (list, allTitleArray = []) => {
  list.map(i => {
    allTitleArray.push(i.title);
    if (i.children && i.children.length) {
      getPermissionMenuAllTitle(i.children, allTitleArray);
    }
  });
};

/**
 * 通过匹配好的权限菜单的标题 title 来匹配并筛选异步路由 asycnMenuRoutes
 * @param {要处理并筛选的异步路由} asyncMenuRoutes
 * @param {已经匹配好的权限菜单标题} allTitleArray
 * @param {要获取的path 和 title 数组} pathAndTitleArray
 */
const matchAsyncMenuRoutesByTitle = (
  asyncMenuRoutes,
  allTitleArray,
  pathAndTitleArray = []
) => {
  for (let i = asyncMenuRoutes.length - 1; i >= 0; i--) {
    if (asyncMenuRoutes[i].children && asyncMenuRoutes[i].children.length) {
      matchAsyncMenuRoutesByTitle(
        asyncMenuRoutes[i].children,
        allTitleArray,
        pathAndTitleArray
      );
    }
    if (!allTitleArray.includes(asyncMenuRoutes[i].meta.title)) {
      asyncMenuRoutes.splice(i, 1);
    } else {
      pathAndTitleArray.push({
        path: asyncMenuRoutes[i].path,
        title: asyncMenuRoutes[i].meta.title
      });
    }
  }
};

/**
 * 根据title值为权限菜单的每一项添加对应的 path
 * @param {接口获取的权限菜单，自身数据会被修改} list
 * @param {已经获取好了的path 和 title 数组} pathAndTitleArray
 */
const permissionMenuAddPath = (list, pathAndTitleArray) => {
  for (let i = 0, len = list.length; i < len; i++) {
    if (pathAndTitleArray.filter(k => k.title === list[i].title).length) {
      list[i].path = pathAndTitleArray.filter(
        k => k.title === list[i].title
      )[0].path;
    }
    if (list[i].children && list[i].children.length) {
      permissionMenuAddPath(list[i].children, pathAndTitleArray);
    }
  }
};

let cacheRoutes = jsCookie.get('cacheRoutes')
  ? JSON.parse(jsCookie.get('cacheRoutes'))
  : [{ path: '/Dashboard', title: 'Dashboard' }];

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'admin';
  NProgress.start();

  // 获取用户登录状态
  const token = jsCookie.get('token');

  if (to.path.includes('/Login')) {
    next();
  } else {
    // 用户当前页面不为登录页，且用户登录状态失效
    if (!token) {
      if (to.path === '/MemorandumShare') {
        next();
      } else {
        next({
          path: '/Login',
          replace: true
        });
      }
    } else {
      // 用户当前登录状态不失效，单 vuex 的 menuList 为 null 时
      if (!store.state.menuList) {
        asyncMenuRoutes = [...originAsyncMenuRoutes];
        $axios
          .all([
            $axios.get('/getUserInfos'),
            $axios.get('/getUserPsermissionMenu')
          ])
          .then(
            $axios.spread((user, menu) => {
              const userStatus = user.data.status;
              const menuStatus = menu.data.status;
              if (userStatus === 0) {
                store.commit('SETUSERINFOS', user.data.result);
              }

              if (menuStatus === 0) {
                const { result } = menu.data;

                if (process.env.NODE_ENV === 'development') {
                  result.push({
                    title: '方便测试',
                    icon: 'icon-ceshi',
                    children: null
                  });
                }
                /**
                 * 获取接口返回权限菜单的所有 item 的所有标题，
                 * 用于匹配权限菜单异步路由 asyncMenuRoutes
                 * @param {权限菜单接口返回的列表数据} list
                 * @param {用于保存匹配标题的数组，外部传进来} allTitleArray
                 */
                const allTitleArray = [];
                getPermissionMenuAllTitle(result, allTitleArray);

                /**
                 * 通过匹配好的权限菜单的标题 title 来匹配并筛选异步路由 asycnMenuRoutes
                 * @param {要处理并筛选的异步路由} asyncMenuRoutes
                 * @param {已经匹配好的权限菜单标题} allTitleArray
                 * @param {要获取的path 和 title 数组} pathAndTitleArray
                 */
                const pathAndTitleArray = [];
                matchAsyncMenuRoutesByTitle(
                  asyncMenuRoutes,
                  allTitleArray,
                  pathAndTitleArray
                );

                /**
                 * 根据title值为权限菜单的每一项添加对应的 path
                 * @param {接口获取的权限菜单，自身数据会被修改} list
                 * @param {已经获取好了的path 和 title 数组} pathAndTitleArray
                 */
                permissionMenuAddPath(result, pathAndTitleArray);

                // 将处理好的权限菜单（带有path）保存到 vuex 中，以便项目全局使用
                store.commit('SETMENULIST', result);

                // 添加权限菜单对应的路由
                asyncMenuRoutesFirst.children.push(...asyncMenuRoutes);
                router.addRoutes([asyncMenuRoutesFirst, ...notMenuRoutes, ...demoRouters]);
              }

              next({
                path: to.fullPath,
                replace: true
              });
            })
          );
      } else {
        // 跳转404页面
        if (!to.matched.length) {
          next({
            name: 'ErrorPage',
            replace: true
          });
        } else {
          cacheRoutes = jsCookie.get('cacheRoutes')
          ? JSON.parse(jsCookie.get('cacheRoutes'))
          : [];
        if (
          !cacheRoutes.filter(i => i.path === to.path).length &&
          !to.meta.isNotMenu
        ) {
          cacheRoutes = [
            ...cacheRoutes,
            { path: to.path, title: to.meta && to.meta.title }
          ];
        }
        jsCookie.set('cacheRoutes', JSON.stringify(cacheRoutes));
        next();
        }
      }
    }
  }
});

// 进入路由后钩子
router.afterEach(() => {
  NProgress.done();
});

export default router;
