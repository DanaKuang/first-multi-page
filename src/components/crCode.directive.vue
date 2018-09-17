<template>
    <div id = "root">
        <div class="code-wrap">
            <img src="../static/home_close.png" class="close" @click="codeClose"/>
            <img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/code-title@2x.png" class="title"/>
            <img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/hand.png" class="hand"/>
            <img :src="codeImg" class="code"/>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: {
        codeImg: {
            type: String,
            required: true
        }
    },
    methods:{
        codeClose() {
             this.$emit("codeClose")
        }
    }
}
</script>
<style lang="scss" scoped>
    .code-wrap {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        z-index: 99;
        .close {
            width: 60px;
            height: 60px;
            position: absolute;
            top: 61px;
            right: 58px;
        }
        .title {
            width: 731px;
            height: 315px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 163px;
        }
        .hand {
            width: 747px;
            height: 885px;
            position: absolute;
            bottom: 0;
            left: 0px;
        }
        .code {
            position: absolute;
            width: 143px;
            height: 143px;
            bottom: 400px;
            left: 323px;
        }
    }
</style>

