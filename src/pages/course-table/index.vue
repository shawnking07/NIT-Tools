<template>
  <div>
    <div class="course-table">
      <course-cards :courses="courses"></course-cards>
    </div>
    <mp-footer fixed="true" text="Copyright © 2018 NIT-Tools 阿牛" />
  </div>
</template>

<script>
import courseCards from '@/components/course-cards'
// import getAccount from '../../service/AccountService.js'
import loginCheck from '../../service/LoginCheck.js'
import MpFooter from 'mp-weui/packages/footer'

export default {
  data () {
    return {
      courses: [
        [
          {
            name: 'JavaTESTTESTESSSSSS',
            classroom: 'NB201',
            teacher: 'Dr. Shawn',
            time: '1~2'
          },
          {
            name: 'Angular 6',
            classroom: 'SL1101',
            teacher: 'Mr. William',
            time: '2~5'
          },
          {
            name: 'Java',
            classroom: 'NB201',
            teacher: 'Dr. Shawn',
            time: '1~2'
          },
          {
            name: 'Angular 6',
            classroom: 'SL1101',
            teacher: 'Mr. William',
            time: '2~5'
          },
          {
            name: 'Java',
            classroom: 'NB201',
            teacher: 'Dr. Shawn',
            time: '1~2'
          },
          {
            name: 'Angular 6',
            classroom: 'SL1101',
            teacher: 'Mr. William',
            time: '2~5'
          }
        ],
        [
          {
            name: 'Python',
            classroom: 'SB102',
            teacher: 'Miss. Billy',
            time: '1~2'
          },
          {
            name: 'Vue.js',
            classroom: 'SA333',
            teacher: 'Mrs. Tomas',
            time: '2~5'
          }
        ]
      ]

    }
  },
  components: {
    MpFooter,
    courseCards
  },
  methods: {
    check () {
      loginCheck()
    }

  },
  mounted: function () {
    this.check()
  },
  async onPullDownRefresh () {
    this.refresh()
  }
}
</script>

<style scoped>

</style>
