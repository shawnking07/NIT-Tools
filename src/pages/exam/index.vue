<template>
  <div>
    <div class="exam">
      <div v-if="isEmpty" class="msg no-exam animated tada">好像没有考试欸</div>
      <div class="msg">
        {{msg}}
      </div>
      <tr class="tr">
        <td class="td">No.</td>
        <td class="td">课程名</td>
        <td class="td">时间</td>
        <td class="td">地点</td>
        <td class="td">座位</td>
      </tr>
      <tr v-for="(item, index) in exams" :key="item" class="tr">
        <td class="td">{{index+1}}</td>
        <td class="td">{{item.name}}</td>
        <td class="td">{{item.time}}</td>
        <td class="td">{{item.location}}</td>
        <td class="td">{{item.seat}}</td>
      </tr>
    </div>
    <mp-footer text="Copyright © 2018 NIT-Tools 阿牛" />
  </div>
</template>

<script>
import getAccount from '../../service/AccountService.js'
import loginCheck from '../../service/LoginCheck.js'
import MpFooter from 'mp-weui/packages/footer'

export default {
  data () {
    return {
      msg: '',
      exams: [],
      isEmpty: false
    }
  },
  components: {
    MpFooter
  },
  methods: {
    check () {
      if (loginCheck()) {
        this.getExam()
      }
    },
    getExam () {
      let uid = getAccount()[0]
      let password = getAccount()[1]
      let _this = this
      this.$http.post('/exams', {
        stuId: uid,
        password: password
      })
        .then(function (response) {
          _this.exams = response.data.exams
          _this.msg = response.data.msg[0]
        })
        .catch(function (error) {
          wx.showToast({
            title: error.response.data.message, // 提示的内容,
            icon: 'none', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: res => {}
          })
        })
    }
  },
  mounted: function () {
    this.check()
  },
  watch: {
    exams: function () {
      if (this.exams.length === 0) this.isEmpty = true
      else this.isEmpty = false
    }
  }
}
</script>

<style scoped>
.exam {
  /* margin: 15px; */
  font-size: 90%;
}
.tr {
  height: 60%;
  width: 100%;
  display: flex;
  justify-content: space-between
}
.td {
  padding: 10px;
  border-top: 0.25px solid grey;
  text-align: center;
  width: 100%;
}
.msg {
  margin: 15px;
  text-align: center;
}
.no-exam {
  color: green;
  size: 20px;
}
</style>
