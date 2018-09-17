<template>
    <main>
        <div class="fulfilled" v-if="fulfilledFlag">
            <component :is="A" :content="contentA"></component>
            <component :is="B" :content="contentB"></component>
            <component :is="C" :content="contentC"></component>
        </div>

        <div class="unfulfilled" v-if="unfulfilledFlag">
            <unscantop :content="contentM"></unscantop>
            <qrcode :content="contentN"></qrcode>
        </div>

        <nav>
            <ul>
                <li v-for="(item,idx) in navlist">
                    <a :href="item.path">
                        <img :key="idx" :src="item.src" alt="">
                        <span>{{item.name}}</span>
                    </a>
                </li>
            </ul>
        </nav>
    </main>
</template>
<script>
    import navlist from 'assets/data/nav'
    
    // 动态引入组件
    import yz from './component/info'
    import activity from './component/activity'
    import qrcode from './component/qrcode'
    import unscantop from './component/unscantop'

    export default {
        components: {
            yz,
            activity,
            qrcode,
            unscantop
        },
        data () {
            return {
                navlist: navlist,
                fulfilledFlag: false,
                fulfilled: {},
                unfulfilledFlag: false,
                unfulfilled: {},
                A: '',
                contentA: {},
                B: '',
                contentB: {},
                C: '',
                contentC: {},
                contentM: {},
                contentN: {}
            }
        },
        created() {
            Promise.all([
                this.getScanResult(),
                this.getJSON(),
                this.getActivity()
            ]).then(([result, page, actlist]) => {
                var content = JSON.parse(page.conf);
                
                document.title = content.fulfilled.title.name;
                sessionStorage.setItem('info', JSON.stringify(result.data));
                this.fulfilled = content.fulfilled;
                this.unfulfilled = content.unfulfilled;
                delete content.fulfilled.title;
                if (result.code == 200) {
                    this.fulfilledFlag = true;
                    this.showPage(content.fulfilled, true, result.data, actlist.data);
                } else {
                    this.unfulfilledFlag = true;
                    this.showPage(content.unfulfilled, false)
                }
 
            }).catch(e => console.log(e));
        },
        methods: {
            // 调取验真结果
            getScanResult() {
                return new Promise((resolve, reject) => {
                    this.Fetch.get('/scan/checkResult').then(res => {
                        resolve(res)
                    })
                })
            },

            // 获取oss的JSON文件
            getJSON () {
                return new Promise((resolve, reject) => {
                    this.Fetch.get('/tpl/scanCodeCheckConf').then(res => {
                        resolve(res)
                    })
                })
            },

            // 获取活动列表
            getActivity () {
                return new Promise((resolve, reject) => {
                    this.Fetch.get('/act/list', {
                        size: 2
                    }).then(res => {
                        resolve(res)
                    })
                })
            },

            // 处理对应content
            showPage(content, bool, yzCont, actList) {
                // content是按提交的key顺序摆放的
                if (bool) {
                    Object.keys(content).forEach((n, i) => {
                        var _content = content[n];
                        if (i === 0) {
                            this.A = n;
                            this.contentA = this.merge(n, _content, yzCont, actList);
                        } else if (i === 1) {
                            this.B = n;
                            this.contentB = this.merge(n, _content, yzCont, actList);
                        } else if (i === 2) {
                            this.C = n;
                            this.contentC = this.merge(n, _content, yzCont, actList);
                        }
                    })
                } else {
                    this.contentM = content.unscantop;
                    this.contentN = this.fulfilled.qrcode;
                }
            },
            merge(n, _content, yzCont, actList) {
                if (n === 'yz') {
                    return Object.assign({}, _content, yzCont);
                } else if (n === 'activity') {
                    return Object.assign({}, _content, [actList]);
                } else {
                    return _content
                }
            }
        }
    }
</script>
<style lang="scss">
    body {
        overflow-x: hidden;
        width: 100%;
        background: #eee;
    }
    nav {
        overflow: hidden;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        font-size: 20px;
        color: #C8C8C8;
        background: #33302D;
        ul {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            height: 90%;
            li {
                text-align: center;
                a {
                    display: block;
                }
                img {
                    margin: 0 auto 10px;
                    display: block;
                    width: 40px;
                    /* height: 40px; */
                }
            }
        }
    }
    .block {
        margin-bottom: 20px;
    }  
</style>