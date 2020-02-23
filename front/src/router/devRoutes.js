const devRoutes = [
  {
    path: '/Test',
    name: 'Test',
    meta: {
      title: '方便测试',
      keepAlive: true
    },
    component: () => import('@/views/Test/Test'),
    children: null
  }
];

export default devRoutes;
