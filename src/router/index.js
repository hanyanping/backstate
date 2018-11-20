import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import backnews from '@/views/backnews'//公司动态
import cooperative from  '@/views/cooperative'//合作伙伴
import healthinquiry from '@/views/healthinquiry'//健康咨询
import healthnews from '@/views/healthnews'//健康新闻
import healthvoice from '@/views/healthvoice'//健康之声
import stafmanage from '@/views/stafmanage'//健康之声
import rolemanage from '@/views/rolemanage'//角色管理
import editornews from '@/views/editornews'//新建/编辑动态
import editorarticle from '@/views/editorarticle'//新建/编辑文章
import login from '@/views/login'//新建动态
import previewdetail from '@/views/previewdetail'//预览正文
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
            path: '/editorarticle',
            name: 'editorarticle',
            component: editorarticle
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
            path: '/stafmanage',
            name: 'stafmanage',
            component: stafmanage
        },
        {
            path: '/rolemanage',
            name: 'rolemanage',
            component: rolemanage
        },
         {
             path: '/editornews',
             name: 'editornews',
             component: editornews
         },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/previewdetail',
            name: 'previewdetail',
            component: previewdetail
        },
  ]
})
