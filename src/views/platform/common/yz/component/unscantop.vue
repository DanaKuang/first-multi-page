<template>
    <!-- 这部分主要是unscantop，因为底部二维码展示模块可以共用 -->
    <div class="abnormal block">
        <div class="unscantop">
            <img class="bg" :src="mycontent.scanbg" alt="">
            <img :src="mycontent.logoimage" alt="" class="logo">
            <p class="logotext">{{mycontent.logotext}}</p>
            <div class="buttonimg" @click="gotoscan"><img :src="mycontent.buttonimg" alt=""></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['content'],
        data () {
            return {
                mycontent: this.content
            }
        },
        methods: {
            gotoscan () {
                
            }
        }
    }
</script>
<style lang="scss">
    .unscantop {
        position: relative;
        padding-top: 84px;
        height: 509px;
        text-align: center;
        box-sizing: border-box;
        .bg {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
        }
        .logo {
            display: block;
            margin: 0 auto 30px;
            width: 217px;
            max-height: 217px;
        }
        .logotext {
            margin-bottom: 53px;
            font-size: 28px;
        }
        .buttonimg {
            margin: 0 auto;
            width: 364px;
            height: 74px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>