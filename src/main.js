import Vue from 'vue'
import App from './App'
import Fly from 'flyio/dist/npm/wx'
import '../static/app.css'
import 'mp-weui/lib/style.css'
import '../static/animate.css'

var fly = new Fly()
fly.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
})

fly.config.baseURL = 'http://192.168.10.176:5000/api'
fly.config.timeout = 8000

Vue.prototype.$http = fly
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: 'NIT小工具',
      navigationBarTextStyle: 'white'
    }
  }
}
