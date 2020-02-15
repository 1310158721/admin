const asyncMenuRoutes = [
  {
    path: '/LayoutBase',
    name: 'LayoutBase',
    meta: {
      title: 'LayoutBase',
      isLayout: true
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
      title: 'Dashboard'
    },
    component: () => import('@/views/Dashboard/Dashboard'),
    children: null
  },
  {
    path: '/WaitingTodo',
    name: 'WaitingTodo',
    meta: {
      title: '待办列表'
    },
    component: () => import('@/views/WaitingTodo/WaitingTodo'),
    children: null
  },
  {
    path: '/NestedRoutes',
    name: 'NestedRoutes',
    meta: {
      title: '嵌套路由',
      redirect: '/NestedRoutes-1-1'
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
          redirect: '/NestedRoutes-1-1'
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
              title: '路由-1-1'
            },
            component: () => import('@/views/NestedRoutes/NestedRoutes-1-1'),
            children: null
          },
          {
            path: '/NestedRoutes-1-2',
            name: 'NestedRoutes-1-2',
            meta: {
              title: '路由-1-2',
              redirect: '/NestedRoutes-1-2-1'
            },
            component: () => import('@/views/NestedRoutes/NestedRoutes-1-2'),
            redirect: {
              path: '/NestedRoutes-1-2-1'
            },
            children: [
              {
                path: '/NestedRoutes-1-2-1',
                name: 'NestedRoutes-1-2-1',
                meta: {
                  title: '路由-1-2-1'
                },
                component: () => import('@/views/NestedRoutes/NestedRoutes-1-2-1'),
                children: null
              },
              {
                path: '/NestedRoutes-1-2-2',
                name: 'NestedRoutes-1-2-2',
                meta: {
                  title: '路由-1-2-2'
                },
                component: () => import('@/views/NestedRoutes/NestedRoutes-1-2-2'),
                children: null
              },
              {
                path: '/NestedRoutes-1-2-3',
                name: 'NestedRoutes-1-2-3',
                meta: {
                  title: '路由-1-2-3'
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
              title: '路由-1-3'
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
          title: '路由-2'
        },
        component: () => import('@/views/NestedRoutes/NestedRoutes-2'),
        children: null
      },
      {
        path: '/NestedRoutes-3',
        name: 'NestedRoutes-3',
        meta: {
          title: '路由-3'
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
      title: '权限菜单'
    },
    component: () => import('@/views/PermissionMenu/PermissionMenu'),
    children: null
  },
  {
    path: '/Clipboard',
    name: 'Clipboard',
    meta: {
      title: 'Clipboard'
    },
    component: () => import('@/views/Tools/Clipboard/Clipboard'),
    children: null
  },
  {
    path: '/Viewer',
    name: 'Viewer',
    meta: {
      title: 'Viewer'
    },
    component: () => import('@/views/Tools/Viewer/Viewer'),
    children: null
  },
  {
    path: '/VueDraggable',
    name: 'VueDraggable',
    meta: {
      title: 'VueDraggable'
    },
    component: () => import('@/views/Tools/VueDraggable/VueDraggable'),
    children: null
  },
  {
    path: '/BaiduMap',
    name: 'BaiduMap',
    meta: {
      title: '百度地图'
    },
    component: () => import('@/views/Map/BaiduMap/BaiduMap'),
    children: null
  },
  {
    path: '/Memorandum',
    name: 'Memorandum',
    meta: {
      title: '备忘录'
    },
    component: () => import('@/views/Memorandum/Memorandum'),
    children: null
  },
  {
    path: '/Echarts',
    name: 'Echarts',
    meta: {
      title: 'Echarts'
    },
    component: () => import('@/views/Charts/Echarts/Echarts'),
    children: null
  },
  {
    path: '/Demo',
    name: 'Demo',
    meta: {
      title: 'Demo'
    },
    component: () => import('@/views/Demo/Demo'),
    children: null
  },
  {
    path: '/Guide',
    name: 'Guide',
    meta: {
      title: '新手引导'
    },
    component: () => import('@/views/Guide/Guide'),
    children: null
  },
  {
    path: '/FilesDownLoad',
    name: 'FilesDownLoad',
    meta: {
      title: '下载文件'
    },
    component: () => import('@/views/Files/FilesDownLoad'),
    children: null
  },
  {
    path: '/FilesUpload',
    name: 'FilesUpload',
    meta: {
      title: '上传文件'
    },
    component: () => import('@/views/Files/FilesUpload'),
    children: null
  }
];

export default asyncMenuRoutes;
