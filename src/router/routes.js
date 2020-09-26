
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/NewForm/NewForm.vue') },
      { path: '/old', component: () => import('pages/OldForm.vue') }
    ]
  },
  {
    path: '/start/:id',
    name: 'Start',
    component: () => import('pages/GameStart/Start.vue')
  },
  {
    path: '/play/:id',
    name: 'Play',
    component: () => import('pages/Student/Play.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
