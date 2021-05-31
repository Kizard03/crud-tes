import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/Home.vue'
import anggota from '@/views/crud/anggota.vue'
import anggotaedit from '@/views/crud/anggotaedit.vue'
import barang from '@/views/card/barang.vue'
import barangcreate from '@/views/card/barangcreate.vue'
import barangupdate from '@/views/card/barangupdate.vue'
import databarang from '@/views/card/databarang.vue'
import quotesapi from '@/views/quotesAPI/quotesapi.vue' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/anggota',
    name: 'anggota',
    component: anggota
  },
  {
    path: '/anggota/edit',
    name: 'anggotaedit',
    component: anggotaedit
  },
  {
    path: '/barang',
    name: 'barang',
    component: barang
  },
  {
    path: '/barang/create',
    name: 'barangcreate',
    component: barangcreate
  },
  {
    path: '/barang/update',
    name: 'barangupdate',
    component: barangupdate
  },
  {
    path: '/barang/databarang',
    name: 'databarang',
    component: databarang
  },
  {
    path: '/quotes',
    name: 'quotesapi',
    component: quotesapi
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
