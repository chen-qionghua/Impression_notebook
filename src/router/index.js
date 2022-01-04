import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router) //将router注入到所有组件中共享；即所有组件任何地方都可以使用$router

export default new Router({
  routes: [
    {
      path:'/',
      alias:'/notebooks',
      component: () => import('../components/NotebookList.vue')

    },
    {
      path: '/login',
      component: () => import('../components/Login')
    },

    {
      path: '/note',
      component: () => import('../components/NoteDetail.vue')
    },
    {
      path: '/trash',
      component: () => import('../components/TrashDetail.vue')
    },

  ]
})
