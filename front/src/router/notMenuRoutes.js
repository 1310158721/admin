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
          isNotMenu: true,
          keepAlive: true
        },
        component: () => import('@/views/User/Personal'),
        children: null
      },
      {
        path: '/PermissionEditPage',
        name: 'PermissionEditPage',
        meta: {
          title: '用户权限修改页面',
          isNotMenu: true,
          keepAlive: true
        },
        component: () => import('@/views/PermissionMenu/PermissionEditPage'),
        children: null
      },
      {
        path: '/PermissionAddPage',
        name: 'PermissionAddPage',
        meta: {
          title: '新增用户页面',
          isNotMenu: true,
          keepAlive: true
        },
        component: () => import('@/views/PermissionMenu/PermissionAddPage'),
        children: null
      },
      {
        path: '/FormCheck',
        name: 'FormCheck',
        meta: {
          title: 'Form表单验证',
          isNotMenu: true,
          keepAlive: true
        },
        component: () => import('@/views/Demo/Components/FormCheck'),
        children: null
      },
      {
        path: '/SelectAndFilter',
        name: 'SelectAndFilter',
        meta: {
          title: '选择并过滤掉已选的item',
          isNotMenu: true,
          keepAlive: true
        },
        component: () => import('@/views/Demo/Components/SelectAndFilter'),
        children: null
      }
    ]
  }
];

export default notMenuRoutes;
