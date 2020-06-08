import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

// const  =  new Vue();
//
// Object.defineProperties(Vue.prototype, {
//     $buss: {
//         get: function () {
//             return busa
//         }
//     }
// })

Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
