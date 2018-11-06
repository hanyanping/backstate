import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/views/home'
import addbanner from '@/views/addbanner'
import editorbanner from '@/views/editorbanner'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [

    {
      path: '/',
      name: 'home',
      component: home
    },
      {
          path: '/addbanner',
          name: 'addbanner',
          component: addbanner
      },
        {
            path: '/editorbanner',
            name: 'editorbanner',
            component: editorbanner
        }
  ]
})
