const demoRouters = [
  {
    path: '/DemoLayout',
    name: 'DemoLayout',
    meta: {},
    component: () => import('@/layout/Demo'),
    children: [
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
      },
      {
        path: '/FormErrorAndScroll',
        name: 'FormErrorAndScroll',
        meta: {
          title: '表单验证失败并滚动到指定位置',
          isNotMenu: true,
          keepAlive: true
        },
        component: () => import('@/views/Demo/Components/FormErrorAndScroll'),
        children: null
      }
    ]
  }
];

export default demoRouters;
