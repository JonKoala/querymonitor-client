import Vue from 'vue'
import VueRouter from 'vue-router'

import ViewHome from 'views/ViewHome'
import ViewSandbox from 'views/ViewSandbox'
import ViewResults from 'views/ViewResults'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'sandbox',
      path: '/sandbox',
      component: ViewSandbox
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
