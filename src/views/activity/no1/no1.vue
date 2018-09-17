<template>
    <div class="main">
        <valiadate-alert v-if="valiadateFlag" @getcode="handleGetCode" @submitcode="handleSubmitCode" :msg="message" @handlecannel="handleCannelBtn"></valiadate-alert>
        <alert-dialog :constants='constants' ref="alert" @alertFn = 'alertFn'></alert-dialog>
        <crCode :codeImg='codeImg' v-if="codeFlag" @codeClose = "codeClose"></crCode>
        <div class="content">
            <img :src="conf.bgImgUrl" class="bg"/>
            <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/jinnao@2x.png" class="jinnao" @click="awardShowFn()"/>
            <img :src="conf.headerImgUrl" class="header" />
            <div class="zuanshi-content">
                <img :src="item.imgUrl" v-for="(item,index) in conf.iconUrl" :key="index" @click="!unbind && drow(index)"/>
                <!-- <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/fzs/zs@2x.png" />
                <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/fzs/zs@2x.png" />
                <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/fzs/zs@2x.png" />
                <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/fzs/zs@2x.png" />
                <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/fzs/zs@2x.png" />
                <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/fzs/zs@2x.png" />
                <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/fzs/zs@2x.png" /> -->
            </div>
            <div class="popup popup-cry" v-show="cryShow">
                <div class="pop-close" @click="close()">X</div>
                <div class="cry-content">
                    <img :src="conf.cryImgUrl" />
                    <p>很遗憾,未中奖</p>
                    <div style="display:none">关注我们</div>
                </div>
            </div>
            <div class="popup popup-draw" v-show="drawShow">
                <div class="pop-close" @click="close()">X</div>
                <div class="draw-content">
                    <img :src="conf.drawImgUrl" />
                    <p>{{drawData.awdName}}</p>
                    <p>{{drawData.prizeName}}</p>
                    <div @click="getGift(drawData)">立即领取</div>
                </div>
            </div>
            <div class="popup popup-my-award" v-show="awardShow">
                <div class="pop-close" @click="close()">X</div>
                <div class="award-title">
                    <div class="activity-description" :class="{current:currentIndex===1}" @click="tab(1)">活动说明</div>
                    <div class="my-award" :class="{current:currentIndex===2}" @click="tab(2)">我的奖品</div>
                </div>
                <div class="square" v-if="currentIndex===1">
                    <!-- <div class="square-title">活动奖品</div>
                    <div class="award-content">
                        <p>一等奖：价值100元礼品</p>
                        <p>一等奖：价值100元礼品</p>
                        <p>一等奖：价值100元礼品</p>
                    </div>
                    <div class="square-title">活动时间</div>
                    <div class="award-content">
                        <p>2018*********************</p>
                    </div> -->
                    <div class="square-title">活动说明</div>
                    <div class="award-content">
                        <p>{{actDesc}}</p>
                    </div>
                </div>
                <div class="my-award-wrap square" v-if="currentIndex===2">
                    <div class="my-award-scroll">
                        <ul>
                            <li v-for="(item,index) in myAwardData" :key="index" @click = "gotoReceive(item)">
                                <div class="top">
                                    <img :src="item.awdPic" />
                                    <div>
                                        <p>{{item.prizeName}}</p>
                                        <p><span :class="item.awdType===1?'line':''">{{item.awdType===6?item.integral:item.awdType===3?'￥'+item.redMoney:item.awdPrice}}</span>*1</p>
                                        <p>{{item.awdType===3?"请在24小时领取":"请在5天内领取"}}</p>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <p>时间：{{item.drawTime}}</p>
                                    <div :class="item.awdStatus === 0?
                                            'receive':item.awdStatus === 1?'received':'expired'">{{item.awdStatus === 1?'订单详情':item.awdStatus === 0?'待领取':'已过期'}}</div>    
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getQueryString} from 'lib/utils.js'
import $ from "jquery"
import valiadateAlert from 'components/valiadate.directive'     //手机号弹框
import alertDialog from 'components/alert.directive'            //alert confirm 弹框
import crCode from 'components/crCode.directive'                //关注二维码弹框
    export default {
        data () {
            return {
                // conf:{"title":"测试","description":"","headerImgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi-header.png","bgImgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi-bg.png","iconUrl":[{"key":1,"imgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png","$$hashKey":"object:153"},{"key":2,"imgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png","$$hashKey":"object:154"},{"key":3,"imgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png","$$hashKey":"object:155"},{"key":4,"imgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png","$$hashKey":"object:156"},{"key":5,"imgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png","$$hashKey":"object:157"},{"key":6,"imgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png","$$hashKey":"object:158"},{"key":7,"imgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png","$$hashKey":"object:159"},{"key":8,"imgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zuanshi.png","$$hashKey":"object:160"}],"awardUrl":[{"imgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zhongjiang74@2x.png"}],"drawImgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/zhongjiang74@2x.png","cryImgUrl":"http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/cry75@2x.png"},
                conf: "",
                cryShow: false,  //谢谢参与弹框
                drawShow: false,   //中奖弹框
                valiadateFlag: false, //电话弹框
                message: "",
                awardShow: false,     //锦囊
                currentIndex:1,
                constants: {
                    "title": "提示",
                    "msg": "",
                    "type": "alert",
                    "text": ["确定"]
                },
                unbind: false,
                actCode: getQueryString("actCode"),
                ticket: "",
                drawData:{},
                myAwardData:[],
                codeImg: "",
                codeFlag: false,
                actDesc:""
            }
        },
        components:{
            valiadateAlert,alertDialog,crCode
        },
        created() {
            this.Fetch.get('/act/info',{"actCode": this.actCode}).then(res => {
                if(res.code == "200") {
                    this.actDesc = res.data.actDesc
                    this.Fetch.get(res.data.confUrl).then(res=>{
                        this.conf = res;
                        document.title = this.conf.title
                    })
                    // this.conf = res.data.confUrl || "http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/test/46140EF854284405ADDB5CAC8234C4C9.json";
                }
            })
        },
        mounted() {
            // 判断能否领奖
            this.Fetch.get("/act/pr/jinfo",{actCode: this.actCode}).then(res=>{
                if(res.code==="200") {
                    if(!res.data.canDraw) {
                        this.$refs.alert.show = true;
                        this.constants = {
                            "title": "提示",
                            "msg": res.data.showMsg,
                            "type": "alert",
                            "text": ["确定"]
                        } ;
                        this.unbind = true;
                        return;
                    }
                    if(res.data.drawed) {
                        this.$refs.alert.show = true;
                        this.constants = {
                            "title": "提示",
                            "msg": res.data.showMsg,
                            "type": "alert",
                            "text": ["确定"]
                        };
                        this.unbind = true;
                        return;
                    }
                    this.ticket = res.data.ticket;
                }
            })
        },
        methods: {
            close: function(){
                this.cryShow = false;
                this.drawShow = false;
                this.awardShow = false;
            },
            handleGetCode: function(m){
                var phone = m.phone;
                this.Fetch.post("/user/bind/svcode",{"mobile":phone}).then(res=>{
                    if(res.code==="200") {
                        console.log("发送成功");
                    } else {
                        this.$refs.alert.show = true;
                        this.constants = {
                            "title": "提示",
                            "msg": res.msg,
                            "type": "alert",
                            "text": ["确定"]
                        } 
                    }
                })
            },
            handleSubmitCode: function(c) {
                var phone = c.phone;
                var code = c.code;
                this.Fetch.post("/user/bind/mobile",{"mobile":phone,"vcode":code}).then(res=>{
                    if(res.code === "200") {
                        console.log("验证成功");
                        this.valiadateFlag = false;
                        this.getGift(this.drawData);
                    } else {
                        this.$refs.alert.show = true;
                        this.constants = {
                            "title": "提示",
                            "msg": res.msg,
                            "type": "alert",
                            "text": ["确定"]
                        } 
                    }
                })
            },
            handleCannelBtn: function() {
                this.valiadateFlag = false;
            },
            drow: function(){
                this.Fetch.get("/act/pr/draw",{"actCode":this.actCode,"ticket":this.ticket}).then(res=>{
                    // code是200data是null    谢谢参与
                        if(res.code==="200"&&res.data===null) {
                            this.cryShow = true;
                            this.unbind = true;
                            return;
                        }
                        if(res.code==="200") {
                            this.drawData = res.data;
                            this.drawShow = true;
                            this.unbind = true;
                        }
                    })
            },
            tab: function(i) {
                this.currentIndex = i;
                if(i==2) {
                    this.actAwdList();
                }
            },
            actAwdList: function() {
                // 用户奖品信息
                this.Fetch.get("/awd/actawd/list",{"actCode":this.actCode,"recordId":0}).then(res=>{
                    if(res.code === "200") {
                        this.myAwardData = res.data;
                    }
                })
            },
            gotoReceive: function(params){
                if(params.awdStatus===0) {
                    this.drawData = params;
                    if(params.awdType != 1) {
                        this.getGift(params)
                    } else {
                        window.location.href = "../general/order-preview.html?uaId="+params.uaId;
                    }
                    return;
                }
                if(params.awdStatus===1) {
                    console.log("订单详情");
                    window.location.href = "../general/gift-detail.html?uaId="+params.uaId;
                    return;
                }


            },
            getGift: function(params){
                console.log(params)
                //awardType 3红包  6积分    1实物
                if(params.awdType ==1) {
                    window.location.href = "../general/order-preview.html";
                }
                if(params.awdType !=1) {
                    this.Fetch.post("/awd/rcv/virtual",{"uaId":params.uaId}).then(res=>{
                        //code 为701时需要绑定手机号
                        if(res.code === "701") {
                            this.close();
                            this.valiadateFlag = true;
                            return;
                        }
                        //code为700时需要关注公号
                        if(res.code === "700") {
                            this.close();
                            this.codeImg  = res.data.qrUrl;
                            this.codeFlag = true;
                            return;
                        }
                        if(res.code === "200") {
                            this.$refs.alert.show = true;
                            this.constants = {
                                "title": "提示",
                                "msg": "领取成功",
                                "type": "alert",
                                "text": ["确定"],
                                "flag": 1
                            } 
                        } else {
                            this.$refs.alert.show = true;
                            this.constants = {
                                "title": "提示",
                                "msg": res.msg,
                                "type": "alert",
                                "text": ["确定"],
                                "flag": 1
                            }
                        }
                    })
                } else {
                    // 中实物跳转
                    alert("中实物");
                }
            },
            alertFn: function(){
                console.log(1)
            },
            awardShowFn: function() {
                this.awardShow = true;
                this.actAwdList();
            },
            codeClose: function(){
                this.codeFlag = false;
            }
        }
    }
</script>
<style lang="scss">
    * {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    @keyframes popup {
        0% { transform: scale(0) }
        40% { transform: scale(1.1) }
        60% { transform: scale(1) }
        80% { transform: scale(.9) }
        100% { transform: scale(1) }
    }
    .content {
        position: absolute;
        width: 100%;
        height: 100%;
        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 10;
        }
        .jinnao {
            position: absolute;
            right: 23px;
            top: 52px;
            width: 78px;
            height: 97px; 
            z-index: 20;
        }
        .header {
            position: absolute;
            width: 702px;
            height: 354px;
            z-index: 20;
            top: 295px;
            left: 50%;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
        }
        .zuanshi-content {
            width: 100%;
            padding: 0 30px;
            position: absolute;
            bottom: 117px;
            left: 50%;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            z-index: 30;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            >img {
                width: 170px;
                height: 153px;
                display: block;
                margin-bottom: 11px;
            }
        }
        .popup {            
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            z-index: 99;
            .pop-close {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 1px solid white;
                color: white;
                line-height: 60px;
                text-align: center;
                font-size: 30px;
                position: absolute;
            }
        }
        .popup-cry {
            .pop-close {
                top: 191px;
                right: 128px;
            }
            .cry-content {
                margin: 373px auto 0;
                text-align: center;
                animation: popup .8s;
                -webkit-animation: popup .8s;
                >img {
                    width: 620px;
                    height: 345px;
                }
                >p {
                    color: white;
                    font-size: 35px;
                    margin-top: 52px;
                }
                >div {
                    width: 289px;
                    height: 73px;
                    background-color: #DB4839;
                    line-height: 73px;
                    margin: 99px auto 0;
                    font-size: 39px;
                    color: white
                }
            }

        }
        .popup-draw {
            .pop-close {
                top: 141px;
                right: 58px;
            }
            .draw-content {
                margin: 206px auto 0;
                text-align: center;
                color: white;
                animation: popup .8s;
                -webkit-animation: popup .8s;
                >img {
                    width: 376px;
                    height: 408px;
                }
                >p {
                    font-size: 44px;
                }
                >div {
                    width: 380px;
                    height: 84px;
                    line-height: 84px;
                    font-size: 38px;
                    background-color: #1B88F9;
                    margin: 77px auto 0;
                }

            }
        }
        .popup-my-award {
            .pop-close {
                top: 102px;
                right: 46px;
            }
            .award-title {
                width: 657px;
                height: 58px;
                text-align: center;
                line-break: 58px;
                background: url(https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/btn-gray@2x.png) no-repeat center;
                background-size: cover;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                top: 179px;
                >div {
                    width: 225px;
                    height: 58px;
                    line-height: 58px;
                    font-size: 30px;
                    color: white;
                    position: absolute;
                }
                .activity-description {
                    left: 76px;
                    top: 0;
                }
                .my-award {
                    right: 76px;
                    top: 0px;
                }
                .current {
                    background:url(https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/btn-active@2x.png) no-repeat center;
                    background-size: cover;
                }
            }
            .square {
                width: 654px;
                height: 611px;
                padding: 49px 51px 34px 39px;
                background: url(https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/square4@2x.png) no-repeat center;
                background-size: cover;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                top: 316px;
                overflow-y: scroll;
                .square-title {
                    width: 164px;
                    height: 52px;
                    text-align: center;
                    line-height: 52px;
                    color: black;
                    background-color: white;
                    margin-bottom: 30px;
                }
                .award-content {
                    >p {
                        font-size: 29px;
                        margin-bottom: 26px;
                        color: white; 
                    }
                }
            }
            .square.my-award-wrap {
                padding: 73px 69px 63px 58px;
                overflow: hidden;
                .my-award-scroll {
                    width: 100%;
                    height: 100%;
                    overflow-y: scroll;
                    li {
                        width: 100%;
                        height: 218px;
                        background: url(https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/866672264961315119.png) no-repeat center;
                        background-size: cover;
                        padding: 30px 15px 13px 21px;
                        position: relative;
                        margin-bottom: 23px;
                        .top {
                            width: 100%;
                            overflow: hidden;
                            >img {
                                width: 88px;
                                height: 93px;
                                float: left;
                            }
                            div {
                                float: left;
                                margin-left: 39px;
                                >p {
                                    margin-bottom: 10px;
                                    font-size: 22px;
                                    color: #888888;
                                    .line {
                                        text-decoration: line-through;
                                    }
                                }
                                >p:nth-of-type(1) {
                                    color: #444444
                                }
                            }
                        }
                        .bottom {
                            width: 90%;
                            overflow: hidden;
                            position: absolute;
                            left: 21px;
                            bottom: 10px;
                            p{
                                float: left;
                                line-height: 37px;
                                font-size: 18px;
                            }
                            >div {
                                float: right;
                                width: 92px;
                                height: 37px;
                                line-height: 37px;
                                font-size: 18px;
                                text-align: center;
                                border-radius: 5px;
                            }
                            .receive {
                                background-color: #FF7200;
                                color: white;
                            }
                            .received,.expired {
                                border: 1px solid #FF7200; /* no*/
                                color: #FF7200;
                            }
                        }
                    }
                }
            }

        }
    }
</style>