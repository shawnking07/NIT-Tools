<template>
  <div>
    <div class="week">
      <a class="day" v-for="(day, index) in week" :key="index" :class="index==activeIndex?'a-active':''" @click="onDayClick(index)">{{day}}</a>
      <a class="day" @click="onTodayClick">今天</a>
    </div>
    <div class="courses">
      <p v-if="!day_courses" class="no-course animated tada">今天没课 嘻嘻</p>
      <div v-for="(course, index) in day_courses" :key="index" class="course-card">
        <p class="course-name">{{course.name}}</p>
        <div class="inline">
          <p class="course-teacher">{{course.teacher}}</p>
          <p class="course-classroom">{{course.classroom}}</p>
        </div>
        <p class="course-time">{{course.time}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courses: Array
  },
  data () {
    return {
      week: [
        '日', '一', '二', '三', '四', '五', '六'
      ],
      activeIndex: new Date().getDay(),
      day_courses: null
    }
  },
  methods: {
    onDayClick (index) {
      this.activeIndex = index
    },
    initialTable () {
      this.day_courses = this.courses[this.activeIndex]
    },
    onTodayClick () {
      this.activeIndex = new Date().getDay()
    }
  },
  watch: {
    activeIndex: function () {
      this.initialTable()
    }
  },
  mounted: function () {
    this.initialTable()
  }
}
</script>

<style scoped>
.a-active {
  color: green;
}
.week {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  background-color: white;
  margin-bottom: 5px;
  -moz-box-shadow:0px 0px 12px #8F8F8F;
  -webkit-box-shadow:0px 0px 12px #8F8F8F;
  box-shadow:0px 0px 12px #8F8F8F;
  font-weight: bold;
}
.day {
  text-align: center;
  padding: 5px;
}
.course-card {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 80%;
  padding: 10px;
  -moz-box-shadow:0px 0px 12px #8F8F8F;
  -webkit-box-shadow:0px 0px 12px #8F8F8F;
  box-shadow:0px 0px 12px #8F8F8F;
}
.course-name {
  color: green;
  font-weight: bold;
  font-size: 20px;
}
.course-classroom {
  font-size: 18px;
}
.no-course {
  padding-top: 100px;
  text-align: center;
}
.inline {
  display: flex;
  justify-content: space-between;
}
</style>
