<template>
    <div class="music-list" ref="musiclist">
        <!-- 返回上一页 -->
        <div class="back">
            <i class="icon-back" @click="back"></i>
        </div>
        <!-- 歌曲信息 -->
        <h1 class="title">{{ title }}</h1> 
        <div class="bg-image" :style="bgImg" ref='bgImage'>
            <div class="play-wrapper"> 
                <div ref="playBtn" class="play">
                    <i class="icon-play"></i>
                    <span class="text" ref='playBtn'>随机播放全部</span>
                </div>
            </div>
        </div>
        <!-- 滑动辅助层 -->
        <div class="bg-layer" ref="layer"></div>
        <!-- 歌曲列表 -->
        <scroll ref="scroll" class="list" :data='list':listenScroll=true   :probeType=3  @scroll="scroll">
            <div class="song-list-wrapper">
                <div class="song-list">
                    <ul>
                        <li class="item" v-for="(item,index) in list" :key="item.key" @click="addplayer(index)">
                            <div class="rank">
                                <span class="text">{{ index+1 }}</span>
                            </div>
                            <div class="content">
                                <h2 class="name">{{ item.name }}</h2>
                                <p class="desc">
                                   <span v-for='item1 in item.singer' :key="item.key">{{ item1.name}}</span>
                                {{ item.album }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from '@/components/scroll'
import { mapActions,mapMutations } from 'vuex'
export default {
    props:{
        list:{
            type:Array,
            default:[]
        },
        img:{
            type:String,
            default:''
        },
        title:{
            type:String,
            default:''
        }
    },
    mounted(){
        this.bgH = this.$refs.bgImage.clientHeight;
        this.$refs.scroll.$el.style.top = this.bgH +'px';
        this.ty = -this.bgH + 40
        // console.log(this.bgH)
    },
    computed:{
        bgImg(){
            return `background-image:url(${this.img})`
        }
    },
    components:{
        Scroll
    },
    data(){
        return {
            scrollY:0,
        }
    },
    methods:{
        //返回上一页
        back(){
            this.$router.back()
        },
        scroll(obj){
            this.scrollY = obj.y
        },
        addplayer(index){
            this.addPlayer({
                list:this.list,
                index:index
                })
        },
        ...mapActions(['addPlayer'])
    },
    watch:{
        scrollY(v){
            let translateY = Math.max(this.ty,v);
            let scale = 1;
            let zindex = 0;
            let p = Math.abs( v / this.bgH)
            this.$refs.layer.style.transform = `translate3d(0,${translateY}px,0)`
            if(v>0){
                scale += p;
                zindex = 5;
            }
            if(v<this.ty){
                zindex = 5;
                this.$refs.bgImage.style.height = '40px';
                this.$refs.bgImage.style.paddingTop = 0;
                this.$refs.playBtn.style.display = 'none'
            }else{
                this.$refs.bgImage.style.height = 0;
                this.$refs.bgImage.style.paddingTop = "70%";
                this.$refs.playBtn.style.display = ''
            }
            this.$refs.bgImage.style.transform = `scale(${scale})`
            this.$refs.bgImage.style.zIndex = zindex
        //    console.log(this.$refs.bgImage.style.zIndex) 
        }
    }
}
   
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
.music-list{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: @color-background;
    .back{
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back{
            display: block;
            padding: 10px;
            font-size: @font-size-large-x;
            color: @color-theme;
        }
    }
    .title{
        position: absolute;
        top: 0;
        left: 10px;
        z-index: 40;
        width: 100%;
        text-align: center;
        line-height: 40px;
        font-size: @font-size-large;
        color: @color-text;
    }
    .bg-image{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
        // z-index:1;
        .play-wrapper{
            position: absolute;
            bottom: 20px;
            z-index: 50;
            width: 100%;
            .play{
                box-sizing: border-box;
                width: 135px;
                padding: 7px 0;
                margin: 0 auto;
                text-align: center;
                border: 1px solid @color-theme;
                border-radius: 100px;
                font-size: 0;
                .icon-play{
                    color:#ffcd32;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 6px;
                    font-size: @font-size-medium-x;
                }
                .text{
                    color:#ffcd32;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: @font-size-small;
                }
            }
            .filter{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(7, 17, 27, 0.4)
            }
        }
    }
    .bg-layer{
        position: relative;
        height: 100%;
        background: @color-background;
    }
    .list{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: @color-background;
        transition: all 0.5s;
        .song-list-wrapper{
            padding: 10px 20px;
        }
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        height: 100%;
        z-index: 99;
        background: #222;
    }
    .song-list{
        .item{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 64px;
            font-size: @font-size-medium;
            .rank{
                flex: 0 0 25px;
                width: 25px;
                margin-right: 20px;
                text-align: center;
                .text{
                    color: @color-theme;
                    font-size: @font-size-large;
                }
            }
            .content{
                flex: 1;
                line-height: 20px;
                overflow: hidden;
                .name{
                    color: @color-text;
                }
                .desc{
                    margin-top: 4px;
                    color: @color-text-d;
                }
            }
        }
    }
}
</style>

