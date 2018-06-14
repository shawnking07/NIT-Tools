<template>
  <div>
    <div class="score">
      <div class="GPA">
        加权平均分: {{average}}
        <p>(只计算通过的课程)</p>
      </div>
      <tr class="tr">
        <td class="td td0">No.</td>
        <td class="td td1">课程名</td>
        <td class="td clickable" @click="scoreSort()">分数</td>
        <td class="td">补考</td>
        <td class="td clickable" @click="weightSort()">学分</td>
      </tr>
      <tr v-for="(item, index) in scores" :key="item" class="tr">
        <td class="td td0">{{index+1}}</td>
        <td class="td td1">{{item.name}}<p v-if="item.retake" style="color:red">重修</p></td>
        <td class="td">{{item.score}}</td>
        <td class="td">{{item.makeUpScore}}</td>
        <td class="td">{{item.weight}}</td>
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
      average: 0,
      scores: {},
      scoreSortFlag: false,
      weightSortFlag: false
    }
  },
  components: {
    MpFooter
  },
  methods: {
    check () {
      if (loginCheck()) {
        this.getScores()
      }
    },
    refresh () {
      let uid = getAccount()[0]
      let password = getAccount()[1]
      let _this = this
      this.$http.post('/history_scores', {
        stuId: uid,
        password: password
      })
        .then(function (response) {
          _this.scores = response.data.scores.reverse()
          _this.average = response.data.avg.toFixed(2)
          wx.setStorageSync('scores', _this.scores)
          wx.setStorageSync('avg', _this.average)
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
    getScores () {
      let scores = wx.getStorageSync('scores')
      let avg = wx.getStorageSync('avg')
      if (scores !== '' && avg !== '') {
        this.scores = scores
        this.average = avg
      } else {
        wx.startPullDownRefresh()
        this.refresh()
      }
    },
    convertToNum (str) {
      switch (str) {
        case '优秀':
          return 90
        case '良好':
          return 80
        case '中等':
          return 70
        case '合格':
          return 60
        case '不及格':
          return 0
        default:
          return parseInt(str)
      }
    },
    sortByScore (a, b) {
      return this.convertToNum(b.score) - this.convertToNum(a.score)
    },
    scoreSort () {
      this.weightSortFlag = false
      if (this.scoreSortFlag === false) {
        this.scores.sort(this.sortByScore)
      } else {
        this.scores.reverse()
      }
      this.scoreSortFlag = true
    },
    sortByWeight (a, b) {
      return b.weight - a.weight
    },
    weightSort () {
      this.scoreSortFlag = false
      if (this.weightSortFlag === false) {
        this.scores.sort(this.sortByWeight)
      } else {
        this.scores.reverse()
      }
      this.weightSortFlag = true
    }
  },
  mounted: function () {
    this.check()
  },
  async onPullDownRefresh () {
    this.scores = {}
    this.refresh()
  }
}
</script>

<style scoped>
.score {
  /* margin: 15px; */
  font-size: 90%;
}
.tr {
  height: 60%;
  width: 100%;
  display: flex;
  justify-content: space-between
}
.th,.td {
  padding: 10px;
  border-top: 0.25px solid grey;
  text-align: center;
  width: 100%;
}
.td1 {
  width: 500%;
}
.td0 {
  width: 50%;
}
.clickable {
  text-decoration: underline;
  color: rgb(65, 31, 196)
}
.GPA {
  margin: 15px;
  text-align: center;
}
</style>
