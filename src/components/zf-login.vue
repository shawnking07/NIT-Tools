<template>
  <div>
    <div class="login">
      <div class="weui-cells__title">正方教务系统登录</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">学号</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入学号" type="number" maxlength="10" v-model.lazy="stuId"/>
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">密码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="password" placeholder="请输入密码" v-model="password"/>
          </div>
        </div>
      </div>
      <mp-agree url-text="《相关条款》" v-model="isAgree" url="/pages/user-license/main"/>
      <div class="btn-g">
        <button class="weui-btn" type="primary" :disabled="disable" @click="login()">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import MpAgree from 'mp-weui/packages/agree'
export default {
  data () {
    return {
      stuId: '',
      password: '',
      name: '',
      isAgree: false
    }
  },
  components: {
    MpAgree
  },
  computed: {
    disable () {
      if (this.stuId === '' || this.password === '' || this.isAgree === false) return true
      else return false
    }
  },
  methods: {
    login () {
      let _this = this
      console.log('fetching...')
      wx.showLoading({
        title: 'Loading...', // 提示的内容,
        mask: true, // 显示透明蒙层，防止触摸穿透,
        success: res => {}
      })
      this.$http.post('/login', {
        stuId: _this.stuId,
        password: _this.password
      })
        .then(function (response) {
          wx.hideLoading()
          wx.showToast({
            title: response.data.board_msg, // 提示的内容,
            icon: 'none', // 图标,
            duration: 3000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {}
          })
          _this.name = response.data.name
          wx.setStorageSync('stuId', _this.stuId)
          wx.setStorageSync('password', _this.password)
          wx.setStorageSync('name', _this.name)
          _this.$emit('listenIsLogin', true)
        })
        .catch(function (error) {
          console.log(error)
          wx.hideLoading()
          wx.showToast({
            title: error.response.data.message, // 提示的内容,
            icon: 'none', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {}
          })
        })
    }
  }
}
</script>

<style scope>
.btn-g {
  margin: 15px;
}
</style>
