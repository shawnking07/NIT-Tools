import Vue from 'vue'
import App from './index'
import 'mp-weui/lib/style.css'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    enablePullDownRefresh: true,
    navigationBarTitleText: '查询所有成绩',
    backgroundTextStyle: 'dark'
  }
}
