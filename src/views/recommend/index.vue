<template>
    <div class="recommend">
      <scroll class="recommend-content" :data="songList">
        <div>
            <!-- 轮播图 -->
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in slider">
                  <img :src="item.picUrl" width="100%">
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>

            <!-- 热门歌单推荐 -->
            <div class="recommend-list">
                <h2>热门歌单推荐</h2>
                <ul>
                  <li class="item" v-for="item in songList" :key="item.key" @click="toDetail(item.id)">
                    <div class="icon"><img :src="item.picUrl" alt=""></div>
                    <div class="text">
                      <h3 v-text="item.songListAuthor"></h3>
                      <p v-text="item.songListDesc"></p>
                    </div>
                  </li>
                </ul>
            </div> 
        </div>
      </scroll>
      <transition class="detail" name="slide">
          <router-view></router-view>
      </transition>
      <div class="loading" v-show="isLoading">
              <loading></loading>
      </div>
    </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.css';
  import { getRecommend,getRList} from '@/api';
  import Scroll from '@/components/scroll'
  import Loading from '@/components/loading'
    export default {
        components:{  
          Swiper,
          Scroll,
          Loading
        },
        data(){
          return{
            slider:[],
            songList:[],
            isLoading:true
          }
        },
        created(){
          this.getRecommendData(); 
        },
        methods:{
        //获取接口
          getRecommendData(){
            getRecommend().then(res => {
              // console.log(res);
              this.slider = res.data.slider;
              this.songList = res.data.songList;
              this.isLoading = false;
            })
          },
           //千千音乐
          // get(){
          //   getRList().then(res => {
              // console.log(res)
              // this.songList = res.result
          //   })
          // },
          //跳转页面
          toDetail(tid){
            this.$router.push({path:`/recommend/${tid}`})
          }
        },   
        //钩子函数挂载之前去实例化swiper
        mounted(){
          var slide = new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
            },
            observer:true,
            observeParents:true,
            autoplay: {
                delay: 3000, //1秒切换一次
                // loop: true,
                disableOnInteraction: false,
              },
          });
          // slide.el.onmouseover = function(){ //鼠标放上暂停轮播
          //     slide.autoplay.stop();
          //      },
          // slide.el.onmouseleave = function(){
          //   slide.autoplay.start();
          //     }
        }
    }
</script>

<style lang="less" scoped>
    @import '~@/common/less/variable.less';
    .recommend{
      position: fixed;
      width: 100%;
      top: 88px;
      bottom: 0;
      .recommend-content{
        height:100%;
        overflow: hidden;
      }
      .recommend-list{
        h2{
          height:60px;
          line-height:60px;
          font-size:@font-size-medium-x;
          color:@color-theme;
          text-align :center;
        }
        .item{
          display:flex;
          box-sizing:border-box;
          padding:0 20px 20px 20px;
          .icon{
            flex: 0 0 60px;
            width:60px;
            height:60px;
            padding-right:20px;
            img{
              width:60px;
              height:60px;
            }
          }
          .text{
            flex:1;
            display:flex;
            flex-direction:column;
            justify-content:center;
            line-height:20px;
            overflow:hidden;
            font-size:@font-size-medium;
            h3{
              margin-bottom:10px;
              color:@color-text;
            }
            p{
              color:@color-text-d;
            }
          }
        }
      }
      .loading{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #222;
        left: 0;
        top: 0;
      }
     .slide-enter,.slide-leave-to{
         transform: translate3d(100%,0,0)
     }
     .slide-enter-active,.slide-leave-active{
         transition: all,0.5s;
     }
    }
   
</style>