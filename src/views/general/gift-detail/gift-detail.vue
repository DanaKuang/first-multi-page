<template>
    <div id="root">
        <div class="detail-wrap border-box">
            <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/gift/person-header-bg.png" class="header-bg"/>
            <div class="detail-content">
                <!-- <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/gift/detail_red_packet.png" class="red-packet" v-if="data.awardType===3"/>
                <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_hebei/img/gift/score_big.png" class="score-img" v-else-if="data.awardType===6"/> -->
                <img :src="data.ua.awdPic" class="red-packet" />
                <p class="title">{{data.ua.awdName}}{{data.ua.awdType===6 ?"": data.ua.giveIntegral===0 ? "" : "+"+data.ua.giveIntegral+"积分"}}</p>
                <p class="money">{{data.ua.awdType===6?"":"￥"}}<span class="line">{{data.ua.awdType===6?data.ua.integral:data.ua.awdPrice}}</span>*1</p>
                <div class="detail-wrap border-box">
                    <p class="detail"><span>订单编号：</span>{{data.uo.orderCode}}</p>
                    <p class="detail"><span>中奖时间：</span>{{data.ua.drawTime}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {getQueryString} from 'lib/utils.js'
    export default {
        data() {
            return {
                data: {}
            }
        },
        created() {
            // Lib.ajax({
            //     url: '/award_v2/giftDetail',
            //     metood: "post",
            //     data: {
            //         id: Lib.getUrlQuery('awardCode')
            //     },
            //     success: res => {
            //         if (res.ret === '200000') {
            //             this.data = res.data;
            //         }
            //     }
            // });
            this.Fetch.get("/awd/order/info",{"uaId": getQueryString("uaId")}).then(res=>{
                    if(res.code === "200") {
                        this.data= res.data
                    }
            })
        },
        components: {
            
        },
        methods: {
            lessTen(m) {
                return m<10? "0"+m:m
            },
            format(shijianchuo){
                //shijianchuo是整数，否则要parseInt转换
                var time = new Date(shijianchuo);
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                return y+'-'+this.lessTen(m)+'-'+this.lessTen(d)+' '+this.lessTen(h)+':'+this.lessTen(mm)+':'+this.lessTen(s);
            }
        }
    }
</script>
<style type="text/css" lang="scss">
    * {
        margin: 0;
        padding: 0;
    }
    .border-box {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .detail-wrap {
        width: 100%;
        min-height: 260px;
        text-align: center;
        position: relative;
        .header-bg {
            position: absolute;
            width: 100%;
            height: 260px;
            left: 0;
            top: 0;
            z-index: 10;
        }
        .detail-content {
            position: absolute;
            width: 100%;
            top: 81px;
            left: 0;
            z-index: 20;
            img {
                width: 183px;
                height: 249px;
            }
            .red-packet {
                width: 388px;
                height: 250px;
            }
            .score-img {
                width: 330px;
                height: 330px;
            }
            .title {
                font-size: 34px;
                color:rgba(53,150,141,1);
                padding: 33px 0 24px;
                font-weight: bolder;
            }
            .money {
                color:rgba(65,181,170,1);
                font-size: 30px;
                margin-bottom: 40px;
            }
            .detail-wrap {
                padding-left: 56px;
                text-align: left;
                p {
                    line-height: 70px;
                    font-size: 24px;
                }
            }
        }
}
</style>

