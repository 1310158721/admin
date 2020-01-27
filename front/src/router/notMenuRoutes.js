const notMenuRoutes = [
  {
    path: '/NotMenu',
    name: 'NotMenu',
    meta: {},
    component: () => import('@/layout/NotMenu'),
    children: [
      {
        path: '/PersonalCenter',
        name: 'PersonalCenter',
        meta: {
          title: '个人中心',
          isNotMenu: true
        },
        component: () => import('@/views/User/Personal'),
        children: null
      },
      // 404 页面，放在最后一个路由配置中
      {
        path: '/*',
        name: 'ErrorPage',
        meta: {
          title: '404页面',
          isNotMenu: true
        },
        component: () => import('@/views/Error/Error'),
        children: null
      }
    ]
  }
];

export default notMenuRoutes;
