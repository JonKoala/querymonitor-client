import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewHome from 'views/ViewHome'
import ViewCreate from 'views/ViewCreate'
import ViewResults from 'views/ViewResults'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'create',
      path: '/create',
      component: ViewCreate
    },
    {
      name: 'home',
      path: '/',
      component: ViewHome
    },
    {
      name: 'results',
      path: '/results/:paramId',
      component: ViewResults,
      props: true
    }
  ],
  mode: 'history'
})
