<template>
  <div class="contain">
    <scroll-view scroll-y class="scroll left">
      <div @click="loadTwo(item.id)" :class="{active: checked === item.name}" v-for="(item, index) in leftList" :key="index">{{item.name}}</div>
    </scroll-view>
    <scroll-view scroll-y class="scroll right">
      <div @click="rightClick(item)" :class="{active: checkedRight === item}" v-for="(item, index) in rightList" :key="index">{{item.name}}</div>
    </scroll-view>
  </div>
</template>

<script>
  import {wxRequest} from '@/api'
export default {
  data () {
    return {
      checked: '美食',
      checkedRight: '',
      leftList:[],
      rightList:[]
    }
  },
  computed: {
    leftList () {
      return this.list.filter(el => el.name === this.checked)[0].select
    }
  },
  onLoad(){
    this.loadOne();
    this.loadTwo(10);
  },
  methods: {
    loadOne (){
      var self = this;
      wxRequest('getOneIndustry')
        .then(res => {

          self.leftList = res.value;
          console.log(self.leftList[0].name);
        })
        .catch(err => {
          console.log(err)
        })
    },
    loadTwo (id){
      var self = this;
      wxRequest('getTowIndustry',{towKey:id})
        .then(res => {

          self.rightList = res.value;

        })
        .catch(err => {
          console.log(err)
        })
    },
    industryClick (name) {
      this.checked = name
    },
    rightClick (item) {
      let that = this
      this.checkedRight = item
      wx.setStorageSync("hangye",JSON.stringify(item));
      wx.navigateTo({
        url: '/pages/merchant-edit/main'
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
