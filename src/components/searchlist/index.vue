<template>
    <div class="search-list" >
       <!-- <transition-group name="list"> -->
           <div class="search-item" v-for="(item,index) in searches" >
               <span class="text" @click="changeSearch(item)">{{ item }}</span>
               <span class="icon">
                   <i class="icon-delete" @click.prevent='del(index)'></i>
               </span>
            </div>
       <!-- </transition-group> -->
    </div>
</template>

<script>
export default {
    props: {
        searches: {
            type: Array,
            default: []
        }

    },
    // methods: {
    //     ...mapState["searchHistory"],
    // },
    // created() {
    //     console.log($store.state.searchHistory)
    // },
    methods:{
      changeSearch(item){
          //   console.log(item)
          //  item =this.qucong(item)
            this.$emit("changeF",item)
        },
        del(index){
          this.searches.splice(index,1)
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
  .search-list{
    .search-item{
      display: flex;
      align-items: center;
      height: 40px;
      overflow: hidden;
      &.list-enter-active, &.list-leave-active
        {transition: all 0.1s}
      &.list-enter, &.list-leave-to
       { height: 0}
      .text{
        flex: 1;
        color: @color-text-l;
        }
      .icon{
        .icon-delete{
          font-size: @font-size-small;
          color: @color-text-d};
          }
    }
  }
</style>
