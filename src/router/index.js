import Vue from 'vue'
import Router from 'vue-router'

import Main from '../components/Main.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
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
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('main')
  else next()
})

export default router