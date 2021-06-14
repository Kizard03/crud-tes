import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import mixin from './mixin.js'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'



Vue.config.productionTip = false
Vue.mixin(mixin);
Vue.use(VueSweetalert2);

Vue.use(IconsPlugin)
Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
