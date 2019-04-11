<template>
      <song-list :title='title' :img='bgImg' :list='SongList'></song-list>
</template>

<script>
    import SongList from '@/components/songsList'
    import { getSingerInfo } from '@/api'
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
                console.log('aa')
                getSingerInfo(this.$route.params.id).then(res => {
                    console.log(res.data)
                    if(res){
                       this.title = res.data.singer_name;
                       this.bgImg = "http://y.gtimg.cn/music/photo_new/T001R300x300M000" +
                            res.data.singer_mid +
                            ".jpg?max_age=2592000";
                       this.SongList = this.editSongs(res.data.list) 
                       console.log(this.SongList)
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
                        id:list[i].musicData.songid,
                        //歌曲名
                        name:list[i].musicData.songname,
                        //专辑封面
                        img:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].musicData.albummid}.jpg?max_age=2592000`,
                        //歌曲时长
                        interval:list[i].musicData.interval,
                        //歌曲mid
                        songmid:list[i].musicData.songmid,
                        //歌手的姓名(数组)
                        singer:list[i].musicData.singer,
                        //专辑
                        album:list[i].musicData.albumname
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