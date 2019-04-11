<template>
    <div class="m-header">
       <div class="logo"></div>
       <h1 class="text">CCL Music</h1>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
    @import '~@/common/less/variable.less';
    .m-header{
        height: 44px;
        text-align: center;
        color:@color-theme;
        .logo{
            display: inline-block;
            width: 30px;
            height: 30px;
            background: url(./logo.png);
            background-size: 100% 100%;
            margin-top:4px;
            vertical-align:top;
        }
        .text{
            display: inline-block;
            line-height: 44px;
            font-size:@font-size-large;
            
        }
    }
</style>