<template>
    <!-- 活动模块 -->
    <div class="activity block" v-if="banner.length > 0">
        <carousel :banner="banner" v-if="myContent.chosedImgStyle === 'carousel'"></carousel>
        <ul class="list" v-else>
            <li v-for="(item, idx) in banner" :key="idx">
                <a class="bannera" :href="'/views/activity/' + actPath[item.form] + '?actCode=' + item.actCode">
                    <img :src="item.banner" alt="">
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    import carousel from 'components/carousel';
    export default {
        props: ['content'],
        data () {
            return {
                myContent: this.content,
                actPath: this.actPath
            }
        },
        computed: {
            banner () {
                return this.myContent[0]
            }
        },
        components: {
            carousel
        }
    }
</script>
<style lang="scss">
    .activity {
        overflow: hidden;
        position: relative;
        padding: 0;
        box-sizing: border-box;
        .bg {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: -1;
        }
        .list {
            li {
                margin-top: 20px;
                width: 750px;  
                height:320px;
                .bannera {
                    display: block;
                    width: 750px;
                    height: 270px;
                    img {
                        width: 750px;  
                        height: 270px;
                    }
                }
            }
        }
    }
</style>