<template>
  <div class="rank" ref="rank">
     <scroll  class="toplist" ref="topList"  ><!--:data="ranks" -->
      <ul>
        <li  class="item" v-for="item in songList" @click="toDetail(item)">
          <div class="icon" >
            <img width="100" height="100" :src="item.picUrl"/>
          </div>
          <ul class="songlist" >
            <li class="song" v-for="(item1,index) in item.songList" >
              <span>{{index+1}}</span>
              <span>{{item1.songname}}-{{item1.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <div class="loading" v-show="isLoading">
              <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from '@/components/scroll'
import { getRankList } from '@/api/'
import Loading from '@/components/loading'
  export default {
     data(){
          return{
            songList:[],
            isLoading:true
          }
        },
     created(){
          this.getRankListData(); 
        },
    methods:{
      toDetail(tid){
        this.$router.push({path:`/rank/${tid.id}`})
      },
      //获取接口
      getRankListData(){
        getRankList().then(res => {
              // console.log(res.data);
              this.songList = res.data.topList;
              this.isLoading = false
              // this.isLoading = false;
              console.log(this.songList)
            })
          },
    },
   	components:{
   			Scroll,
        Loading
   		}
  }
</script>
<style scoped lang="less">
@import "~@/common/less/variable.less";
  .rank{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .toplist{
      height: 100%;
      overflow: hidden;
      .item{
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
        &:last-child{
          padding-bottom: 20px;
        }
        .icon{
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
      	}
        .songlist{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: @color-highlight-background;
          color: @color-text-d;
          font-size: @font-size-small;
          .song{
            line-height: 26px;
        }
    }
}

      /*.loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    	}
*/    }
.loading{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #222;
        left: 0;
        top: 0;
      }
    
}

</style>
