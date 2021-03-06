import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import store from './store'
import router from './router'
import qs from "qs"
import './plugins/element.js'

// 配置axios
axios.defaults.baseURL = ''
axios.defaults.withCredentials = true
axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [function (data) {
    return qs.stringify(data, {
        arrayFormat: 'brackets'
    })
}]

axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
        if (error.response) {
            // 拦截401，发生401就跳回登录
            if (error.response.status == 401) {
                router.push({
                    name: 'landing.portal'
                })
            }
            return Promise.resolve(error.response.data)  // 返回接口返回的错误信息
        }
    }
);

// set up axios
Vue.use(VueAxios, axios)

// import moment
import moment from "moment"
Vue.prototype.$moment = moment

// set up lazyload
Vue.use(VueLazyload)

// 默认 title
document.title = 'Leaf'

// 修改页面 title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
