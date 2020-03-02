const sharePage = [
  {
    path: '/Share',
    name: 'Share',
    meta: {},
    component: () => import('@/layout/Share'),
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
  }
];

export default sharePage;
