import Vue from 'vue'
import App from './gift-detail.vue'

import 'assets/common/base'
import 'lib/flexible'
import Fetch from 'lib/Fetch';
Vue.prototype.Fetch = Fetch;
new Vue({
    render: h => h(App)
}).$mount('#app')