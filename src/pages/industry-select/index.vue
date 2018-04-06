<template>
  <div class="contain">
    <scroll-view scroll-y class="scroll left">
      <div @click="industryClick(item.name)" :class="{active: checked === item.name}" v-for="(item, index) in list" :key="index">{{item.name}}</div>
    </scroll-view>
    <scroll-view scroll-y class="scroll right">
      <div @click="rightClick(item)" :class="{active: checkedRight === item}" v-for="(item, index) in leftList" :key="index">{{item}}</div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: '美食',
      checkedRight: '',
      list: [
        {
          name: '美食',
          select: ['粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜']
        },
        {
          name: '个人股',
          select: ['粤菜', '粤菜', '粤菜', '打完大哇', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜']
        },
        {
          name: '带娃',
          select: ['粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜']
        },
        {
          name: '电饭锅',
          select: ['粤菜', '福娃发完', '粤菜', '福娃发完', '福娃发完', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜']
        },
        {
          name: '福娃发完',
          select: ['粤菜', '福娃发完', '粤菜', '粤菜', '福娃发完', '粤菜', '福娃发完', '粤菜', '粤菜', '粤菜']
        },
        {
          name: '打完大哇',
          select: ['粤菜', '福娃发完', '打完大哇', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜']
        },
        {
          name: '吊袜带',
          select: ['粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜', '粤菜']
        }
      ]
    }
  },
  computed: {
    leftList () {
      return this.list.filter(el => el.name === this.checked)[0].select
    }
  },
  methods: {
    industryClick (name) {
      this.checked = name
    },
    rightClick (item) {
      let that = this
      this.checkedRight = item
      wx.navigateTo({
        url: '/pages/merchant-edit/main?merchant=' + that.checkedRight
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.contain
  display flex
  justify-content space-between
  height 100vh
  .scroll
    width 50vw
    height 100vh
    font-size 16px
    line-height 40px
    div
      padding-left 15px
    .active
      color #359de1
      background #fff
    &.right
      background #fff
      color #6f6f6f
    &.left
      background #fafafa
</style>
