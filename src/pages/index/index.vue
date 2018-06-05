<template>
  <div>
    <div v-if="!isLogin">
      <p class="tips">请登录</p>
      <zf-login @listenIsLogin="checkLogin"></zf-login>
    </div>
    <div v-if="isLogin">
      <p class="tips">你好 {{name}}</p>
      <div class="weui-grids">
        <a :href="item.url" class="weui-grid" v-for="item in grids" :key="item.name">
          <img v-if="item.icon" class="weui-grid__icon" :src="item.icon"/>
          <p class="weui-grid__label">
            {{item.name}}
          </p>
        </a>
        <a class="weui-grid" @click="evaluate()">
          <img class="weui-grid__icon" src="../../../static/baseline_assignment_turned_in_black_48dp.png"/>
          <p class="weui-grid__label">
            一键教学评价
          </p>
        </a>
        <a class="weui-grid" @click="reset()">
          <img class="weui-grid__icon" src="../../../static/baseline_settings_backup_restore_black_48dp.png"/>
          <p class="weui-grid__label">
            重置
          </p>
        </a>
      </div>
    </div>
    <mp-footer fixed="true" text="Copyright © 2018 NIT-Tools 阿牛" />
  </div>
</template>

<script>
import store from '../../store.js'
import zfLogin from '@/components/zf-login'
import MpGrid from 'mp-weui/packages/grid'
import MpFooter from 'mp-weui/packages/footer'

export default {
  data () {
    return {
      grids: [
        {
          name: '课表',
          icon: '../../static/baseline_table_chart_black_48dp.png',
          url: ''
        },
        {
          name: '成绩',
          icon: '../../static/baseline_list_black_48dp.png',
          url: '../score/main'
        }
      ],
      name: wx.getStorageSync('name'),
      isLogin: false
    }
  },

  components: {
    MpGrid,
    MpFooter,
    zfLogin
  },
  watch: {
    isLogin: function () {
      this.name = wx.getStorageSync('name')
    }
  },
  methods: {
    checkLogin (data) {
      if (this.name !== '' || data === true) this.isLogin = true
      else this.isLogin = false
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    reset () {
      this.isLogin = false
      wx.clearStorageSync()
    },
    evaluate () {
      wx.showLoading({
        title: 'Loading...', // 提示的内容,
        mask: true, // 显示透明蒙层，防止触摸穿透,
        success: res => {}
      })
      let uid = wx.getStorageSync('stuId')
      let password = wx.getStorageSync('password')
      this.$http.get(store.state.url + '/teaching_evaluate', {
        stuId: uid,
        password: password
      })
        .then(function (response) {
          wx.hideLoading()
          wx.showToast({
            title: '成功', // 提示的内容,
            icon: 'success', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {}
          })
        })
        .catch(function (response) {
          wx.hideLoading()
          wx.showToast({
            title: '错误', // 提示的内容,
            icon: 'none', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {}
          })
        })
    }
  },
  mounted () {
    console.log(this.name)
    this.checkLogin()
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style scoped>
.weui-grid {
  height: 100px;
}
.tips {
  font-size: 12;
  color: forestgreen;
  text-align: center;
  margin: 15px;
}
</style>
