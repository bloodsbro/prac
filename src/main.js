import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
const moment = require('moment')
require('moment/locale/uk')

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Сделайте BootstrapVue доступным для всего проекта
Vue.use(BootstrapVue)
// При желании установите плагин компонентов иконок BootstrapVue
Vue.use(IconsPlugin)

Vue.use(require('vue-moment'), {
  moment
})

Vue.config.productionTip = false

let vue = null;
const firebaseConfig = {
  apiKey: 'AIzaSyCS042WwPDE0xIHbCiBaHHl0h868K_YMqY',
  authDomain: 'prac-622aa.firebaseapp.com',
  databaseURL: 'https://prac-622aa-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'prac-622aa',
  storageBucket: 'prac-622aa.appspot.com',
  messagingSenderId: '110251344437',
  appId: "1:110251344437:web:1668f188c4b3488a6a277c",
  measurementId: "G-8WEM6QVQ07"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (!vue) {
    /* eslint-disable no-new */
    vue = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});