<template>
    <div class="progress-bar" ref="progressBar" @click="barClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="touchStart" @touchmove="touchMove" @touchend="touchEnd">
               <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        percent:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            touch:{
                ismove:false
            }
        }
    },
    watch:{
        percent(v){
            if(v >= 0 && !this.touch.ismove){
                let w = this.$refs.progressBar.clientWidth - 16;
                let l = w*v;
                this.barMove(l);
            
                // console.log(w,l)
            }
        }
    },
    methods:{
        barMove(l){
            this.$refs.progress.style.width = `${l}px`
            this.$refs.progressBtn.style.transform = `translate3d(${l}px,0,0)`
        },
        //单击
        barClick(ev){
            let w = ev.pageX - this.$refs.progressBar.offsetLeft;
            this.barMove(w);
            this.sendPercent()
        },
        //进度条拖动按钮
        touchStart(ev){
            this.touch.ismove = true
            //记录当前手指的位置
            this.touch.x1 = ev.touches[0].pageX
            //记录按钮的位置
            this.touch.b1 = this.$refs.progress.clientWidth
        },
        touchMove(ev){
            if(!this.touch.ismove){
                return
            }
            //记录当前手指的位置
            this.touch.x2 = ev.touches[0].pageX
            let w = Math.min(Math.max(0,this.touch.x2 - this.touch.x1 + this.touch.b1),this.$refs.progressBar.clientWidth - 16)
            this.barMove(w)
        },
        touchEnd(){
            this.touch.ismove = false
            this.sendPercent()
        },
        sendPercent(){
            //重新计算百分比
            let w = this.$refs.progressBar.clientWidth - 16;
            let p = this.$refs.progress.clientWidth / w
            this.$emit("changePercent",p)
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
.progress-bar{
    height: 30px;
    .bar-inner{
        position: relative;
        top: 13px;
        height: 4px;
        background: rgba(0, 0, 0,0.3);
        .progress{
            position: absolute;
            height: 100%;
            background: @color-theme;
        }
        .progress-btn-wrapper{
            position: absolute;
            left: -8px;
            top: -13px;
            width: 30px;
            height: 30px;
            .progress-btn{
                position: relative;
                top: 7px;
                left: 7px;
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                border: 3px solid @color-text;
                border-radius: 50%;
                background: @color-theme;
            }
        }
    }
}
</style>