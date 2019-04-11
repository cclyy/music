<template>
    <div class="load">
      <img src="./loading.gif" alt="">
      <p v-text="text"></p>
    </div>
</template>

<script>
    export default {
        props:{
            text:{
                type:String,
                default:"loading..."
            }
        }
    }
</script>

<style lang="less" scoped>
  @import '~@/common/less/variable.less';
  .load{
      width: 100%;
      text-align: center;
      position:absolute;
      top:50%;
      margin-top:-50px;
      img{
          width:30px;
          height:30px;
      }
      p{
          line-height:20px;
          font-size:@font-size-small;
          color:@color-text-l;
      }
  }
</style>