import 'babel-polyfill'
import Vue from 'vue'
import MintUI from 'mint-ui'

import App from './yz.vue'

Vue.use(MintUI)

import 'assets/common/base'
import Fetch from 'lib/Fetch';
import actPath from './config/path'
Vue.prototype.Fetch = Fetch;
Vue.prototype.actPath = actPath;

new Vue({
    render: h => h(App)
}).$mount('#app')

