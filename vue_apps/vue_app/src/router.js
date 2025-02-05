import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Account from './views/Account.vue'
import CreateAccount from './views/CreateAccount.vue'
import ChangePassword from './views/ChangePassword.vue'
import manageProducts from './components/manageProducts.vue'
import Shop from './views/Shop.vue'
import Checkout from './views/Checkout.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/createAccount',
      name: 'create_account',
      component: CreateAccount
    },
    {
      path: '/login/:next',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/manageProducts',
      name: 'manageProducts',
      component: manageProducts
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Shop',
      name: 'shop',
      component: Shop,
    },
    {
      path: '/Checkout',
      name: 'checkout',
      component: Checkout,
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next({
        name: 'login',
        params: { next: to.fullPath }
      })
    }
  } else {
    next();
  }
})

export default router;