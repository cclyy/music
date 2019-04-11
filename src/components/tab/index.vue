<template>
    <div>
        <div class="tabs">
            <router-link class="tab_item" to="recommend">
                <span class="tab-link" >推荐</span> 
            </router-link>
            <router-link class="tab_item" to="singer">
                <span class="tab-link">歌手</span>
            </router-link>
            <router-link class="tab_item" to="rank">
                <span class="tab-link">排行</span>
            </router-link>
            <router-link class="tab_item" to="search">
                <span class="tab-link">搜索</span>
            </router-link>
        </div>
    </div>
</template>
 
<script>
    export default {
         
    }
</script>

<style lang="less" scoped>
  @import '~@/common/less/variable.less';
  .tabs{
      display: flex;
      height: 44px;
      line-height: 44px;
      font-size:@font-size-medium;
      .tab_item{
          flex: 1;
          text-align: center;
          .tab-link{
              color:@color-text-l;  
          }
          &.router-link-active{
                .tab-link{
                    color:@color-theme;
                    border-bottom:2px solid;
                    padding-bottom:4px;
                }   
              }
      }
  }
</style>