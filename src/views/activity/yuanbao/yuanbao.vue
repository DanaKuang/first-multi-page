<template>
    <div>
        <div class="page page1">
            <img class="bg" :src="conf.img.bg.url" alt="">
            <img v-for="(item, index) in conf.img" :key="item.title" :src="item.url" alt="" v-if="['bg', 'award', 'noAward', 'tips', 'title'].indexOf(index) == -1" :class="index">
        </div>
    </div>
</template>
<script>
export default {
  name: "Yuanbao",
  data() {
    return {
      name: "yuanbao",
      conf: JSON.parse(localStorage.conf),
    };
  },
  mounted() {
      let data = '{"title":"","description":"","ratio":0.4,"img":{"yuanbao01":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/yuanbao01.png","width":111,"height":127,"left":41,"top":614,"style":{"max-width":"44px","max-height":"50px","transform":"translate(16px,245px)"},"c-style":{"max-width":"55px","max-height":"63px","transform":"translate(20px,307px)"}},"yuanbao02":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/yuanbao02.png","width":130,"height":146,"left":207,"top":530,"style":{"max-width":"52px","max-height":"58px","transform":"translate(82px,212px)"},"c-style":{"max-width":"65px","max-height":"73px","transform":"translate(103px,265px)"}},"yuanbao03":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/yuanbao03.png","width":123,"height":124,"left":317,"top":409,"style":{"max-width":"49px","max-height":"49px","transform":"translate(126px,163px)"},"c-style":{"max-width":"61px","max-height":"62px","transform":"translate(158px,204px)"}},"yuanbao04":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/yuanbao04.png","width":125,"height":144,"left":348,"top":615,"style":{"max-width":"50px","max-height":"57px","transform":"translate(139px,246px)"},"c-style":{"max-width":"62px","max-height":"72px","transform":"translate(174px,307px)"}},"yuanbao05":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/yuanbao05.png","width":114,"height":112,"left":484,"top":499,"style":{"max-width":"45px","max-height":"44px","transform":"translate(193px,199px)"},"c-style":{"max-width":"57px","max-height":"56px","transform":"translate(242px,249px)"}},"yuanbao06":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/yuanbao06.png","width":147,"height":144,"left":547,"top":604,"style":{"max-width":"58px","max-height":"57px","transform":"translate(218px,241px)"},"c-style":{"max-width":"73px","max-height":"72px","transform":"translate(273px,302px)"}},"bg":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/yuanbao-bg.jpg","width":"100%","height":"100%","left":0,"top":0,"style":{"style":{"max-width":"100%","max-height":"100%","transform":"translate(0px,0px)"},"c-style":{"max-width":"100%","max-height":"100%","transform":"translate(0px,0px)"}}},"title":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/yuanbao-title.png","width":587,"height":244,"left":83,"top":57,"style":{"max-width":"234px","max-height":"97px","transform":"translate(33px,22px)"},"c-style":{"max-width":"293px","max-height":"122px","transform":"translate(41px,28px)"}},"tips":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/JGG_HDJN.png","width":98,"height":103,"left":638,"top":38,"style":{"max-width":"39px","max-height":"41px","transform":"translate(255px,15px)"},"c-style":{"max-width":"49px","max-height":"51px","transform":"translate(319px,19px)"}},"award":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/test/5279354775674C718BC4C6E46A963B72.png"},"noAward":{"url":"https://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/cry75@2x.png"}}}';
      localStorage.setItem('conf', data);
      console.log(JSON.parse(localStorage.conf))
  },
  computed: {
  },
  methods: {}
};
</script>
<style lang="scss">
.page{
    position: absolute;
    & img{
        position: absolute;
    }
}
.page1{
    & .bg{
        position: absolute;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
    }

    .title{
        max-width: 587px;
        height: 244px;
        max-transform: translate(83px, 57px);
    }
    .tips{
        max-width: 98px;
        max-height: 103px;
        transform: translate(638px, 38px);
    }
    .yuanbao01{
        max-width: 111px;
        max-height: 127px;
        transform: translate(41px, 614px);
    }
    .yuanbao02{
        max-width: 130px;
        max-height: 146px;
        transform: translate(207px, 530px);
    }
    .yuanbao03{
        max-width: 123px;
        max-height: 124px;
        transform: translate(317px, 409px);
    }
    .yuanbao04{
        max-width: 125px;
        max-height: 144px;
        transform: translate(348px, 615px);
    }
    .yuanbao05{
        max-width: 114px;
        max-height: 112px;
        transform: translate(484px, 499px);
    }
    .yuanbao06{
        max-width: 147px;
        max-height: 144px;
        transform: translate(547px, 604px);
    }
        @media(min-height: 375px){
        .yuanbao01{
            max-width: 111px;
        max-height: 127px;
        transform: translate(41px, 634px);
        }
    }
}
</style>
