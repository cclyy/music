import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //状态
    state:{
        //播放状态 Boolean
        playing:false,
        //播放是否全屏 Boolean
        fullScreen:false,
        //播放列表 Array
        playList:[],
        //当前播放歌曲在播放列表中的索引
        currentIndex:-1,
        //播放模式 顺序0, 随机1, 单曲2 
        mode:0,
       //搜索记录
    //    searchHistory:[]
    },
    getters:{
        playing:state => state.playing,
        fullScreen: state => state.fullScreen,
        playList: state => state.playList,
        currentIndex: state => state.currentIndex,
        mode: state => state.mode,
        //当前播放的歌曲
        currentSong:state => {
            return state.playList[state.currentIndex]
        }
    },
    //相当于函数
    mutations:{
        changePlaying(state,playing){
            state.playing = playing
        },
        changeFullScreen(state,fullScreen){
            state.fullScreen = fullScreen
        },
        changePlayList(state,playList){
            state.playList = [...playList]
        },
        changeCurrentIndex(state,currentIndex){
            state.currentIndex = currentIndex
        },
        changeMode(state,mode){
            state.mode = mode
        },
        // changesearchHistory(state,searchHistory){
        //     state.searchHistory.push(searchHistory)
        // }
        
    },
    actions:{
        //添加歌曲
        // 1、改变播放状态 -- 播放
        // 2、把播放器设置成全屏
        // 3、添加播放列表
        // 4、指定播放哪一首
        addPlayer({commit},{list,index}){
            commit('changePlaying',true)
            commit('changeFullScreen',true)
            commit('changePlayList',list)
            commit('changeCurrentIndex',index)
            
        },
        //添加搜索记录
        // addSearch({commit},{list}){
        //     commit('changesearchHistory',list)
        // },
        //删除歌曲
        delSong({commit},song){
            let index = 0
            let playList = state.playList
            for(let i=0;i<playList.length;i++){
                if(playList[i].id == song.id){
                    index = i
                }
            }
            playList.splice(index,1)
            if(state.currentIndex == playList.length){
                currentIndex--
            }
            commit('changePlaying',true)
            commit('changePlayList',playList)
            commit('changeCurrentIndex',currentIndex)         
        },
        //清空播放列表
        clearPlayList({commit}){
            commit('changePlaying',false)
            commit('changePlayList',[])
            commit('changeCurrentIndex',-1)
        }
    }
})