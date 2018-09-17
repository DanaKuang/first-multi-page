<!--是否同意协议政策-->
<template>
    <div>
        <!--验证-->
        <div class="validate">
            <label for=""><input type="checkbox" @click="changeCheck" :checked="isChecked" />我已阅读并同意“<a href="javascript:;" @click="policyShow">验真平台隐私政策</a>”</label>
        </div>

        <!--协议-->
        <policyPage v-if="ifPolicyShow" @policyClose="policyClose"></policyPage>
    </div>
</template>

<script type="text/javascript">
  import policyPage from "components/policyPage.directive.vue"

  export default {
    data() {
      return {
        isChecked: true, // 初始为选中
        ifPolicyShow: false, // 初始隐藏协议页
      }
    },
    components: {
      policyPage
    },
    methods: {
      // 切换选中和不选中
      changeCheck() {
        this.isChecked = !this.isChecked;
        this.$emit('changeCheck', this.isChecked);
      },

      // 协议页，显示
      policyShow() {
        this.ifPolicyShow = true;
      },
      // 协议页，隐藏
      policyClose() {
        this.ifPolicyShow = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
    .validate {
        font-size: 24px;
        margin-top: 27px;
        text-align: center;
        input {
            width: 21px;
            height: 21px;
            border: 1px solid #A5968D;
            float: left;
            margin: 7px 10px 0 0;
            vertical-align: middle;
            -webkit-appearance: checkbox;
        }
        label {
            color: #8F8F8F;
            display: inline-block;
            a {
                color: #0085DA;
            }
        }
    }
</style>