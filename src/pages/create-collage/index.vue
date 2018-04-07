<template>
  <div class="wapper">
    <div class="header">
      <div class="ipt-item">
        <div>优惠券名称</div>
        <div><input type="text" placeholder="请输入优惠券名称" placeholder-style='font-size: 15px; color: #cbcbcb; text-align: right'></div>
      </div>
    </div>

    <section class="choose-img">
      <div class="main">
        <div class="left">优惠商品图片</div>
        <div class="right" @click="chooseImg">
          <img v-if="imgurl" :src="imgurl" alt="">
          <span v-else>+</span>
        </div>
      </div>
    </section>
    
    <section class="ipt-wrap">
      <div class="ipt-item border">
        <div>商品原价 （元）</div>
        <div><input type="text" placeholder="请输入商品原价" placeholder-style='font-size: 15px; color: #cbcbcb; text-align: right'></div>
      </div>
      <div class="ipt-item">
        <div>商品现价 （元）</div>
        <div><input type="text" placeholder="请输入商品现价" placeholder-style='font-size: 15px; color: #cbcbcb; text-align: right'></div>
      </div>
    </section>

    <section class="ipt-wrap-sec">
      <div class="left">有效期限</div>
      <div class="right">
        <picker mode="date" :value="startTime" start="2015-09-01" end="2017-09-01" @change="startChange">
          <view class="picker">
            {{startTime}}
          </view>
        </picker>
        至
        <picker mode="date" :value="endTime" start="2015-09-01" end="2017-09-01" @change="endChange">
          <view class="picker">
            {{endTime}}
          </view>
        </picker>
      </div>
    </section>


    <section class="use-info">
      <p>使用说明及规则</p>
      <textarea placeholder="请输入规则说明" name="" id="" cols="30" rows="10"></textarea>
    </section>

    <section class="footer">
      <div @click="navReturn(-1)">确认创建</div>
      <div @click="navReturn(-1)">创建并上架</div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgurl: '',
      startTime: '请选择开始时间',
      endTime: '请选择结束时间'
    }
  },
  methods: {
    chooseImg () {
      let that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.imgurl = res.tempFilePaths[0]
          console.log(res)
        }
      })
    },
    startChange (e) {
      this.startTime = e.mp.detail.value
    },
    endChange (e) {
      this.endTime = e.mp.detail.value
    }
  }
}
</script>

<style lang="stylus" scoped>
.wapper
  font-size 15px
  background #f0f0f0
  height 100%
.header
  background #fff
  height 60px
.ipt-item
  background #fff
  margin auto
  width 90%
  height 50px
  display flex
  justify-content space-between
  align-items center 
  div
    font-size 15px
.choose-img
  width 100%
  height 90px
  background #ffffff
  padding-top 5vw
  margin-top 7px
  .main
    width 90%
    margin auto 
    display flex
    justify-content space-between
    .right
      border 1px solid #cbcbcb
      border-radius 5px
      width 70px
      height 70px
      line-height 70px
      text-align center
      color #cbcbcb
      font-size 20px
      img 
        width 100%
        height 100%
.ipt-wrap
  width 100%
  background #ffffff
  margin-top 7px
.border
  border-bottom 1px solid #cbcbcb
.ipt-wrap-sec
  width 100%
  background #fff
  margin-top 7px
  display flex
  height 50px
  align-items center
  .left
    width 30% 
    margin-left 5vw
  .right
    flex: 1
    color #666
    margin-right 5vw
    display flex
    justify-content space-between
.use-info
  padding 5vw
  background #fff
  margin-top 7px
  p
    width 200px
    margin-bottom 5vw
  textarea
    width 90vw
    height 100px
.footer
  width 100%
  background #fff
  margin-top 7px
  padding 5vw 0
  display flex
  justify-content space-between
  div
    width 159px
    height 45px
    line-height 45px
    text-align center 
    font-size 18px
    &:nth-child(1)
      border 1px solid #fd9326
      border-radius 4px
      color #fd9326
      margin-left 5vw
    &:nth-child(2) 
      background #fd9326
      color #fff
      margin-right 5vw
      border-radius 4px
</style>
