const asyncMenuRoutes = [
  {
    path: '/LayoutBase',
    name: 'LayoutBase',
    meta: {
      title: 'LayoutBase',
      isRouteNode: true,
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
      title: 'Dashboard',
      isRouteNode: false
    },
    component: () => import('@/views/Dashboard/Dashboard'),
    children: null
  },
  {
    path: '/WaitingTodo',
    name: 'WaitingTodo',
    meta: {
      title: '待办列表',
      isRouteNode: false
    },
    component: () => import('@/views/WaitingTodo/WaitingTodo'),
    children: null
  },
  {
    path: '/NestedRoutes',
    name: 'NestedRoutes',
    meta: {
      title: '嵌套路由',
      isRouteNode: true,
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
          isRouteNode: true,
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
              title: '路由-1-1',
              isRouteNode: false
            },
            component: () => import('@/views/NestedRoutes/NestedRoutes-1-1'),
            children: null
          },
          {
            path: '/NestedRoutes-1-2',
            name: 'NestedRoutes-1-2',
            meta: {
              title: '路由-1-2',
              isRouteNode: true,
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
                  title: '路由-1-2-1',
                  isRouteNode: false
                },
                component: () => import('@/views/NestedRoutes/NestedRoutes-1-2-1'),
                children: null
              },
              {
                path: '/NestedRoutes-1-2-2',
                name: 'NestedRoutes-1-2-2',
                meta: {
                  title: '路由-1-2-2',
                  isRouteNode: false
                },
                component: () => import('@/views/NestedRoutes/NestedRoutes-1-2-2'),
                children: null
              },
              {
                path: '/NestedRoutes-1-2-3',
                name: 'NestedRoutes-1-2-3',
                meta: {
                  title: '路由-1-2-3',
                  isRouteNode: false
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
              isRouteNode: false
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
          isRouteNode: false
        },
        component: () => import('@/views/NestedRoutes/NestedRoutes-2'),
        children: null
      },
      {
        path: '/NestedRoutes-3',
        name: 'NestedRoutes-3',
        meta: {
          title: '路由-3',
          isRouteNode: false
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
      title: 'Clipboard',
      isRouteNode: false
    },
    component: () => import('@/views/Tools/Clipboard/Clipboard'),
    children: null
  },
];

export default asyncMenuRoutes;
