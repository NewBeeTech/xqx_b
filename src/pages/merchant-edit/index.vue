<template>
  <div class="container">
    <div class="user-from top sec">
      <div class="text">商户名称</div>
      <div class="input">
        <input type="text" placeholder="请输入商户名称" placeholder-style='font-size: 15px'>
      </div>
    </div>
    <div class="user-from top sec">
      <div class="text">商户logo</div>
      <div>
        <div class="logo">

        </div>
      </div>
    </div>
    <section>
      <div class="chose-wrap">
        <div class="shangh-title">
          <span>商户照片</span>
          <span>（最多可传4张）</span>
        </div>
        <div class="imgs">
          <div class="choose" @click="previewImg(index)" v-for="(item, index) in images" :key="index">
            <img :src="item" alt="">
          </div>
          <div class="choose" @click="chooseImage" v-if="images.length < 4">
            +
          </div>
        </div>
      </div>
      <div class="choose-tip">暂传一张，注册成功后可在商户信息里面上传更多照片哦</div>
    </section>
    <div class="user-from top sec">
      <div class="text">行业</div>
      <div class="text-button" @click="chooseIndustry">
        选择行业 >
      </div>
    </div>
    <div class="select-container">
      <div class="select-line">
        <div>所在地区</div>
        <!-- <div>选择省／市／区</div> -->
        <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
          <div class="picker">
            {{region[0]}}，{{region[1]}}，{{region[2]}}
          </div>
        </picker>
      </div>
      
      <div class="select-line">
        <div>详细地址</div>
        <div class="input">
          <input type="text" placeholder="请输入详细地址" placeholder-style='font-size: 15px'>
        </div>
      </div>
      <div class="select-line">
        <div>地图标记</div>
        <a href="/pages/set-map/main"><div>去标记</div></a>
      </div>
      <div class="select-line">
        <div>所属商圈</div>
        <div>选择商圈</div>
      </div>
    </div>
    <div class="register-tip">推荐您注册的人员编号，如有请填写</div>
    <div class="user-from top sec">
      <div class="text">推荐人编号</div>
      <div class="input">
        <input type="text" placeholder="请输入推荐人编号" placeholder-style='font-size: 15px'>
      </div>
    </div>
    
    <button class="button sub" size="default" @click="submit">下一步</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      region: ['广东省', '广州市', '海珠区'],
      images: []
    }
  },
  methods: {
    // 预览图片
    previewImg (index) {
      let that = this
      wx.previewImage({
        current: that.images[index], // 当前显示图片的http链接
        urls: that.images // 需要预览的图片http链接列表
      })
    },
    // 选择图片
    chooseImage () {
      let that = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          that.images = [...that.images, ...tempFilePaths]
          console.log(that.images)
        }
      })
    },
    chooseIndustry () {
      wx.navigateTo({
        url: '/pages/industry-select/main'
      })
    },
    bindRegionChange (e) {
      let that = this
      // console.log('picker发送选择改变，携带值为', e)
      that.region = e.mp.detail.value
    },
    submit () {
      wx.navigateTo({
        url: '/pages/merchant-info/main'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.user-from
    background #fff
    display flex
    line-height 50px
    height 50px
    border-bottom 1px solid #ccc
    justify-content space-between
    align-items center
    &.sec
      border-color #F0F0F2
    &.top
      margin-top 10px
    .text
      width 26%
      font-size 16px
      text-align left 
      padding-left 20px
    .input 
      width 40%
      font-size 15px
      padding-left 25px
    .logo
      margin-right 15px
      width 34px
      height 34px
      border-radius 30px
      border 1px solid #ccc
      overflow hidden
    .text-button
      margin-right 15px
      font-size 16px
      color #8F8E94
      width 60%
      text-align right 
  section
    width 88%
    margin-top 15px
    padding 6%
    background #fff
    .chose-wrap
      overflow hidden
    .shangh-title
      span 
        font-size 16px
    .imgs 
      margin-top 10px
      .choose
        float left
        margin-right 5px
        width 80px
        height 57px
        line-height 57px
        text-align center
        border 1px solid #ccc
        img   
          width 100%
          height 100%
  .choose-tip
    width 350px
    margin-top 10px
    color #A8A8A8
    text-align center
    font-size 13px
  .select-container
    width 100%
    margin-top 10px
    background #fff
    .select-line  
      margin-left 6%
      width 94%
      border-bottom 1px solid #ccc
      display flex
      line-height 50px
      height 50px
      border-bottom 1px solid #ccc
      justify-content space-between
      align-items center
      color #030303
      font-size 16px
      &:last-child
        border none
      div:last-child
        color #8F8E94
        text-align right 
        margin-right 13px
  .register-tip
    color #B8B8B8
    font-size 14px
    line-height 20px
    margin-top 8px
    margin-left 24px  
  .button
    margin-top 10px
    margin-bottom 10px
    width 80%
    background #2E2E2E
    color #fff
</style>
