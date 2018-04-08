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
        <div class="logo" @click="chooseImage(1, 'logo')">
          <img v-if="logo" :src="logo" alt="">
          <span v-else>+</span>
        </div>
      </div>
    </div>
    <section>
      <div class="chose-wrap">
        <div class="shangh-title">
          <span>商户照片</span>
          <span>（最多可传4张）</span>
        </div>
        <scroll-view scroll-x class="imgs">
          <div style="width: 150%">
            <div class="choose" @click="previewImg(index)" v-for="(item, index) in images" :key="index">
              <img :src="item" alt="">
            </div>
            <div class="choose" @click="chooseImage(4, 'images')" v-if="images.length < 4">
              <span>+</span>
            </div>
          </div>
        </scroll-view>
      </div>
      <div class="choose-tip">暂传一张，注册成功后可在商户信息里面上传更多照片哦</div>
    </section>
    <div class="user-from top sec">
      <div class="text">行业</div>
      <div class="text-button" @click="chooseIndustry">
        选择行业 <img class="right_" src="/static/imgs/right.png" alt="">
      </div>
    </div>
    <div class="select-container">
      <div class="select-line">
        <div>所在地区</div>
        <!-- <div>选择省／市／区</div> -->
        <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
          <div class="picker">
            {{region[0]}}，{{region[1]}}，{{region[2]}} <img class="right_" src="/static/imgs/right.png" alt="">
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
        <a href="/pages/set-map/main"><div>去标记 <img class="right_" src="/static/imgs/right.png" alt=""></div></a>
      </div>
      <div class="select-line">
        <div>所属商圈</div>
        <div @click="navGo('/pages/choose-shangq/main')"><span style="margin-right: 5px" v-if="shangq">{{shangq}}</span><span style="margin-right: 5px" v-else>选择商圈</span><img class="right_" src="/static/imgs/right.png" alt=""></div>
      </div>
    </div>
    <div v-if="isLang == 1">
      <div class="register-tip">推荐您注册的人员编号，如有请填写</div>
      <div class="user-from top sec">
        <div class="text">推荐人编号</div>
        <div class="input">
          <input type="text" placeholder="请输入推荐人编号" placeholder-style='font-size: 15px'>
        </div>
      </div>
      
      <button class="button sub" size="default" @click="submit">下一步</button>
    </div>






    <div v-else>
      <div class="select-container">
        <div class="select-line">
          <div>客服电话</div>
          <div class="input">
            <input type="text" placeholder="请输入客服电话" placeholder-style='font-size: 15px'>
          </div>
        </div>
        <div class="select-line">
          <div>营业时间</div>
          <div @click="navGo('/pages/time-checked/main')">
            <span v-if="yyTime.begin">{{yyTime.begin}}至{{yyTime.end}}</span>
            <span v-else>设置</span>
             <img class="right_" src="/static/imgs/right.png" alt="">
          </div>
        </div>
        
        
        <div class="select-line">
          <div>联系人</div>
          <div class="input">
            <input type="text" placeholder="请输入联系人姓名" placeholder-style='font-size: 15px'>
          </div>
        </div>
        <div class="select-line">
          <div>联系人电话</div>
          <div class="input">
            <input type="text" placeholder="请输入联系人电话" placeholder-style='font-size: 15px'>
          </div>
        </div>
      </div>
      <button class="submit" @click="navReturn(-1)">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      region: ['广东省', '广州市', '海珠区'],
      images: [],
      logo: '',
      yyTime: {},
      shangq: ''
    }
  },
  computed: {
    isLang () {
      return this.$root.$mp.appOptions.from ? 1 : 2
    }
  },
  onShow () {
    let that = this
    wx.getStorage({
      key: 'yyTime',
      success (res) {
        console.log(res.data)
        that.yyTime = res.data
        console.log(that.yyTime)
      }
    })
    wx.getStorage({
      key: 'shangQuan',
      success (res) {
        that.shangq = res.data
        console.log(that.shangq)
      }
    })
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
    chooseImage (count, type) {
      let that = this
      wx.chooseImage({
        count: count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          if (type === 'logo') {
            console.log(res)
            that.logo = tempFilePaths[0]
          } else {
            that[type] = [...that[type], ...tempFilePaths]
            console.log(that.images)
          }
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
.submit
  width 90%
  height 45px
  line-height 45px
  background  #fd9326
  color #fff
  font-size 18px
  margin auto
  margin-top 20px
  margin-bottom 20px
.right_ 
  width 10px
  height 18px
  position relative
  top 3px
  display inline-block
.container
  height 100%
  background #ededed
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
      padding-left 10px
    .input 
      width 40%
      font-size 15px
      padding-left 25px
    .logo
      margin-right 15px
      width 34px
      height 34px
      border-radius 30px
      background #ededed
      overflow hidden
      text-align center
      line-height 34px
      color #aaa
      font-size 18px
      img   
        width 100%
        height 100%
    .text-button
      margin-right 15px
      font-size 16px
      color #8F8E94
      width 60%
      text-align right 
  section
    width 92vw
    margin-top 15px
    padding 4vw
    background #fff
    .chose-wrap
      overflow hidden
    .shangh-title
      span 
        font-size 16px
    .imgs 
      height 80px
      width 100%
      margin-top 10px
      .choose
        display inline-block
        margin-right 5px
        width 100px
        height 66px
        line-height 66px
        text-align center
        overflow hidden
        font-size 18px
        color #dedede
        border-radius 4px
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
      margin 0 4vw
      width 92vw
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
        // margin-right 13px
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
