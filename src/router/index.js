import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app";

//guest
import home from '@/views/Home.vue'

//User
import index from '@/views/user/index.vue'
import anggota from '@/views/user/crud/anggota.vue'
import anggotaedit from '@/views/user/crud/anggotaedit.vue'
import barang from '@/views/user/card/barang.vue'
import showbarang from '@/views/user/card/showbarang.vue'
import quotesapi from '@/views/user/quotesAPI/quotesapi.vue' 
import quotesapi_show from '@/views/user/quotesAPI/quotes_show.vue'

//Admin
import admin from '@/views/admin/admin.vue'
import barangcreate from '@/views/admin/barang/barangcreate.vue'
import barangupdate from '@/views/admin/barang/barangupdate.vue'
import databarang from '@/views/admin/barang/databarang.vue'

//auth
import login from '@/views/auth/login.vue'
import signup from '@/views/auth/signup.vue'
import forgot_password from '@/views/auth/forgotpassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta : {
      // guest: true,
      auth: false,
    }
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: {
      is_admin: false, 
      // session: true,
      auth: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    meta:{ 
      is_admin : true,
      auth : true}
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta : {
      // guest: true,
      // session: true,
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup,
    meta : {
      // guest: true,
      // session: true,
    }
  },
  {
    path: '/forgot-password',
    name: 'forgotpassword',
    component: forgot_password,
    meta : {
      // guest: true,
      auth: false,
      // session: true,
    }
  },
  {
    path: '/anggota',
    name: 'anggota',
    component: anggota,
    meta: {
      // session: false, 
      auth: true }
    
  },
  {
    path: '/anggota/edit',
    name: 'anggotaedit',
    component: anggotaedit,
    meta: {
      is_admin: false, 
      auth: true }
    
  },
  {
    path: '/barang',
    name: 'barang',
    component: barang,
    meta: {
      is_admin: false, 
      auth: true }
    
  },
  {
    path: '/barang/create',
    name: 'barangcreate',
    component: barangcreate,
    meta:{ 
      is_admin : true,
      auth : true}
    
  },
  {
    path: '/barang/update',
    name: 'barangupdate',
    component: barangupdate,
    meta:{ 
      is_admin : true,
      auth : true}
    
  },
  {
    path: '/databarang',
    name: 'databarang',
    component: databarang,
    meta:{ 
      is_admin : true,
      auth : true}
    
  },
  {
    path: '/barang/showbarang/:id ',
    name: 'showbarang',
    component: showbarang,
    meta: {
      is_admin: false, 
      auth: true }
    
  },
  {
    path: '/quotes',
    name: 'quotesapi',
    component: quotesapi,
    meta: { 
      auth: true,
      is_admin: false,
    }
    
  },
  {
    path: '/quotes/:quote',
    name: 'quotesapi_show',
    component: quotesapi_show,
    meta: { 
      auth: true,
      is_admin: false,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// router.beforeEach((to, from, next) =>{
//   firebase.auth().onAuthStateChanged((user) =>{
//     if (user) {
//       if(to.matched.some(record => record.meta.auth)){
//         next()
//       }else{
//         next({
//           path: '/index'
//         })
//       } 
//     }else {
//       if(to.matched.some(record => record.meta.auth)){
//         next({
//           path: '/login'
//         })
//       }
//       next();
//     }
//   });
// })

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const user_local = JSON.parse(localStorage.getItem('user'));
    // const guest = to.matched.some(record => record.meta.guest);
    const auth = to.matched.some(record => record.meta.auth);
    const admin_only = to.matched.some(record => record.meta.is_admin);
    // let session = to.matched.some(record => record.meta.session)
    if(!user_local && !currentUser) {
      
      if(!auth) {
        next();
        console.log("masuk ke 1")
      } else {
        next({ path: '/login' });
        console.log("masuk ke 2")
      }
    } else{
      if(admin_only) {
        if(user_local.is_admin){
          next();
        console.log("masuk ke 3")
        }else {
          next({ path: '/index'});
        console.log("masuk ke 4")
        }
      } else {
        if(user_local.is_admin) {
        console.log("masuk ke 5")
          next({path: '/admin'});
        }else{
        console.log("masuk ke 6")
          next();
        }
      }
    }
})

// router.beforeEach((to, from, next) => {
//   const currentUser = firebase.auth().currentUser;
//   const auth = to.matched.some((record) => record.meta.auth);
//   const adminOnly = to.matched.some((record) => record.meta.adminOnly);
//   const noMiddleware = to.matched.some((record) => record.meta.noMiddleware);

//   if(noMiddleware) {
//     next();
//   } else {
//     let is_admin = false;

//     if(localStorage.user) {
//       let user = JSON.parse(localStorage.user);
//       if(user.is_admin) {
//         is_admin = true;
//       }
//     }

//     if (auth && !currentUser) {
//       next({ path : '/'});
//     } else if (!auth && currentUser) {
//       if (is_admin) {
//         next ({path: '/admin'});
//       } else {
//         next({path: '/index'});
//       }
//     } else {
//       if(adminOnly) {
//         if (is_admin) {
//           next ();
//         } else {
//           next({path: '/index'})
//         }
//       }else {
//         if (is_admin) {
//           next ({path: '/admin'})
//         }
//       }
//     }
//   }
// })

export default router;