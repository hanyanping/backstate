import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/views/home'
import editorbanner from '@/views/editorbanner'
import backnews from '@/views/backnews'//公司动态
import cooperative from  '@/views/cooperative'//合作伙伴
import healthinquiry from '@/views/healthinquiry'//健康咨询
import healthnews from '@/views/healthnews'//健康新闻
import healthvoice from '@/views/healthvoice'//健康之声
import management from '@/views/management'//健康之声
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
            path: '/editorbanner',
            name: 'editorbanner',
            component: editorbanner
        },
        {
            path: '/backnews',
            name: 'backnews',
            component: backnews
        },
        {
            path: '/cooperative',
            name: 'cooperative',
            component: cooperative
        },
        {
              path: '/healthinquiry',
              name: 'healthinquiry',
              component: healthinquiry
        },
        {
            path: '/healthnews',
            name: 'healthnews',
            component: healthnews
        },
        {
            path: '/healthvoice',
            name: 'healthvoice',
            component: healthvoice
        },
        {
            path: '/management',
            name: 'management',
            component: management
        }



  ]
})
