import Vue from 'vue'
import Router from 'vue-router'
import FormTable from '@/views/demo/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FormTable',
      component: FormTable
    }
  ]
})
