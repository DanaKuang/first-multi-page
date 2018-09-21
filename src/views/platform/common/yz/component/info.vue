<template>
    <!-- 验真模块 -->
    <div class="yz block">
        <img class="bg" :src="mycontent.bg" alt="">
        <a class="producthref" href="/yx-page/views/general/info.html">
            <div class="image">
                <img :src="mycontent.product.bigPic" alt="">
            </div>
            <div class="info">
                <h6 :class="{'active': mycontent.detail}"><span>{{mycontent.orgName}}</span></h6>
                <p class="infos">{{mycontent.checkResult == 1 ? '该码为正确编码' : mycontent.checkResult == 3000 ? '该码疑似假码' : mycontent.checkResult == 3001 ? '该码未激活' : '系统错误'}}</p>
                <p class="infos">首扫时间: {{mycontent.firstScanTime}}</p>
                <p class="infos">扫码次数: {{mycontent.scanCount}}次</p>
            </div>
        </a>
        <p class="tips">本页面含有烟草产品信息,未满18岁请勿继续访问</p>
    </div>
</template>
<script>
    export default {
        name: 'Info',
        props: ['content'],
        data () {
            return {
                mycontent: this.content
            }
        }
    }
</script>
<style lang="scss">
    .yz {
        overflow: hidden;
        position: relative;
        padding: 30px 20px 20px;
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
    .yz {
        height: 320px;
        box-shadow: 0 1px 1px 1px rgba(0,0,0,.03);
        .producthref {
            display: block;
        }
        .info {
            display: table-cell;
            vertical-align: middle;
            min-width: 520px;
            padding-left: 35px;
            height: 100%;
            h6 {
                margin-bottom: 12px;
                line-height: 2.5;
                color: #010101;
            }
            h6.active {
                span {
                    position: relative;
                    display: inline-block;
                    font-size: 38px;
                    line-height: 38px;
                    &:after {
                        content: '详情';
                        position: absolute;
                        right: -76px;
                        top: 2px;
                        padding: 6px 15px 2px;
                        line-height: 1.2;
                        font-size: 20px;
                        font-weight: normal;
                        color: #333;
                        border: 1px solid #666;
                        border-radius: 4px;
                    }
                }
            }
            .infos {
                margin-bottom: 10px;
                font-size: 28px;
                line-height: 1.5;
                color: #333333;
            }
        }
        .image {
            display: table-cell;
            vertical-align: middle;
            width: calc(100% - 620px);
            text-align: center;
            img {
                display: inline-block;
                width: 90%;
            }
        }
        .tips {
            position: relative;
            margin: 16px auto 0 50px;
            text-align: center;
            line-height: 1.2;
            font-size: 20px;
            color: #5D5A5A;
            &:before {
                content: '!';
                margin-right: 5px;
                display: inline-block;
                border-radius: 50%;
                width: 28px;
                height: 28px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                color: #fff;
                background: #999;
            }
        }
    }
</style>