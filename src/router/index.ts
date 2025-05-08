import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('@/views/auth/Login.vue') },
  { path: '/register', component: () => import('@/views/auth/Register.vue') },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/data-pelanggan',
    component: () => import('@/views/dashboard/DataPelanggan.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/proyek',
    children: [
      {
        path: 'manage',
        component: () => import('@/views/dashboard/ManageProyek.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tambah',
        component: () => import('@/views/dashboard/TambahProyek.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/whatsapp-blast',
    component: () => import('@/views/dashboard/WhatsappBlast.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/dokumentasi',
    component: () => import('@/views/dashboard/Dokumentasi.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/api',
    component: () => import('@/views/dashboard/Api.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Guard: Cek login sebelum masuk route
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true'
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
