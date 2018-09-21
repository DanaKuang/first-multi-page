<template>
    <div class="qr">
        <img class="bg" :src="myContent.bg" alt="">
        <div class="image qrimg">
            <img :src="myContent.img" alt="">
        </div>
        <p class="qrtext">关注公众号<em>"{{myContent.qrname}}"</em> {{myContent.qrtext}}</p>
    </div>
</template>
<script>
    export default {
        props: ['content'],
        data () {
            return {
                myContent: this.content
            }
        }
    }
</script>
<style lang="scss">
    .qr {
        overflow: hidden;
        position: relative;
        padding: 20px;
        box-sizing: border-box;
        .bg {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
        }
    }
    .qr {
        padding-top: 70px;
        height: 449px;
        .image {
            margin: 0 auto;
            width: 238px;
            height: 238px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .qrtext {
            margin-top: 30px;
            text-align: center;
            color: #010101;
            font-size: 30px;
            em {
                color: #CE260A;
            }
        }
    }
</style>
