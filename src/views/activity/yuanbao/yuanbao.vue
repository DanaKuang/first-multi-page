<template>
    <div>
      <validate-alert v-if="valiadateFlag" @getcode="handleGetCode" @submitcode="handleSubmitCode" :msg="message" @handlecannel="handleCannelBtn"></validate-alert>
        <alert-dialog :constants='constants' ref="alert" @alertFn = 'alertFn'></alert-dialog>
        <crCode :codeImg='codeImg' v-if="codeFlag" @codeClose = "codeClose"></crCode>
        <div class="page page1">
            <img :src="conf.img.bg.url" class="bg" alt="">
            <img :src="conf.img.title.url" alt="" class="title">
            <img :src="conf.img.tips.url" alt="" class="tips" @click="state.page = 2, state.tab = 1">
            <img v-for="(item, index) in conf.img" :key="item.title" :src="item.url" alt="" v-if="['bg', 'award', 'noAward', 'tips', 'title'].indexOf(index) == -1" :class="index" @click="draw(index)">
        </div>
        <!-- 第二页 => 活动说明页 -->
        <div class="page page-cover page2" v-if="state.page == 2">
            <div class="close" @click="state.page = 1"><span>×</span></div>
            <div class="page-tab">
                <div class="tab tab1" :class="{'bg-gray': state.tab == 1}" @click="state.tab = 1"><span>活动说明</span></div>
                <div class="tab tab2" :class="{'bg-gray': state.tab == 2}" @click="getMyAward"><span>我的奖品</span></div>
            </div>
            <div class="container">
                <div class="notes-container" v-if="state.tab == 1">
                    <div class="notes-title"><span>活动说明</span></div>
                    <p class="notes-content" v-for="(item, index) in notes" :key="item+index">{{item}}</p>
                </div>
                <div class="award-container" v-if="state.tab == 2">
                    <div class="award-item" v-if="myAward"  v-for="(item,index) in myAward" :key="index" @click = "gotoReceive(item)">
                        <div class="award-info">
                            <div class="award-pic">
                              <img :src="item.awdPic || conf.img.award.url" alt="">
                            </div>
                            <div class="award-info-content">
                                <h3>{{item.prizeName}}</h3>
                                <div v-if="item.awdType == 1" class="price"><span>￥</span><span>{{item.awdPrice}}</span><span> x1</span></div>
                                <div v-if="item.awdType == 3" class="price"><span>金额：{{item.redMoney || 0}}</span></div>
                                <div class="end-time">请在{{item.expireTime}}前领取</div>
                            </div>
                            <div class="right"><img src="https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/right-arrow.png" alt=""></div>
                        </div>
                        <div class="award-status">
                            <p>
                                <span>中奖时间:</span>
                                <span>{{item.drawTime}}</span>
                            </p>
                            <p><span>{{item.awdStatus == 0 ? "待领取" : "订单详情"}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 第三页 => 中奖/未中奖页 -->
        <div class="page page-cover page3" v-if="state.page == 3">
            <div class='close' @click="state.page = 1">×</div>
            <div v-if="state.award == true">
              <img class="award-title" src="https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/award-text.png" alt="">
              <div class="award-img"><img :src='drawData.awdPic' alt=""></div>
              <!-- <img class="award-shine" src="https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/award-shine.png" alt=""> -->
              <p class="award-name"><span>{{drawData.prizeName}}</span></p>
              <p class="get-award-tips">请在{{drawData.expireTime}}前领取</p>
              <button class="get-btn" @click="gotoReceive(drawData)">立即领取</button>
            </div>
            <div class="no-award" v-if="state.award == false">
              <img class="no-award" :src="conf.img.noAward.url" alt="">
              <p><span>很遗憾，未中奖</span></p>
              <button @click="state.page = 1">知道了！</button>
            </div>
        </div>
        <!-- 第四页 => 活动说明页 -->
        <div class="page page-cover page4" v-if="state.page == 4"></div>
        <!-- 第五页 => 活动说明页 -->
        <div class="page page5" v-if="state.page == 5"></div>
    </div>
</template>
<script>
//ACT-2PE2C11NS2S5
import { getQueryString } from "lib/utils.js";
import $ from "jquery";
import validateAlert from "components/valiadate.directive"; //手机号弹框
import alertDialog from "components/alert.directive"; //alert confirm 弹框
import crCode from "components/crCode.directive"; //关注二维码弹框
  export default {
    data() {
      return {
        conf: "",
        state: { page: 1, tab: 1, award: false },
        notes: [
          "1. 每个包装打开后扫描二维码，每个二维码仅能参加一次活动。",
          "2. 每位用户每场仅限参与1次，活动倒计时完毕后，活动页面将开始掉落红包，点击红包中奖。",
          "3. 奖品为鼓励金，金额自1.88-188.00元不等，随机抽取红包中奖。",
          "4. 每场红包雨120分钟，120分钟后活动结束。",
          "5. 鼓励金发放完毕后红包雨活动将结束。",
          "6. 红包领取成功后直接转账到微信钱包，到账时间为点击领取后30分钟之内。",
          "7. 本次活动在法律法规范围内的解释权归属于本平台所有。"
        ],
        actCode: getQueryString("actCode"),
        valiadateFlag: false,
        constants: {
          title: "提示",
          msg: "",
          type: "alert",
          text: ["确定"]
        },
        codeFlag: false,
        canDraw: false,
        myAward: null,
        ticket: "",
        drawData: "",
        message: ""
      };
    },
    components: {
      alertDialog,
      validateAlert,
      crCode
    },
    created() {
      this.Fetch.get("/act/info", { actCode: this.actCode }).then(res => {
        if (res.code == "200") {
          this.actDesc = res.data.actDesc;
          this.Fetch.get(res.data.confUrl).then(res => {
            this.conf = res;
            document.title = this.conf.title;
          });
        }
      });
    },
    mounted: function() {
      setTimeout(() => {
        this.getJinfo();
      }, 100);
    },
    computed: {},
    methods: {
      getJinfo() {
        let _this = this;
        this.Fetch.get("/act/pr/jinfo", { actCode: this.actCode }).then(res => {
          if (res.code === "200") {
            if (!res.data.canDraw) {
              this.$refs.alert.show = true;
              this.constants = {
                title: "提示",
                msg: res.data.showMsg,
                type: "alert",
                text: ["知道了！"]
              };
              this.canDraw = false;
              return;
            }
            if (res.data.drawed) {
              this.$refs.alert.show = true;
              this.constants = {
                title: "提示",
                msg: res.data.showMsg,
                type: "alert",
                text: ["知道了！"]
              };
              this.canDraw = false;
              return;
            }
            this.canDraw = true;
            this.ticket = res.data.ticket;
          }
        });
      },
      draw(who) {
        if (!this.canDraw) {
          //不要贪心哦\n此二维码已参加活动，请重新扫码
          this.$refs.alert.show = true;
          this.constants = {
            title: "提示",
            msg: "不要贪心哦\n此二维码已参加活动，请重新扫码",
            type: "alert",
            text: ["知道了！"],
            flag: 1
          };
          return;
        }
        this.Fetch.get("/act/pr/draw", {
          actCode: this.actCode,
          ticket: this.ticket
        }).then(res => {
          // code是200data是null    谢谢参与
          if (res.code === "200" && res.data === null) {
            this.state.page = 3;
            this.state.award = false;
            return;
          }
          if (res.code === "200") {
            this.drawData = res.data;
            this.state.page = 3;
            this.state.award = true;
          }
          if (res.code === "500") {
            this.getJinfo();
          }
        });
      },
      getMyAward: function() {
        this.state.tab = 2;
        // 用户奖品信息
        this.Fetch.get("/awd/actawd/list", {
          actCode: this.actCode,
          recordId: 0
        }).then(res => {
          if (res.code === "200") {
            this.myAward = res.data;
          }
        });
      },
      gotoReceive: function(params) {
        if (params.awdStatus === 0) {
          this.drawData = params;
          if (params.awdType != 1) {
            this.getGift(params);
          } else {
            window.location.href =
              "../general/order-preview.html?uaId=" + params.uaId;
          }
          return;
        }
        if (params.awdStatus === 1) {
          window.location.href =
            "../general/gift-detail.html?uaId=" + params.uaId;
          return;
        }
      },
      getGift: function(params) {
        //awardType 3红包  6积分    1实物
        if (params.awdType == 1) {
          window.location.href = "../general/order-preview.html";
        }
        if (params.awdType != 1) {
          this.Fetch.post("/awd/rcv/virtual", { uaId: params.uaId }).then(res => {
            //code 为701时需要绑定手机号
            if (res.code === "701") {
              this.state.page = 1;
              this.valiadateFlag = true;
              return;
            }
            //code为700时需要关注公号
            if (res.code === "700") {
              this.state.page = 1;
              this.codeImg = res.data.qrUrl;
              this.codeFlag = true;
              return;
            }
            if (res.code === "200") {
              this.$refs.alert.show = true;
              this.constants = {
                title: "提示",
                msg: "领取成功",
                type: "alert",
                text: ["确定"],
                flag: 1
              };
            } else {
              this.$refs.alert.show = true;
              this.constants = {
                title: "提示",
                msg: res.msg,
                type: "alert",
                text: ["确定"],
                flag: 1
              };
            }
          });
        } else {
          // 中实物跳转
          alert("中实物");
        }
      },
      alertFn() {
        this.canDraw = false;
        this.$refs.alert.show = false;
      },
      handleGetCode: function(m) {
        var phone = m.phone;
        this.Fetch.post("/user/bind/svcode", { mobile: phone }).then(res => {
          if (res.code === "200") {
            console.log("发送成功");
          } else {
            this.$refs.alert.show = true;
            this.constants = {
              title: "提示",
              msg: res.msg,
              type: "alert",
              text: ["确定"]
            };
          }
        });
      },
      handleSubmitCode: function(c) {
        var phone = c.phone;
        var code = c.code;
        this.Fetch.post("/user/bind/mobile", { mobile: phone, vcode: code }).then(
          res => {
            if (res.code === "200") {
              console.log("验证成功");
              this.valiadateFlag = false;
              this.getGift(this.drawData);
            } else {
              this.$refs.alert.show = true;
              this.constants = {
                title: "提示",
                msg: res.msg,
                type: "alert",
                text: ["确定"]
              };
            }
          }
        );
      },
      handleCannelBtn: function() {
        this.valiadateFlag = false;
      }
    }
  };
</script>
<style lang="scss">
$tabBg: "https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/yuanbao-tab-bg.png";
$tabConBg: "https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/btn-gray@2x.png";
$rightArrow: "https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/right-arrow.png";
$noteConBg: "https://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/square4@2x.png";
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  & img {
    position: absolute;
  }
  .close {
    width: 50px;
    height: 50px;
    border: 2px solid white;
    border-radius: 50%;
    color: white;
    font-size: 50px;
    font-weight: normal;
    line-height: 0;
    box-sizing: border-box;
    padding: 22px 8px;
    margin-top: 120px;
    margin-left: 613px;
  }
}
.page-cover {
  background: rgba(0, 0, 0, 0.8);
}
.page1 {
  & .bg {
    position: absolute;
    height: 1210px;
    // object-fit: cover;
  }

  .title {
    max-width: 587px;
    height: 244px;
    transform: translate(83px, 57px);
  }
  .tips {
    max-width: 98px;
    max-height: 103px;
    transform: translate(638px, 38px);
  }
  .yuanbao01 {
    max-width: 111px;
    max-height: 127px;
    transform: translate(41px, 614px);
  }
  .yuanbao02 {
    max-width: 130px;
    max-height: 146px;
    transform: translate(207px, 530px);
  }
  .yuanbao03 {
    max-width: 123px;
    max-height: 124px;
    transform: translate(317px, 409px);
  }
  .yuanbao04 {
    max-width: 125px;
    max-height: 144px;
    transform: translate(348px, 615px);
  }
  .yuanbao05 {
    max-width: 114px;
    max-height: 112px;
    transform: translate(484px, 499px);
  }
  .yuanbao06 {
    max-width: 147px;
    max-height: 144px;
    transform: translate(547px, 604px);
  }
}
.page2 {
  padding: 0 46px;
  box-sizing: border-box;
  .page-tab {
    height: 58px;
    color: white;
    background: url($tabConBg) no-repeat center;
    background-size: 100%, 100%;
    margin-top: 32px;
    .tab {
      font-size: 30px;
      margin-left: 77px;
      width: 225px;
      height: 58px;
      display: flex;
      float: left;
      span {
        margin: auto;
      }
    }
    .tab2 {
      margin-left: 50px;
    }
    .bg-gray {
      background: url($tabBg) no-repeat center;
      background-size: 100% 100%;
    }
  }
  .container {
    width: 654px;
    height: 611px;
    overflow: scroll;
    margin-top: 80px;
    padding: 50px 34px 40px 36px;
    box-sizing: border-box;
    background: url($noteConBg) no-repeat center;
    background-size: 100% 100%;
    .notes-container {
      .notes-title {
        width: 164px;
        line-height: 0;
        box-sizing: border-box;
        padding: 26px 0;
        text-align: center;
        border-radius: 5px;
        background: white;
        font-size: 30px;
        font-weight: bold;
      }

      .notes-content {
        color: white;
        font-size: 24px;
        padding: 4px;
      }
      .notes-content:nth-of-type(1) {
        margin-top: 38px;
      }
    }
    .award-container {
      & img {
        position: static;
      }
      .award-item {
        width: 526px;
        height: 218px;
        background: white;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        box-sizing: border-box;
        border-radius: 6px;
        padding: 20px;
        .award-info {
          display: flex;
          justify-content: space-between;
          height: 90%;
          .award-pic {
            width: 94px;
            height: 94px;
            padding: 6px;
            box-sizing: border-box;
            margin: auto;
            & img {
              max-width: 100%;
              max-width: 100%;
            }
          }
          .award-info-content {
            width: 280px;
            margin: auto;
            & h3 {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 22px;
            }
            .price,
            .end-time {
              color: #888888;
              font-size: 18px;
              & span:nth-of-type(2) {
                text-decoration: line-through;
              }
            }
          }
          .right {
            width: 60px;
            margin: auto;
            & img {
              width: 60px;
              height: 60px;
            }
          }
        }
        .award-status {
          padding-top: 10px;
          border-top: 2px dashed #bdbdbd;
          display: flex;
          color: #888888;
          font-size: 18px;
          & p:nth-of-type(2) {
            width: 30%;
            color: black;
            text-align: right;
          }
        }
      }
    }
  }
}
.page3 {
  overflow: hidden;
  & img {
    position: static;
    display: block;
  }
  .award-title {
    display: block;
    width: 313px;
    height: 78px;
    margin: 0 auto;
  }
  .award-img {
    width: 100%;
    min-height: 410px;
    margin: 47px auto 0 0px;
    position: absolute;
    display: flex;
    z-index: 1;
    & img{
      max-width: 60%;
      max-height: 100%;
      margin: auto;
    }
  }
  .award-shine {
    position: absolute;
    top: 200px;
    left: 20px;
    width: 673px;
    height: 686px;
    // animation: shine 1s infinite linear;
  }
  .award-name,
  .get-award-tips,
  .get-btn {
    position: absolute;
    color: white;
    text-align: center;
  }
  .award-name {
    font-size: 44px;
    width: 100%;
    top: 838px;
  }
  .get-award-tips {
    font-size: 28px;
    width: 100%;
    top: 920px;
  }
  .get-btn {
    background: #1b88f9;
    width: 344px;
    height: 84px;
    left: 203px;
    top: 1004px;
    font-size: 38px;
    border-radius: 6px;
  }
  .no-award {
    color: white;
    text-align: center;
    & img {
      display: inline-block;
      max-width: 620px;
      max-height: 345px;
      margin-top: 120px;
    }
    & p {
      font-size: 35px;
      margin-top: 52px;
    }
    & button {
      width: 290px;
      height: 74px;
      margin-top: 100px;
      font-size: 40px;
      color: #fdffda;
      background-color: #db4839;
    }
  }
}
</style>
