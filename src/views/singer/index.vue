<template>
    <div class="singer">
      <singer-list :singers="singerList"></singer-list>
      <transition class="detail" name="slide">
        <router-view></router-view>
      </transition>
    </div>
    
</template>

<script>
import { getSingerList } from '@/api/';
import SingerList from '@/components/singerList'
//A-Z 开头排序 A要放在一起 生成一个热门排序
    export default {
      data(){
        return {
          singerList:[],
        }
      },
      created() {
        this.getSlist()
      },
        methods:{
          getSlist(){
            getSingerList().then(res =>{
                // console.log(res)
                  this.singerList = this.newSinger(res.data.list) 
                })
           },
           newSinger(list){
             let nList = {
               hot:{
                 title:'热门',
                 list:[]
               },
             }
             //取前十条数据作为热门数据
             list.forEach((item,index) => {
               if(index < 10){
                 nList.hot.list.push({
                   id:item.Fsinger_mid,
                   name:item.Fsinger_name,
                   img:`http://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                 })
               }
               //通过姓名的首字母来排序
               let key = item.Findex
               if(!nList[key]){
                 nList[key] = {
                   title:key,
                   list:[]
                 }
               }
               nList[key].list.push({
                   id:item.Fsinger_mid,
                   name:item.Fsinger_name,
                   img:`http://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
               })
             });
             //console.log(nList)
            //把这个对象排序成有序的数组
            let hot = [];
            let other = []
            for( let i in nList){
              if(nList[i].title.match(/[a-zA-Z]/)){
                other.push(nList[i])
              }else if(nList[i].title == "热门"){
                hot.push(nList[i])
              }
            }
            other.sort((a,b) => {
              return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(other) 
           }
        },
        components:{
          SingerList
        }
    }
</script>

<style lang="less" scoped>
    .singer{
      position:fixed;
      top:88px;
      bottom:0;
      width:100%;
    }
</style>