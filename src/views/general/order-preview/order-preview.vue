<template>
<div class="order-root">
    <div class="my-order-address">
        <div class="order-address">
            <div class="have-order-address" v-if="haveAddressFlag" @click="handleSelectAddress">
                <div class="order-address-top">
                    <span class="user-name">{{userName}}</span>
                    <span class="user-mobile">{{userMobile}}</span>
                </div>
                <div class="order-address-desc">
                    {{address}}
                </div>
            </div>
            <div class="no-order-address" v-if="noHaveAddressFlag" @click="handleEditAddress">
                新建地址
            </div>
        </div>
        <div class="add-address">
            >
        </div>
    </div>
    <div class="my-good">
        <img class="my-good-img" :src="goodImgUrl" alt=""/>
        <div class="good-desc">
            <span class="good-name">{{goodName}}</span>
            <span class="good-num">数量: 1个</span>
            <span class="good-price">¥{{goodPrice}}</span>
        </div>
    </div>
    <button class="award-get-btn" @click="handleGetGift">确认领取</button>
    <div class="tip-message-con" v-if="msgFlag">
        <div class="tip-con">
            <span class="tip-message">{{msg}}</span>
            <button class="tip-btn" @click="handleCancle">确定</button>
            <button class="btn-close" @click="handleCancle"></button>
        </div>
    </div>
    <div class="tip-message-con" v-if="tipFlag">
        <div class="tip-con">
            <span class="tip-message">{{tipMsg}}</span>
            <button class="tip-btn" @click="goHome">确定</button>
        </div>
    </div>
</div>
</template>
<script>
import {getQueryString} from 'lib/utils.js'
    export default {
        data() {
            return {
                 haveAddressFlag: false,
                 noHaveAddressFlag: false,
                 address: "",
                 addressId: getQueryString("addressId"),
                 userName: "",
                 userMobile: "",
                 addressData: null,
                 giftData: null,
                 goodImgUrl: "",
                 goodName: "",
                 goodPrice: "",
                 index: 0,
                 addressId: "",
                 tipFlag: false,
                 tipMsg: "",
                 msgFlag: false,
                 msg: "",
                 uaId: getQueryString("uaId")
            }
        },
        
        mounted() {
            //this.a = true;
            this.handleInit();
        },
        methods: {
            handleInit() {
                var _this = this;
                _this.Fetch.get(" /user/addr/list").then(res=>{
                    if(res.code==="200") {
                        let data = res.data;
                        if (data == null || data.length == 0) {
                            //没有地址信息；
                            _this.noHaveAddressFlag = true;
                        } else {
                            var addressDetail = {};
                            if(this.addressId == ""){
                                addressDetail = data[0]
                            } else {
                                ddressDetail = data.filter(function(x){
                                    return x === _this.addressId;
                                })[0];
                            }
                            //有地址信息；
                            _this.addressData = addressDetail;
                            _this.userName = addressDetail.name;
                            _this.userMobile = addressDetail.mobile;
                            _this.address = addressDetail.provinceName + addressDetail.cityName + addressDetail.districtName + addressDetail.detail;
                            _this.addressId = addressDetail.id;
                            _this.haveAddressFlag = true;
                        }
                    }
                })
                _this.Fetch.get("/awd/info",{"uaId":this.uaId}).then(res=>{
                    if(res.code === "200") {
                        var data = res.data;
                        _this.giftData = res.data;
                        _this.goodImgUrl = data.awdPic;
                        _this.goodName = data.awdName;
                        _this.goodPrice = data.awdPrice;
                    }
                })
            },
            //选择地址；
            handleSelectAddress() {
                // 跳转到地址列表
                // window.location.href = "../hmenus/shop-address-list.html?myOrder=ture&giftId=" + Lib.getUrlQuery("giftId") + "&addressId="+this.addressId+"&orderPreview=orderPreview&sourceId=" +this.sourceId ;
                alert("跳转到地址列表")
            },
            //编辑地址；
            handleEditAddress() {
                // 跳转到地址编辑页面
                // window.location.href = "../hmenus/shop-add-address.html?myOrder=true&giftId=" + Lib.getUrlQuery("giftId") + "&orderPreview=orderPreview&sourceId=" +this.sourceId;
                alert("跳转到地址编辑页面")
            },
            //领取实物；
            handleGetGift() {
                if(this.noHaveAddressFlag) {
                    this.msg = "请添加收货地址";
                    this.msgFlag = true;
                }
                if(this.haveAddressFlag) {
                    this.Fetch.post("/awd/rcv/goods",{"uaId":this.uaId,"addrId": this.addressData.id}).then(res=>{
                        if(res.code == "200") {
                            //领取成功；
                            this.tipMsg = "领取成功";
                            this.tipFlag = true;
                        } else {
                            //没有领取成功；
                            this.tipMsg = "领取失败";
                            this.tipFlag = true;
                            //alert(res.message);
                        }
                    })
                    // Lib.ajax({
                    //     url: "/award_v2/getgift",
                    //     headers: {
                    //         token: sessionStorage.getItem("token"),
                    //         tokenId: sessionStorage.getItem("tokenId")
                    //     },
                    //     data: {
                    //         activityId: this.giftData.activityCode,
                    //         province: this.addressData.provinceDes.name,
                    //         city: this.addressData.cityDes.name,
                    //         district: this.addressData.districtDes.name,
                    //         mobile: this.addressData.mobile,
                    //         address: this.addressData.address,
                    //         username: this.addressData.username,
                    //         region: this.giftData.awardRegion,
                    //         orderChannel: "SCAN_CODE_CHECK",
                    //         orgCode: this.giftData.orgCode,
                    //         id: this.giftData.id
                    //     },
                    //     success: this.hanldeGetGiftSucc
                    // })
                }

            },
            //回落地页；
            goHome() {
                location.href = "../../views/template001/yz.html?t=" + +new Date();
                // if(Lib.getUrlQuery("fromPage") == "fanpaizhi" && this.tipMsg == "领取成功") {
                //     window.location.href = "/openapi/hebei/hcdf/sjb?id="+this.giftData.id+"&date=" + new Date().getTime();

                // }else {
                    // if(sessionStorage.sn) {
                    //     window.location.href = "hhscan.html?sn="+sessionStorage.sn+"&type="+sessionStorage.type+"&code="+sessionStorage.code+"&from=others"+"&t="+this.tDate;
                    // } else {
                    //     window.location.href = "scan-home.html?t="+this.tDate
                    // }
                // }
                
            },
            //取消弹框；
            handleCancle(){
                 this.msgFlag = false;
            }
        }
    }
</script>
<style>
    .order-root {
        position: absolute;
        left: 0;
        top: 0;
        width: 750px;
        height: 100%;
        background: #eee;
    }
    .my-order-address {
        width: 750px;
        height: 130px;
        background: #fff;
    }

    .order-address {
        box-sizing: border-box;
        padding:20px 0 20px 20px;
        float:left;
        width: calc(100% - 56px);
        height: 130px;

    }
    
    .no-order-address {
        width: 100%;
        height: 100%;
        line-height: 90px;
    }

    .add-address {
        float: right;
        width: 56px;
        height: 130px;
        font-size: 26px;
        color: #888;
        line-height: 130px;
        text-align: center;
    }
    .order-address-top, .order-address-desc{
        width: 100%;
        height: 44px;
        font-size: 26px;
        color: #888;
        line-height: 44px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .user-name {
        display: inline-block;
        width: 90px;
        height: 44px;
        font-size: 26px;
        color: #515151;
        font-weight: 900;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .user-mobile {
        display: inline-block;
        width: 180px;
        height: 44px;
        font-size: 26px;
        color: #515151;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .my-good {
        box-sizing: border-box;
        margin-top: 20px;
        padding: 20px;
        width: 750px;
        height: 200px;
        background: #fff;
    }
    .my-good-img {
        float:left;
        width: 160px;
        height: 160px;
    }
    .good-desc {
        box-sizing: border-box;
        padding-left: 18px;
        float: right;
        width: 550px;
        height: 160px;
    }
    .good-name, .good-num, .good-price{
        display: block;
        width: 100%;
        height: 36px;
        font-size: 26px;
        color: #515151;
        font-weight: 900;
        line-height: 36px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .good-num {
        margin: 25px 0;
        height: 26px;
        line-height: 26px;
        font-weight: 100;
        color: #888;
    }
    .good-price {
        font-weight: 100;
        color: #FF4444;
        text-decoration:line-through;

    }
    .award-get-btn {
        position: absolute;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%);
        display: block;
        width:700px;
        height:88px; 
        background:#FF7200;
        border-radius: 8px;
        font-size: 32px;
        color: #fff;
        line-height: 88px;
        text-align: center;

    }
    /*  */
    .tip-message-con {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    .tip-con {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        width: 640px;
        background: #fff;
        border-radius: 20px;
        padding:40px;
        
    }
    .tip-message {
        margin-bottom: 50px;
        display: block;
        width: 100%;
        height: 100px;
        font-size: 40px;
        line-height: 100px;
        color: #515151;
        text-align: center;

    }
    .tip-btn {
        margin: 0 auto 0;
        display: block;
        width: 560px;
        height:88px; 
        background:#FF7200;
        border-radius: 8px;
        font-size: 32px;
        color: #fff;
        line-height: 88px;
        text-align: center;

    }
    .btn-close {
        position: absolute;
        right: 20px;
        top:20px;
        display: block;
        width: 36px;
        height: 36px;
        background: url(https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/hshop/address/close-icon.png) no-repeat center;
        background-size: 100% 100%; 
        
    }


    
</style>
