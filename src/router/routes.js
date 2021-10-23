

import { openURL } from 'quasar'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Info.vue') },
      { path: '/donations', component: () => import('src/pages/Donations.vue') },
      { path: '/sponsors', component: () => import('src/pages/Sponsors.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
