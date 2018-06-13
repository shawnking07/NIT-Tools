import Vue from 'vue'
import App from './index'
import 'mp-weui/lib/style.css'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    enablePullDownRefresh: false,
    navigationBarTitleText: '考试查询',
    backgroundTextStyle: 'dark'
  }
}
