<template>
  <div class="contanir">
    <div class="nav">
      <div @click="tabToggle(item)" :class="{active : current === item}" v-for="(item, index) in buttons" :key="index">{{item}}</div>
    </div>
    <collage-list></collage-list>
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
  .nav
    width 300px
    height 30px
    display flex
    justify-content space-between
    margin auto
    div
      &.active
        background #525252
        color #fff
        border 1px solid #525252
      width 100px
      height 30px
      line-height 30px
      border-radius 4px
      color rgba(16, 16, 16, 1)
      font-size 14px
      text-align center
      border 1px solid rgba(187, 187, 187, 1)


</style>
