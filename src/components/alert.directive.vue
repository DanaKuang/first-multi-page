<template>
    <div id="root">
        <div class="confirm-alert-wrap" v-show= "show">
            <div class="confirm-mask border-box">
                <p class="title">{{constants.title || "提示"}}</p>
                <p class="message">{{constants.msg || "提示"}}</p>
                <div class="btn-middle" v-if="constants.type==='alert' && !constants.flag" @click="close">
                    {{constants.text[0] || "确定"}}
                </div>
                <!-- 定制的 start -->
                 <div class="btn-middle" v-else-if="constants.type==='alert' && constants.flag == '1'" @click="goHome">
                    {{constants.text[0] || "确定"}}
                </div>
                <!-- 定制的 end -->
                <div class="btn-double border-box" v-else-if="constants.type==='confirm'">
                    <div class="btn-left border-box" @click="close">
                        {{constants.text[0] || "确定"}}
                    </div>
                    <div class="btn-right border-box" @click="close">
                        {{constants.text[1] || "取消"}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        name : 'alert',
        data() {
            return {
                show: false
            }
        },
        props: {
            constants: {
                type: Object,
                required: true
            }
        },
        methods: {
            close() {
                var target = event.currentTarget;
                this.show = false;
                if(target.className.indexOf('btn-left')>=0) {
                    this.$emit("getAwardFn")
                    return;
                };
                if(target.className.indexOf('btn-right')>=0) {
                    this.$emit("cancelFn");
                    return;
                }
                if(target.className.indexOf('btn-middle')>=0) {
                    this.$emit("alertFn");
                }
            },
            goHome(){
                location.href = "../../views/template001/yz.html?t=" + +new Date();
            }
        }
    }
</script>
<style type="text/css" lang="scss" scoped>
html {
    #root{
        position: absolute;
        z-index: 300!important;
    }
    .border-box {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .confirm-alert-wrap {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 100!important;
        .confirm-mask {
            width: 620px;
            border-radius: 20px;
            background-color: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            padding: 20px 30px 0;
            .title {
                line-height: 80px;
                text-align: center;
                font-size: 32px;
                font-weight: bolder;
            }
            .message {
                width: 100%;
                text-align: center;
                line-height: 1.5;
                padding-bottom: 50px;
                word-break: break-word;
            }
            .btn-middle {
                width: 590;
                height: 88px;
                line-height: 88px;
                background-color: rgba(255,114,0,1);
                text-align: center;
                color: #fff;
                font-size: 32px;
                margin-bottom: 20px;
            }
            .btn-double {
                width: 100%;
                height: 88px;
                line-height: 88px;
                text-align: center;
                overflow: hidden;
                font-size: 24px;
                .btn-left {
                    width: 50%;
                    border-top: 1px solid gray;
                    float: left;
                    color: rgba(240,108,0,1);
                }
                .btn-right {
                    width: 50%;
                    float: right;
                    border-top: 1px solid gray;
                    border-left: 1px solid gray;
                    color: rgba(68,68,68,1)
                }
            }
        }
    }
}
</style>