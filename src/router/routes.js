
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'New', component: () => import('pages/Teacher/NewForm/NewForm.vue') },
      { path: '/old', name: 'Old', component: () => import('pages/Teacher/OldExam/OldForm.vue') },
      {
        path: '/edit/:id',
        name: 'Edit',
        component: () => import('pages/Teacher/OldExam/EditExam.vue')
      }
    ]
  },
  {
    path: '/start/:id',
    name: 'Start',
    component: () => import('pages/Teacher/StartExam/StartExam.vue'),
    meta: { requiresAuth: true }
    // component: () => import('pages/GameStart/Lobby.vue')
  },
  {
    path: '/play/:id',
    name: 'Play',
    component: () => import('pages/Student/Game/Student.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Teacher/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import('pages/Student/Game/Room.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/notExist',
    name: 'NotExist',
    component: () => import('pages/Student/Game/NotExist.vue'),
    meta: { requiresAuth: false }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
    meta: { requiresAuth: false }
  }
]

export default routes
