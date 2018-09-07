import Vue from 'vue'
import Router from 'vue-router'
import Signup from './views/Signup.vue';
import Signin from './views/Signin.vue';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router)

function loggedInRedirectDashboard(to, from, next) {
  if (localStorage.token) {
    next('/dashboard');
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/signin');
  }
}



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter: loggedInRedirectDashboard,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      beforeEnter: loggedInRedirectDashboard,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: isLoggedIn,
    },
  ]
})
