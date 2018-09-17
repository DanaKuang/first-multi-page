<template>
    <main>
        <div class="top">
            <h4>{{product.product && product.product.name}}</h4>
            <p class="infos">{{product.orgName}}</p>
        </div>
        <div class="bottom">
            <div class="image">
                <img :src="product.product && product.product.bigPic" alt="">
            </div>
            <div class="text">
                <h6>基本信息</h6>
                <p class="infos">类型:  {{subinfo.typeName}}</p>
                <p class="infos">烟支规格:  {{subinfo.pack == 1 ? '盒' : '条'}}</p>
                <p class="infos">焦油含量:  {{subinfo.oil}}mg</p>
                <p class="infos">烟气一氧化碳量:    {{subinfo.carbonMonoxide}}mg</p>
                <p class="infos">烟气烟碱量:    {{subinfo.nicotine}}mg</p>
            </div>
            
        </div>
    </main>
</template>
<script>
    export default {
        data () {
            return {
                product: JSON.parse(sessionStorage.getItem('info')) || {},
                subinfo: {}
            }
        },
        created () {
            this.getDetail().then(({data}) => {
                this.subinfo = data;
            })
        },
        methods: {
            getDetail() {
                return this.Fetch.get('/scan/product/detail')
            }
        }
    }
</script>
<style lang="scss">
    body {
        background: #eee;
        .top, .bottom {
            margin-bottom: 20px;
            padding: 30px 20px 30px 50px;
            background: #fff;
        }
        h4 {
            font-size: 42px;
            line-height: 2;
        }
        h6 {
            margin-bottom: 20px;
            font-size: 32px;
            line-height: 2;
        }
        .image {
            margin-top: 20px;
            float: right;
            margin-right: 60px;
            img {
                height: 320px;
            }
        }
        .infos {
            line-height: 2;
            font-size: 28px;
            color: #818181;
        }
    }
</style>