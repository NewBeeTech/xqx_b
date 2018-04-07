<template>
  <div>
    <!-- <view>{{beginHour}}-{{beginMin}} --- {{endHour}}-{{endMin}}</view> -->
    <div class="title">开始时间</div>
    <picker-view class="picker" indicator-style="height: 50px;" :value="beginValue" @change="beginChange">
      <picker-view-column>
        <view v-for="item in hours" :key="item" style="line-height: 50px">{{item}}</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="item in mins" :key="item" style="line-height: 50px">{{item}}</view>
      </picker-view-column>
    </picker-view>
    <div class="title">结束时间</div>
    <picker-view class="picker" indicator-style="height: 50px;" :value="endValue" @change="endChange">
      <picker-view-column>
        <view v-for="item in endhours" :key="item" style="line-height: 50px">{{item}}</view>
      </picker-view-column>
      <picker-view-column>
        <view v-for="item in emdmins" :key="item" style="line-height: 50px">{{item}}</view>
      </picker-view-column>
    </picker-view>
    <button class="submmit" @click="selectTime">确定</button>
  </div>
</template>

<script>
const hours = []
const mins = []
for (let i = 0; i <= 24; i++) {
  if (i < 10) {
    i = '0' + i + ''
  }
  hours.push(i + '')
}
for (let i = 0; i <= 60; i++) {
  if (i < 10) {
    i = '0' + i + ''
  }
  mins.push(i + '')
}
export default {
  data () {
    return {
      hours: hours,
      mins: mins,
      endhours: hours,
      emdmins: mins,
      beginHour: '08',
      beginMin: '00',
      endHour: '20',
      endMin: '00',
      beginValue: [8, 0],
      endValue: [20, 0]
    }
  },
  methods: {
    beginChange (e) {
      const val = e.mp.detail.value
      this.beginHour = this.hours[val[0]]
      this.beginMin = this.mins[val[1]]
      this.beginValue = [this.beginHour, this.beginMin]
    },
    endChange (e) {
      const val = e.mp.detail.value
      this.endHour = this.endhours[val[0]]
      this.endMin = this.emdmins[val[1]]
      this.endValue = [this.endHour, this.endMin]
    },
    selectTime () {
      let that = this
      wx.setStorage({
        key: 'yyTime',
        data: {
          begin: that.beginHour + '-' + that.beginMin,
          end: that.endHour + '-' + that.endMin
        }
      })
      this.navReturn(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.picker
  width 70%
  height 200px
  margin auto
  text-align center
.title
  width 100%
  line-height 40px
  text-align center 
  font-size 16px
.submmit
  width 70%
  height 45px
  line-height 45px
  background #fc940b
  color #fff
  margin-top 20px
</style>
