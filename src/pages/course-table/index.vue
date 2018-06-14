<template>
  <div>
    <div class="course-table">
      <course-cards :courses="courses" v-if="courses"></course-cards>
      <p class="loading" v-else>Loading...</p>
    </div>
    <mp-footer fixed="true" text="Copyright © 2018 NIT-Tools 阿牛" />
  </div>
</template>

<script>
import courseCards from '@/components/course-cards'
import getAccount from '../../service/AccountService.js'
// import loginCheck from '../../service/LoginCheck.js'
import MpFooter from 'mp-weui/packages/footer'

export default {
  data () {
    return {
      courses: undefined
    }
  },
  components: {
    MpFooter,
    courseCards
  },
  methods: {
    refresh () {
      let uid = getAccount()[0]
      let password = getAccount()[1]
      let _this = this
      this.$http.post('/course_table', {
        stuId: uid,
        password: password
      })
        .then(function (response) {
          _this.courses = response.data
          wx.setStorageSync('courses', _this.courses)
          wx.stopPullDownRefresh()
        })
        .catch(function (error) {
          wx.stopPullDownRefresh()
          wx.showToast({
            title: error.response.data.message, // 提示的内容,
            icon: 'none', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {}
          })
        })
    },
    getCourses () {
      let courses = wx.getStorageSync('courses')
      if (courses === '') {
        wx.startPullDownRefresh({ success: res => {} })
      } else {
        this.courses = courses
      }
    }
  },
  mounted: function () {
    this.getCourses()
  },
  async onPullDownRefresh () {
    this.courses = undefined
    this.refresh()
  }
}
</script>

<style scoped>
.loading {
  text-align: center;
  size: 20px;
}
</style>
