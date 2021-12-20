import Vue from 'vue'
import Router from 'vue-router'
import NotebookList from '../components/NotebookList.vue'
import NoteDetail from '../components/NoteDetail.vue'
import TrashDetail from '../components/TrashDetail.vue'
import Login from '../components/Login'
Vue.use(Router) //将router注入到所有组件中共享；即所有组件任何地方都可以使用$router

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
},
    {
      path: '/notebooks',
      component: NotebookList
    },
    {
      path: '/note',
      component: NoteDetail
    },
    {
      path: '/trash',
      component: TrashDetail
    },

  ]
})
