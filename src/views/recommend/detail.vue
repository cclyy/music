<template>
    
      <song-list :title='title' :img='bgImg' :list='SongList'></song-list>
    
</template>

<script>
    import SongList from '@/components/songsList'
    import { getCdInfo,getSingerList } from '@/api'
    export default {
        data(){
            return{
                SongList:[],
                title:'',
                bgImg:''
            }
        },
        created(){
            this.getCdInfoList()
        },
        methods:{
            getCdInfoList(){
                getCdInfo().then(res => {
                    // console.log(res)
                    if(res){
                       this.title = res.data.cdlist[0].dissname;
                       this.bgImg = res.data.cdlist[0].logo;
                       this.SongList = this.editSongs(res.data.cdlist[0].songlist) 
                    }
                    
                })
            },
            //对数据进行处理
            editSongs(list){
                let nList = []; 
                for(var i=0;i<list.length;i++){
                   var item = {
                        //不全
                        // 歌曲ID
                        id:list[i].songid,
                        //歌曲名
                        name:list[i].songname,
                        //专辑封面
                        img:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].albummid}.jpg?max_age=2592000`,
                        //歌曲时长
                        interval:list[i].interval,
                        //歌曲mid
                        songmid:list[i].songmid,
                        //歌手的姓名(数组)
                        singer:list[i].singer,
                        //专辑
                        album:list[i].albumname
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