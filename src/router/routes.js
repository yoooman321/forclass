
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
    component: () => import('pages/Teacher/StartExam/StartExam.vue')
    // component: () => import('pages/GameStart/Lobby.vue')
  },
  {
    path: '/play/:id',
    name: 'Play',
    component: () => import('pages/Student/Play.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Teacher/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
