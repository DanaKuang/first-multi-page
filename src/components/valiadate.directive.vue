<template>
     <div class="valiadate_wrap" style="z-index:40">
        <div class="tel border-box">
            <img src="../static/home_close.png" class="close" @click="handleCannelBtn"/>
            <p>验证手机</p>
            <div class="login_tel border-box">
                <input type="tel" placeholder="手机号" id="telephone" class="code" ref="phone" @input="handleValidate">
                <div class="tel-err" ref="telErr">*请填写正确手机号</div>
            </div>

            <div class="login_tel message border-box">
                <input type="tel" placeholder="验证码" class="code" id="yan" ref="code" @input="handleValidate">
                <button class="send gray_btn" @click="handleGetCode" :disabled="disFlag">获取验证码</button>
                <div class="yan-err" ref="yan-err" v-if="msg==='0'">*验证码不能为空</div>
                <div class="yan-err" v-else-if="msg==='2'">*验证码不匹配</div>
                <div class="yan-err" else="msg==='1'"></div>
                <div ref="err-con" v-if="errFlag">
                    <div class="yan-err" ref="yan-err" v-if="yzm==='0'">*验证码不能为空</div>
                    <div class="yan-err" v-if="yzm==='2'">*验证码不匹配</div>
                    <div class="yan-err" v-if="yzm==='1'"></div>
                </div>
            </div>

            <!--协议政策-->
            <!-- <agreePolicy @changeCheck="changeCheck"></agreePolicy> -->

            <button class="verify" @click="handleSubmit" :disabled="confirmBtnStatus">确认</button>
        </div>
    </div>
</template>
<script type="text/javascript">
    // import agreePolicy from "components/agreePolicy.directive.vue"

    export default {
        props: [
            'msg'
        ],
        components: {
        //   agreePolicy
        },
        data() {
            return {
                count: 0,
                phone: "",
                code: "",
                reg: /^1[34578]\d{9}$/,
                codeReg: /^(\d)*$/,
                yzm: "",
                errFlag: false,
                disFlag: false,
                confirmBtnStatus: false, // 同意协议后按钮可点击
            }

        },
        methods: {
            // 勾选同意协议后，按钮可用；否则不可用
            changeCheck(status) {
                if(status) {
                    this.confirmBtnStatus = false;
                } else {
                    this.confirmBtnStatus = true;
                }
            },

            handleGetCode() {
                this.disFlag = true;
                let that = this,
                countInter = null;
                let $btn = event.target;
                this.$data.count = 59;
                var phone = this.$refs.phone.value;

                if(!this.reg.test(this.phone)){
                    this.$refs.telErr.style.display="block";
                    this.disFlag = false;
                }else{
                    this.$refs.telErr.style.display="none";
                    $btn.innerText = "重新发送(60)";
                    countInter = setInterval(function() {
                        $btn.innerText = "重新发送(" + that.$data.count-- + ")";

                        if (!that.$data.count) {
                        clearInterval(countInter);
                        countInter = null;
                        that.disFlag = false;
                        $btn.innerText = "获取验证码";
                        }
                    }, 1000);
                    this.$emit("getcode",{phone})
                }
            },
            handleValidate() {
                this.phone = this.$refs.phone.value;
                this.code = this.$refs.code.value;
                //console.log(this.phone,this.code);
                //手机验证；
                if(this.reg.test(this.phone)){
                    //手机验证成功；
                    this.$refs.telErr.style.display="none";

                }else{
                    this.$refs.telErr.style.display="block";
                }
                if(this.codeReg.test(this.code)) {
                    this.errFlag = false;
                    this.yzm = "1";
                }else{
                    if(this.code){
                        this.errFlag = true;
                        this.yzm = "2";
                    }

                }

            },
            handleSubmit() {
                var phone = this.phone;
                var code = this.code;
                var msg = this.msg;
                //console.log(this.code);
                if(!this.reg.test(this.phone)){
                    this.$refs.telErr.style.display = "block";
                    //this.$refs.errCon.style.display = "none";

                }else{
                    this.errFlag = true;
                    if(!this.code) {
                        //验证码为空；
                        this.yzm = "0";
                    }else if(!this.codeReg.test(this.code)){
                        //验证码验证不正确；
                        //console.log("验证码验证不正确");
                        this.yzm = "2"

                    }else{
                        //手机号，和验证码验证正确；
                        this.$emit("submitcode",{phone,code})
                        //console.log("手机号，和验证码验证正确")
                    }
                }
                //this.$refs.yanErr.style.display = "block";




            },
            handleCannelBtn() {
                this.$emit("handlecannel")
            }
        }
    }
</script>
<style lang="scss" scoped>
    //验证手机弹框
    .valiadate_wrap {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .6);
        z-index: 40;
    }
    .valiadate_wrap .tel {
        width: 620px;
        height: 600px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 99;
        background-color: #ffffff;
        border-radius: 20px;
        padding: 34px 18px 44px;
    }
    .tel .close {
        width: 36px;
        height: 36px;
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .tel > p {
        font-size: 36px;
        color: #333333;
        text-align: center;
        font-weight: bolder;
        height: 110px;
    }
    .login_tel {
        padding-bottom: 20px;
        border-bottom: 1px solid gray;
    }
    .login_tel input {
        height: 44px;
        outline: none;
        display: block;
        font-size: 36px;
        color: #666666;
    }
    // input::-webkit-input-placeholder {
    //     color: #e5e5e5;
    // }

    // :-moz-placeholder {
    //     color: #e5e5e5;
    // }

    // ::-moz-placeholder {
    //     color: #e5e5e5;
    // }

    // :-ms-input-placeholder { /* Internet Explorer 10+ */
    //     color: #e5e5e5;
    // }
    .tel-err,.yan-err {
        margin-top: 13px;
        font-size: 24px;
        color: #C7000B;
        display: none;
    }
    .yan-err {
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
    }
    .tel .message {
        height: 98px;
        padding-top: 10px;
        overflow: hidden;
        position: relative;
    }

    .tel .message .code {
        width: 308px;
        height: 65px;
        line-height: 65px;
        float: left;
    }
    .login_tel .send {
        width: 220px;
        height: 35px;
        background: none;
        line-height: 35px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -18px;
        text-align: center;
        font-size: 28px;
        color: #444444;
        border-left: 1px solid gray;
    }
    .verify {
        width: 593px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        color: white;
        font-size: 36px;
        position: absolute;
        left: 50%;
        margin-left: -297px;
        bottom: 37px;
        background: linear-gradient(to bottom,#FF9500,#FF7200);
        border-radius: 8px;
        &:disabled {
            background: #b5b5b5;
        }
    }

</style>