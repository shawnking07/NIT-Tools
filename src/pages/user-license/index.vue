<template>
  <div class="user-license">
    <p>This is a demo project. I can't promise that it can work at any time.</p>
    <p>I wrote the Python script before, but the runtime env is not installed on everyone's computer. Besides, the script cannot run on cell phone</p>
    <p>So I decided to make a prj with WeChat miniprogram and flask (if you don't know these, that doesn't matter :-)</p>
    <p>Your private data will store on your cell phone instead of the server</p>
    <p>YOU HAVE TO CLICK THE BUTTON BEFORE USE IT WHETHER YOU AGREE OR NOT</p>
    <p>因正方系统无API，目前服务端只负责抓取数据，学号密码只存在手机，把教务系统点爆了概不负责</p>
    <p>反正你们也不会看，点按钮就对了</p>
    <button class="weui-btn" type="primary" @click="back()">BACK</button>
  </div>
</template>

<script>
// Use Vuex
export default {
  data () {
    return {
    }
  },
  methods: {
    back () {
      wx.navigateBack({
        delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      })
    }
  }
}
</script>

<style>
.user-license {
  margin: 15px
}
</style>
