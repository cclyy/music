<template>
  <div id="app">
    <!-- 音乐播放器的头部 -->
    <music-header></music-header>
    <!-- tab -->
    <tab></tab>
    <!-- 页面 -->
    <router-view></router-view>
    <!-- 音乐播放器 -->
    <player></player>
  </div>
</template>

<script>
import MusicHeader from '@/components/musicheader'
import Tab from '@/components/tab'
import Player from '@/components/player'
export default {
  name: 'App',
  components:{
    MusicHeader,
    Tab,
    Player
  }
}
</script>
 
<style lang="less">
    @import '~@/common/less/index.less';  
</style>
