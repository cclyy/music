<template>
    <div class="search">
        <div class="search-box-wrapper">
            <div class="search-box">
                <i class="icon-search"></i>
                <input type="text"  class="box" placeholder="搜索歌曲、歌手" v-model="query">
                <i class="icon-dismiss" v-show="query" @click="del"></i>
            </div>
        </div>
        <div class="shortcut-wrapper" v-show="!query">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li class="item" v-for="(item,index) in hotList" :key="item.key" @click="addSearch(item.k)">
                            <span>{{ item.k}}</span>
                        </li>
                    </ul>
                </div>
                <!-- 搜索历史 -->
                <div class="search-history" v-show="queryHistory.length">
                  <h1 class="title">
                      <span class="text">搜索历史</span>
                      <span class="clear" >
                          <i class="icon-clear" @click="dell"></i>
                      </span>
                  </h1>
                  <search-list :searches="queryHistory"  @changeF="changeFg"></search-list>
              </div>
            </div>
            
        </div>
        
        <scroll class="search-result" ref="searchResult" v-show="query">
            <div class="search-list">
                <ul>
                    <li class="search-item" v-for="item in searchList" @click="add(item)">
                        <i class="icon"></i>
                        <h6 class="text">{{ item.name }}</h6>
                        <p class="subtext">
                          <span v-for="b in item.singer" :key="item.key">{{ b.name }}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </scroll>
        <div class="loading" v-show="isLoading">
            <loading></loading>
        </div>
    </div>
</template>

<script>
import { getHotKey,search } from '@/api'
import Scroll from '@/components/scroll'
import { mapActions,mapMutations } from 'vuex'
import Loading from '@/components/loading'
import  SearchList from '@/components/searchlist'
  export default {
    data() {
      return {
        searchList:[],
        hotList:[],
        query:"",
        pageSize:1,
        pageNum:20,
        isLoading:true,
        queryHistory:[]
      }
    },
    created() {
      this.getHotKey()
    },
    // mounted(){
    //   console.log("aaa",this.queryHistory)
    // },
    methods:{
      dell(){
        this.queryHistory = []
      },
      changeFg(a){
        // console.log("aaaa")
        this.query = a
        this.goSearch()
      },
      del(){
        this.query = ""
      },
      getHotKey(){
        getHotKey().then( res =>{
          let HotArr = []
          let n = res.data.hotkey.splice(0,10)
          HotArr = n
          this.hotList = HotArr;
          // console.log("第一次打印",this.hotList)
          this.isLoading = false
        })
      },
      //点击搜索热歌
      addSearch(val){
        this.query = val
        this.goSearch()
        this.isLoading = true
      },
      //获取搜索列表
      goSearch(){
         this.searchList = []
         search(this.query,this.pageSize,this.pageNum).then(res => {
             console.log(res)
               
                this.totalNum = res.data.song.totalnum
                let list = this.editSongs(res.data.song.list)
                console.log("链接",list)
                this.searchList = list
                this.isLoading = false;
                console.log(this.searchList)
                // this.$nextTick(() => {
                //     this.$refs.searchResult.refresh()
                // })
            })
      },
      //对歌曲列表进行处理，获取歌曲相关的东西
        editSongs(list){
            let nSongsList = [];
            for(var i=0;i<list.length;i++){
                let item = {
                    //歌曲ID
                    id:list[i].id,
                    //mid
                    songmid:list[i].mid,
                    //歌曲名
                    name:list[i].name,
                    //专辑名
                    album:list[i].album.name,
                    //歌曲时长
                    interval:list[i].interval,
                    //专辑封面
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].album.mid}.jpg?max_age=2592000`,
                    //歌手
                    singer:list[i].singer
                }
                nSongsList.push(item)
            }
            return nSongsList
        },
      add(item){
        let list = []
        let s = []
        list.push(item)
        this.queryHistory.unshift(item.name)
       for(var i = 0;i<this.queryHistory.length;i++){
              if(s.indexOf(this.queryHistory[i]) == -1){  //判断在s数组中是否存在，不存在则push到s数组中
                  s.push(this.queryHistory[i]);
              }
          }
          this.queryHistory = s
        console.log(this.queryHistory)
      //  console.log(item.songmid) 
       
      //   console.log(item)
        this.addPlayer({
                  list: list,
                  index:0
              })
      },
      ...mapActions(["addPlayer"])
    },
    components:{
      Scroll,
      Loading,
      SearchList,
    },
    watch: {
      query(newQuery){
        this.goSearch()
      }
    },
  } 
</script>

<style lang="less" scoped>
@import "~@/common/less/variable.less";
.search{
    .search-box-wrapper{
      margin: 20px;
      .search-box{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 6px;
        height: 40px;
        background: @color-highlight-background;
        border-radius: 6px;
        .icon-search{
        font-size: 24px;
        color: @color-background;
        }
        .box{
            flex: 1;
            margin: 0 5px;
            line-height: 18px;
            background: @color-highlight-background;
            color: @color-text;
            font-size: @font-size-medium;
            &:focus{
                outline: none;
            }
        }
        &::placeholder{
            color: @color-text-d;
        }
        .icon-dismiss{
            font-size: 16px;
            color: @color-background;
        }
      }
    }
    .shortcut-wrapper{
      position: fixed;
      top: 178px;
      bottom: 0;
      width: 100%;
      .shortcut{
        height: 100%;
        overflow: hidden;
        .hot-key{
          margin: 0 20px 20px 20px;
          .title{
            margin-bottom: 20px;
            font-size: @font-size-medium;
            color: @color-text-l;
          }
          .item{
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: @color-highlight-background;
            font-size: @font-size-medium;
            color: @color-text-d;
          }
        }
        .search-history{
          position: relative;
          margin: 0 20px;
          .title{
            display: flex;
            align-items: center;
            height: 40px;
            font-size: @font-size-medium;
            color: @color-text-l;
            .text{
              flex: 1;
            }
            .clear{
              .icon-clear{
                font-size: @font-size-medium;
                color: @color-text-d;
              }
            }
          }
        }
      }
     
    }
    .search-result{
      position: fixed;
      width: 100%;
      top: 168px;
      overflow: hidden;
      bottom: 0;
      .search-list{
        .search-item{
            position: relative;
            height: 55px;
            padding-left: 56px;
            overflow: hidden;
            .icon{
                position: absolute;
                top: 18px;
                left: 18px;
                width: 22px;
                height: 20px;
                background-position: 0 0;
                background-image: url(./search_sprite.png);
                background-repeat: no-repeat;
                background-size: 22px 30px;
            }
            .text {
                margin: 10px 0 2px;
                line-height: 18px;
                font-weight: normal;
                color: @color-text-ll;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: @font-size-medium;
            }
            .subtext{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: @color-text-l;
                font-size: @font-size-small;
            }
            &::after{
                content: "";
                position: absolute;
                height: 1px;
                bottom: 0;
                left: 0;
                right: 0;
                background: #333;
            }
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
</style>
