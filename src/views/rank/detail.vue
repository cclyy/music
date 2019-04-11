<template>
      <song-list :title='title' :img='bgImg' :list='SongList'></song-list>
        
</template>

<script>
    import SongList from '@/components/songsList'
    import { getRankInfo } from '@/api'
    export default {
        data(){
            return{
                SongList:[],
                title:'',
                bgImg:''
            }
        },
        created(){
           this.aaa()
        },
        methods:{
            aaa(){
                getRankInfo(this.$route.params.id).then(res => {
                    // console.log(res)
                    if(res){
                       this.title = res.topinfo.ListName;
                       this.bgImg = res.topinfo.pic_v12       
                       this.SongList = this.editSongs(res) 
                       console.log(this.SongList)
                    }
                    
                })
            },
            //对数据进行处理
            editSongs(list){
                let nList = []; 
                for(var i=0;i<list.songlist.length;i++){
                   var item = {
                        //不全
                        // 歌曲ID
                        id:list.songlist[i].data.songid,
                        //歌曲名
                        name:list.songlist[i].data.songname,
                        //专辑封面
                        img:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${list.songlist[i].data.albummid}.jpg?max_age=2592000`,
                        //歌曲时长
                        interval:list.songlist[i].data.interval,
                        //歌曲mid
                        songmid:list.songlist[i].data.songmid,
                        //歌手的姓名(数组)
                        singer:list.songlist[i].data.singer,
                        //专辑
                        album:list.songlist[i].data.albumname
                    };
                    nList.push(item)
                }
                
                return nList
            }
        },
        components:{
            SongList
        }
    }
</script>

<style lang="less" scoped>
</style>