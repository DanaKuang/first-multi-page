import 'babel-polyfill'
import Vue from 'vue'

import App from './detail.vue'

import 'assets/common/base'

import Fetch from 'lib/Fetch';
Vue.prototype.Fetch = Fetch;

new Vue({
    render: h => h(App)
}).$mount('#app')
