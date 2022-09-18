import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from 'views/Layout'
import Search from 'views/Search'
import News from 'views/News'
import My from 'views/My'
import Home from 'views/Home'
import Login from 'views/My/cpns/Login'
import Register from 'views/My/cpns/Register'
import City from '@/views/Home/City'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Layout/Home'
  },
  {
    path: '/Layout',
    component: Layout,
    children: [
      {
        path: '/Layout/Search',
        component: Search
      },
      {
        path: '/Layout/News',
        component: News
      },
      {
        path: '/Layout/My',
        component: My
      },
      {
        path: '/Layout/Home',
        component: Home
      }
    ]
  },
  {
    path: '/Layout/Login',
    component: Login
  },
  {
    path: '/Layout/Register',
    component: Register
  },
  {
    path: '/City',
    component: City
  }
]
const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
