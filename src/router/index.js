import Vue from 'vue'
import Router from 'vue-router'

//组件首字母大写
import Recommend from '@/views/recommend/'
import RecommendDetail from '@/views/recommend/detail'
import Singer from '@/views/singer/'
import SingerDetail from '@/views/singer/detail'
import Rank from '@/views/rank/'
import RankDetail from '@/views/rank/detail'
import Search from '@/views/search/'

Vue.use(Router)

export default new Router({
  mode:"hash",
  routes: [
    //路由重定向
    {
      path:"/",
      redirect:"/recommend"
    },
    {
      path: '/recommend',
      component:Recommend,
      children:[
        {
          path:'/recommend/:id',
          component:RecommendDetail
        }
      ]
    },
    {
      path: '/singer',
      component:Singer,
      children:[
        {
          path:'/singer/:id',
          component:SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component:Rank ,
      children:[
        {
          path:'/rank/:id',
          component:RankDetail
        }
      ] 
    },
    {
      path: '/search',
      component:Search
    }
  ]
})
