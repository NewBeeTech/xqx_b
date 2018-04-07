<template>
  <div class="contanir">
    <div class="nav">
      <div @click="tabToggle(item)" :class="{active : current === item}" v-for="(item, index) in buttons" :key="index">{{item}}</div>
    </div>
    <collage-list></collage-list>
    <button class="creat-button" @click="navGo('/pages/create-collage/main')">
      创建优惠券
    </button>
  </div>
</template>

<script>
import CollageList from '@/components/CollageList'

export default {
  data () {
    return {
      current: '已上架',
      buttons: ['已上架', '待上架', '已下架']
    }
  },
  methods: {
    tabToggle (item) {
      this.current = item
    }
  },
  components: {
    CollageList
  }
}
</script>

<style lang="stylus" scoped>
.contanir
  height 100%
  background #fff
  padding-top 28px
  .nav
    width 278px
    height 31px
    border 1px solid #fd9326
    border-radius 5px
    display flex
    justify-content space-between
    margin auto
    margin-bottom 23px
    div
      &.active
        background #fd9326
        color #fff
        border 1px solid #fd9326
      &:nth-child(2) 
        border-left 1px solid #fd9326
        border-right 1px solid #fd9326
      width 100px
      height 30px
      line-height 30px
      color #fd9326
      font-size 14px
      text-align center
  .creat-button
    width 92%
    background #fd9326
    color #fff
    position fixed
    bottom 15px
    left 4%
    border none
</style>
