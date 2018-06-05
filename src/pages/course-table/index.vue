<template>
  <div>
    <div class="course-table">

    </div>
    <mp-footer text="Copyright © 2018 NIT-Tools 阿牛" />
  </div>
</template>

<script>
// import store from '../../store.js'
// import getAccount from '../../service/AccountService.js'
import loginCheck from '../../service/LoginCheck.js'
import MpFooter from 'mp-weui/packages/footer'

export default {
  data () {
    return {

    }
  },
  components: {
    MpFooter
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
