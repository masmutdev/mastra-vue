import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/dashboard', component: () => import('@/views/Dashboard.vue') },
  { path: '/data-pelanggan', component: () => import('@/views/DataPelanggan.vue') },
  {
    path: '/proyek',
    children: [
      { path: 'manage', component: () => import('@/views/ManageProyek.vue') },
      { path: 'tambah', component: () => import('@/views/TambahProyek.vue') },
    ],
  },
  { path: '/whatsapp-blast', component: () => import('@/views/WhatsappBlast.vue') },
  { path: '/dokumentasi', component: () => import('@/views/Dokumentasi.vue') },
  { path: '/api', component: () => import('@/views/Api.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
