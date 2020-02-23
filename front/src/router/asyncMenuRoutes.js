const asyncMenuRoutes = [
  {
    path: '/LayoutBase',
    name: 'LayoutBase',
    meta: {
      title: 'LayoutBase',
      isLayout: true,
      keepAlive: true
    },
    component: () => import('@/layout/Base'),
    redirect: {
      path: '/Dashboard'
    },
    children: []
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    meta: {
      title: 'Dashboard',
      keepAlive: true
    },
    component: () => import('@/views/Dashboard/Dashboard'),
    children: null
  },
  {
    path: '/WaitingTodo',
    name: 'WaitingTodo',
    meta: {
      title: '待办列表',
      keepAlive: true
    },
    component: () => import('@/views/WaitingTodo/WaitingTodo'),
    children: null
  },
  {
    path: '/NestedRoutes',
    name: 'NestedRoutes',
    meta: {
      title: '嵌套路由',
      redirect: '/NestedRoutes-1-1',
      keepAlive: true
    },
    component: () => import('@/views/NestedRoutes/NestedRoutes'),
    redirect: {
      path: '/NestedRoutes-1'
    },
    children: [
      {
        path: '/NestedRoutes-1',
        name: 'NestedRoutes-1',
        meta: {
          title: '路由-1',
          redirect: '/NestedRoutes-1-1',
          keepAlive: true
        },
        redirect: {
          path: '/NestedRoutes-1-1'
        },
        component: () => import('@/views/NestedRoutes/NestedRoutes-1'),
        children: [
          {
            path: '/NestedRoutes-1-1',
            name: 'NestedRoutes-1-1',
            meta: {
              title: '路由-1-1',
              keepAlive: true
            },
            component: () => import('@/views/NestedRoutes/NestedRoutes-1-1'),
            children: null
          },
          {
            path: '/NestedRoutes-1-2',
            name: 'NestedRoutes-1-2',
            meta: {
              title: '路由-1-2',
              redirect: '/NestedRoutes-1-2-1',
              keepAlive: true
            },
            component: () => import('@/views/NestedRoutes/NestedRoutes-1-2'),
            redirect: {
              path: '/NestedRoutes-1-2-1',
              keepAlive: true
            },
            children: [
              {
                path: '/NestedRoutes-1-2-1',
                name: 'NestedRoutes-1-2-1',
                meta: {
                  title: '路由-1-2-1',
                  keepAlive: true
                },
                component: () => import('@/views/NestedRoutes/NestedRoutes-1-2-1'),
                children: null
              },
              {
                path: '/NestedRoutes-1-2-2',
                name: 'NestedRoutes-1-2-2',
                meta: {
                  title: '路由-1-2-2',
                  keepAlive: true
                },
                component: () => import('@/views/NestedRoutes/NestedRoutes-1-2-2'),
                children: null
              },
              {
                path: '/NestedRoutes-1-2-3',
                name: 'NestedRoutes-1-2-3',
                meta: {
                  title: '路由-1-2-3',
                  keepAlive: true
                },
                component: () => import('@/views/NestedRoutes/NestedRoutes-1-2-3'),
                children: null
              }
            ]
          },
          {
            path: '/NestedRoutes-1-3',
            name: 'NestedRoutes-1-3',
            meta: {
              title: '路由-1-3',
              keepAlive: true
            },
            component: () => import('@/views/NestedRoutes/NestedRoutes-1-3'),
            children: null
          }
        ]
      },
      {
        path: '/NestedRoutes-2',
        name: 'NestedRoutes-2',
        meta: {
          title: '路由-2',
          keepAlive: true
        },
        component: () => import('@/views/NestedRoutes/NestedRoutes-2'),
        children: null
      },
      {
        path: '/NestedRoutes-3',
        name: 'NestedRoutes-3',
        meta: {
          title: '路由-3',
          keepAlive: true
        },
        component: () => import('@/views/NestedRoutes/NestedRoutes-3'),
        children: null
      }
    ]
  },
  {
    path: '/PermissionMenu',
    name: 'PermissionMenu',
    meta: {
      title: '权限菜单',
      keepAlive: true
    },
    component: () => import('@/views/PermissionMenu/PermissionMenu'),
    children: null
  },
  {
    path: '/Clipboard',
    name: 'Clipboard',
    meta: {
      title: 'Clipboard',
      keepAlive: true
    },
    component: () => import('@/views/Tools/Clipboard/Clipboard'),
    children: null
  },
  {
    path: '/Viewer',
    name: 'Viewer',
    meta: {
      title: 'Viewer',
      keepAlive: true
    },
    component: () => import('@/views/Tools/Viewer/Viewer'),
    children: null
  },
  {
    path: '/VueDraggable',
    name: 'VueDraggable',
    meta: {
      title: 'VueDraggable',
      keepAlive: true
    },
    component: () => import('@/views/Tools/VueDraggable/VueDraggable'),
    children: null
  },
  {
    path: '/Qrcode',
    name: 'Qrcode',
    meta: {
      title: '二维码',
      keepAlive: true
    },
    component: () => import('@/views/Tools/Qrcode/Qrcode'),
    children: null
  },
  {
    path: '/BaiduMap',
    name: 'BaiduMap',
    meta: {
      title: '百度地图',
      keepAlive: true
    },
    component: () => import('@/views/Map/BaiduMap/BaiduMap'),
    children: null
  },
  {
    path: '/Memorandum',
    name: 'Memorandum',
    meta: {
      title: '备忘录',
      keepAlive: true
    },
    component: () => import('@/views/Memorandum/Memorandum'),
    children: null
  },
  {
    path: '/Echarts',
    name: 'Echarts',
    meta: {
      title: 'Echarts',
      keepAlive: true
    },
    component: () => import('@/views/Charts/Echarts/Echarts'),
    children: null
  },
  {
    path: '/Demo',
    name: 'Demo',
    meta: {
      title: 'Demo',
      keepAlive: true
    },
    component: () => import('@/views/Demo/Demo'),
    children: null
  },
  {
    path: '/Guide',
    name: 'Guide',
    meta: {
      title: '新手引导',
      keepAlive: true
    },
    component: () => import('@/views/Guide/Guide'),
    children: null
  },
  {
    path: '/FilesDownLoad',
    name: 'FilesDownLoad',
    meta: {
      title: '下载文件',
      keepAlive: true
    },
    component: () => import('@/views/Files/FilesDownLoad'),
    children: null
  },
  {
    path: '/FilesUpload',
    name: 'FilesUpload',
    meta: {
      title: '上传文件',
      keepAlive: true
    },
    component: () => import('@/views/Files/FilesUpload'),
    children: null
  }
];

export default asyncMenuRoutes;
