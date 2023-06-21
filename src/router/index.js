import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from "@/views/LoginView.vue";
import SignUp from "@/views/SignUp.vue";
import Articles from "@/views/ArticlesView.vue";
import Article from "@/views/ArticleView.vue";
import Settings from "@/views/SettingsView.vue";

import { getAuth } from "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  try {
    if (requiresAuth && !currentUser) next({name: 'Login'});
    else next();
  } catch {
    return false;
  }
});

export default router
