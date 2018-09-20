<template>
    <div class="carousel">
        <!-- <ul :style="{width: ULwidth + 'px'}" v-carousel>
            <li v-for="(item, idx) in mybanner" v-if="idx === (mybanner.length - 1)">
                <a class="bannera" href="" :data-form="item.form" :data-actCode="item.actCode">
                    <img :src="item.banner" alt="">
                </a>
            </li>
            <li v-for="(item, idx) in mybanner">
                <a class="bannera" href="" :data-form="item.form" :data-actCode="item.actCode">
                    <img :src="item.banner" alt="">
                </a>
            </li>
            <li v-for="(item, idx) in mybanner" v-if="idx === 0">
                <a class="bannera" href="" :data-form="item.form" :data-actCode="item.actCode">
                    <img :src="item.banner" alt="">
                </a>
            </li>
        </ul> -->

        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, idx) in mybanner" :key="idx">
                <a :href="'/views/activity/' + path[item.form] + '?actCode=' + item.actCode" class="bannera">
                    <img :src="item.banner" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>

        <!-- <transition-group tag="ul" name="carousel">
            <li v-for="(item, idx) in mybanner" :key="idx" v-show="idx===mark">
                <a href="" class="bannera">
                    <img :src="item.banner" alt="">
                </a>
            </li>
        </transition-group> -->

        <!-- <ul v-lb="{time: 2000}">
            <li class="banner-li" v-for="(item, idx) in mybanner" :key="idx">
                <a href="javascript:;" class="bannera">
                    <img :src="item.banner" alt="">
                </a>
            </li>
        </ul> -->

        <!-- <div class="bullet">
            <span v-for='(item,idx) in mybanner.length' :class="{'active':idx===mark}" @click='change(index)'></span>
        </div> -->
    </div>
</template>
<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    export default {
        name: 'carousel',
        props: ['banner'],
        components: {
            Swipe,
            SwipeItem
        },
        data () {
            return {
                mark: 0,
                mybanner: this.banner,
                len: this.banner.length,
                path: this.actPath.actPath
            }
        },
        created() {
            console.log(this.path)
            // this.play();
            // this.ULwidth = 750 * (this.banner.length + 2);
        },
        methods: {
            // autoPlay() {
            //     this.mark++
            //     if (this.mark === this.len) {
            //         this.mark = 0
            //         return
            //     }
            // },
            // play() {
            //     setInterval(this.autoPlay, 3000)
            // }
        },
        directives: {
            lb: {
                bind: function (el, binding, vnode, oldVnode) {
                    let nodes = el.childNodes, 
                    cur = el.firstChild, 
                    before,
                    next, 
                    interval = binding.value.time,
                    timer,
                    startX,
                    endX,
                    diff = 0;
                    let len = nodes.length;
                    if (len <= 1) return
                    
                    // 轮播图初始化
                    ~function(){
                        cur.classList.add('active', 'show');
                        next = cur.nextElementSibling;
                        next.classList.add('after', 'show');
                    }();

                    timer = setInterval(playFromRight, interval);

                    function playFromRight() {
                        // 动画完成后改变cur, before, next值
                        cur.classList.remove('active');
                        cur.classList.add('before');
                        before = cur;
                        cur = null;
                        
                        next.classList.remove('after');
                        next.classList.add('active');
                        cur = next;
                        next = null;
                        next = cur.nextElementSibling || el.firstChild;

                        // 控制显隐的需要异步处理
                        setTimeout(_=>{
                            before.classList.remove('show', 'before');
                            before = null;
                            next.classList.remove('show');
                        }, interval/3)

                        setTimeout(_=>{
                            next.classList.add('after', 'show');
                        }, interval/2)
                    }

                    function playFromLeft() {
                        

                        before = cur.previousElementSibling || el.lastChild;
                        console.log('before', before);
                        before.classList.add('before');

                        setTimeout(_ => {
                            before.classList.add('show');
                            cur.classList.remove('active');
                            cur.classList.add('next');
                            cur = null;
                            before.classList.add('before')
                        }, interval/3)

                        setTimeout(_ => {

                        }, interval/2)
                    }
                    
                    function pause() {
                        clearInterval(timer);
                        timer = null;
                    }

                    // 绑定touchmove滑动事件
                    el.addEventListener('touchstart', function (e) {
                        // 清除计时器
                        startX = e.changedTouches[0].pageX;
                        console.log('startX', startX);
                        pause()
                    })

                    el.addEventListener('touchmove', function (e) {
                        if (!timer) {
                            // 图片随着左右滑动
                        }
                    })

                    el.addEventListener('touchend', function (e) {
                        endX = e.changedTouches[0].pageX;
                        console.log('endX', endX);
                        diff = endX - startX;
                        if (diff < 100) {
                            playFromRight()
                        } else if (diff > 100) {
                            playFromLeft()
                        }
                        // timer = setInterval(playFromRight, interval);
                    })
                }
            },
            carousel: {
                bind: function (el, binding, vnode, oldVnode) {
                    el.classList.add('flex', 'transition');
                    el.style.transform = 'translateX(-750px)'; // 初始化
                    let w = parseInt(el.style.width);
                    let n = Number(w/750), m = 1;

                    // 向左轮播
                    const carousel = function () {
                        if (m == n) {
                            el.style.transform = 'translateX(-750px)';
                            el.classList.remove('transition');
                            m = 1;
                        } else if (m == 0) {
                            el.style.transform = 'translateX(' + -750 * (n-1) + 'px)';
                            el.classList.remove('transition');
                            m = n-1;
                        } else {
                            el.classList.add('transition');
                            el.style.transform = 'translateX(' + -750 * (m) + 'px)';
                            m++;
                        }
                    }
                    setInterval(()=>{
                        carousel()
                    }, 3000)
                }
            } 
        }
    }
</script>
<style lang="scss" scoped>
    .banner-li {
        display: none;
        transition: all .5s ease;
    }
    .show {
        display: block;
    }
    .active {
        transform: translate3d(0, 0, 0)
    }
    .before {
        transform: translate3d(-100%, 0, 0)
    }
    .after {
        transform: translate3d(100%, 0, 0)
    }
    /* .flex {
        display: flex;
    }
    .transition {
        transition: transform .5s linear;
    } */

    /* 注意顺序不能错乱 */
    .carousel-enter-active {
        transform: translateX(0);
        transition: all 1s ease-in-out;
    }
    .carousel-leave-active {
        transform: translateX(-100%);
        transition: all 1s ease-in-out;
    }
    .carousel-enter {
        transform: translateX(100%)   
    }
    .carousel-leave {
        transform: translateX(0)
    }
    
    .carousel {
        overflow: hidden;
        position: relative;
        width: 750px;  
        height: 270px;
        li {
            position: absolute;
        }
        .bannera {
            display: block;
            img {
                width: 750px;
                height: 270px;
            }
        }
        .mint-swipe-items-wrap {
            .mint-swipe-item {
                img {
                    width: 750px;
                    height: 270px;
                }
            }
        }
    }
    
</style>