<template>
  <div class="container">
    <div class="user-from top sec">
      <div class="text">商户名称</div>
      <div class="input">
        <input type="text" minlength="1" placeholder="请输入商户名称" placeholder-style='font-size: 15px' v-model="info.name" @blur="checkName" :value="info.name">
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
            <!-- @click="previewImg(index)"-->
            <div class="choose" v-for="(item, index) in images" :key="index">
              <img class="chooseImage" :src="item" alt="" @longtap="deleteImage(index)">
            </div>
            <div class="choose" @click="chooseImage(4,'images')" v-if="images.length < 1">
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
        {{info.businessIndName?info.businessIndName:'选择行业'}} <img class="right_" src="/static/imgs/right.png" alt="">
      </div>
    </div>
    <div class="select-container top sec">
      <div class="select-line">
        <div>所在地区</div>
        <!-- <div>选择省／市／区</div> -->
        <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
          <div class="picker">
            {{region[0]}}/{{region[1]}}/{{region[2]}} <img class="right_" src="/static/imgs/right.png" alt="">
          </div>
        </picker>
      </div>

      <div class="select-line">
        <div>详细地址</div>
        <div class="input">
          <input type="text" placeholder="请输入详细地址" placeholder-style='font-size: 15px' v-model="info.detailAddress">
        </div>
      </div>
      <div class="select-line">
        <div>地图标记</div>
        <a href="/pages/set-map/main">
          <div>{{mark!=""?mark:"去标记"}} <img class="right_" src="/static/imgs/right.png" alt=""></div>
        </a>
      </div>
      <div @click="navGo('/pages/choose-shangq/main')" class="select-line top sec">
        <div>所属商圈</div>
        <div>
          <span style="margin-right: 5px" v-if="info.businessDistrict">{{info.businessDistrict}}</span>
          <span style="margin-right: 5px" v-else>选择商圈</span>
          <img class="right_" src="/static/imgs/right.png"alt="">
        </div>
      </div>
    </div>

    <div v-if="isLang == 1">
      <div class="register-tip">推荐您注册的人员编号，如有请填写</div>
      <div class="user-from top sec">
        <div class="text">推荐人编号</div>
        <div class="input">
          <input type="digit" placeholder="请输入推荐人编号" placeholder-style='font-size: 15px' v-model="info.counterid">
        </div>
      </div>

      <button class="button sub" size="digit" @click="submit">下一步</button>
    </div>

    <div v-else class="select-container">
      <div class="select-container">
        <div class="select-line  top sec">
          <div>客服电话</div>
          <div class="input">
            <input type="digit" placeholder="请输入客服电话" placeholder-style='font-size: 15px' v-model="info.storePhone">
          </div>
        </div>
        <div class="select-line">
          <div>营业时间</div>
          <div @click="navGo('/pages/time-checked/main')">
            <span v-if="info.businessHours">{{info.businessHours}}</span>
            <span v-else>设置</span>
            <img class="right_" src="/static/imgs/right.png" alt="">
          </div>
        </div>

        <div class="select-line  top sec">
          <div>联系人</div>
          <div class="input">
            <input type="text" placeholder="请输入联系人姓名" placeholder-style='font-size: 15px'
                   v-model="info.personInChargeName" :value="info.personInChargeName">
          </div>
        </div>
        <div class="select-line">
          <div>联系人电话</div>
          <div class="input">
            <input type="digit" placeholder="请输入联系人电话" placeholder-style='font-size: 15px'
                   v-model="info.personInChargePhone" :value="info.personInChargePhone">
          </div>
        </div>
        <div class="select-line">
          <div>返金设置</div>
          <div class="input">
            <input type="digit" placeholder="默认0.1%" placeholder-style='font-size: 15px'
                   v-model="info.ratio" :value="info.ratio">
          </div>
        </div>
        <div class="select-line">
          <div>积分设置</div>
          <div class="input">
            <input type="digit" placeholder="最小0.1最大80" placeholder-style='font-size: 15px'
                   v-model="info.integralRatio" min="0.1" max="80" :value="info.integralRatio">
          </div>
        </div>
      </div>
      <button class="submit" @click="toSava">保存</button>
    </div>
  </div>
</template>

<script>
  import {wxRequest} from '@/api'
  import {qiniu} from "../../api/qiniuUploader"

  export default {
    data() {
      return {
        region: ['广东省', '广州市', '海珠区'],
        images: [],
        logo: '',
        yyTime: {},
        shangq: '',
        type: 0,
        info: {
          ratio:0
        },
        imageIndex: 0,
        mark:""
      }
    },
    onLoad: function (option) {
      let that = this
      let type = this.$root.$mp.query.type
      that.type = type
      if (type == 1) {
        wx.setNavigationBarTitle({
          title: '编辑基本信息'
        })
      } else {
        wx.setNavigationBarTitle({
          title: '注册商户'
        })
      }
      // this.loadCity();
    },
    computed: {
      isLang() {
        return this.$root.$mp.appOptions.from ? 1 : 2
      }
    },

    onShow() {
      var address = wx.getStorageSync("chooseAddress");
      if (address) {
        address = JSON.parse(address);
        this.info.latitude = address.location.lat;
        this.info.longitude = address.location.lng;
        this.mark = address.title;
      }
      if (wx.getStorageSync("hangye")) {
        var hangye = JSON.parse(wx.getStorageSync("hangye"));
        this.info.industry = hangye.id;
        this.info.businessIndName = hangye.name;
      }

      let that = this;
      that.info.businessHours = wx.getStorageSync("time");
      console.log(that.info.businessHours)

      var shangquan = wx.getStorageSync("shangQuan");
      console.log(shangquan);
      that.info.businessDistrictCode = shangquan.id;
      that.info.businessDistrict= shangquan.name;
      that.info.businessLicenseAreaid= shangquan.areaid;
      // that.info.counterid = "01011";//推荐人编号

    },
    methods: {
      checkName(e){
        console.log(e);
        if (e.target.value.length==0){
          wx.showToast({
            title: '请输入商品名称',
            icon: 'none',
            duration: 2000
          })
        }
      },
      deleteImage(index) {
        var self = this;
        wx.showModal({
          title: '是否要删除图片',
          success: function (res) {
            if (res.confirm) {
              console.log(self.images)
              self.images.splice(index, 1);
              console.log(self.images)
            } else if (res.cancel) {

            }
          }
        })
      },
      //获取基本信息
      getShopInfo() {
        var self = this;
        wxRequest('getShopInfo')
          .then(res => {
            console.log(res)
            self.info = res.value;
          }).catch(err => {
          console.log(err)
        })
      },
      // 预览图片
      previewImg(index) {
        let that = this
        wx.previewImage({
          current: that.images[index], // 当前显示图片的http链接
          urls: that.images // 需要预览的图片http链接列表
        })
      },
      // 选择图片
      chooseImage(count, type) {
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
              that.uploadImage("ccpp-logo", tempFilePaths[0]);
            } else {
              that[type] = [...that[type], ...tempFilePaths]
              console.log(that.images)
              that.uploadImage("ccpp-mpic", that.images[0]);
            }


          }
        })
      },
      uploadImage: function (bucket, filePaths) {
        var self = this;
        wxRequest('getQiniuToken', {bucket: bucket})
          .then(res => {
            console.log(res)

            if (res.code == 1) {
              var token = res.value
              var date = new Date()

              qiniu.upload(filePaths, (res) => {
                console.log(res);
                var type = bucket.replace("ccpp-", "");
                var imageURL = "https://" + type + ".denong.com/" + res.key;
                console.log(imageURL);

                if (type == "logo") {
                  self.info.storeLogo = imageURL;
                } else {
                  if (self.imageIndex == 0) {
                    self.info.storeBackgroundPicture = imageURL;
                  } else {
                    if (self.imageIndex == 1) {
                      self.info.carouselFigure.imgOne = imageURL
                    }
                    if (self.imageIndex == 2) {
                      self.info.carouselFigure.imgTwo = imageURL
                    }
                    if (self.imageIndex == 3) {
                      self.info.carouselFigure.imgThree = imageURL
                    }

                    ++self.imageIndex;
                  }


                }
              }, (error) => {
                console.log('error: ' + error);
              }, {
                region: 'NCN',
                domain: bucket,
                key: date.getTime() + ".jpg",
                uptoken: token

              }, (res) => {

              });

            } else {
              wx.showToast({
                title: '获取失败',
                icon: 'none',
                duration: 2000
              })
            }

          })
          .catch(err => {
            console.log(err)
          })
      },
      chooseIndustry() {
        wx.navigateTo({
          url: '/pages/industry-select/main'
        })
      },
      bindRegionChange(e) {
        console.log(e);
        let that = this
        // console.log('picker发送选择改变，携带值为', e)
        that.region = (e.mp.detail.value);

        console.log(that.region);
        that.businessLicenseAreaid = "110107";
      },
      loadAraeName: function () {
        var self = this;
        wxRequest("getShopInfo").then(function (res) {

          if (!res.data.value) {
            self.info = {
              currencyHistorySum:0,
              personTodaySum:0,
              realChargeHistorySum:0,
              personHistorySum:0,
              currencyTodaySum:0
            }
          }

        }).catch(function (err) {
          console.log(err);
        });
      },
      toSava() {

        this.info.appLoginname = wx.getStorageSync('phone');
        var message = "";
        if (!this.info.name){message = "请输入商户名称"}
        if (!this.logo){message = "请上传商户logo"}
        if (!this.info.businessIndName){message = "请输入行业名称"}
        if (!this.images.length){message = "请上传商品图片"}
        if (!this.info.businessIndName){message = "请选择行业"}
        if (!this.region){message = "请选择所在地区"}
        if (!this.mark){message = "请选择地图标记"}
        if (!this.info.businessDistrict){message = "请选择商圈"}
        if (!this.info.storePhone){message = "请输入客服电话"}
        if (!this.info.businessHours){message = "请选择营业时间"}
        if (!this.info.personInChargeName){message = "请输入联系人姓名"}
        if (!this.info.ratio){message = "请设置返金金额"}
        if (!this.info.integralRatio){message = "请设置积分设置"}

        if (message){
          wx.showToast({
            title: message,
            icon:"none",
            duration: 2000
          })
          return;
        }

        wxRequest('merchantRegister', this.info)
          .then(res => {
            console.log(res);
            wx.navigateTo({
              url: '/pages/index/main'
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .submit
    width 90%
    height 90rpx
    line-height 90rpx
    background #fd9326
    color #fff
    font-size 36rpx
    margin auto
    margin-top 40rpx
    margin-bottom 40rpx

  .right_
    width 20rpx
    height 36rpx
    position relative
    top 6rpx
    display inline-block

  .container
    height 100%
    background #ededed

  .user-from
    background #fff
    display flex
    line-height 100rpx
    height 100rpx
    border-bottom 2rpx solid #ccc
    justify-content space-between
    align-items center
    &.sec
      border-color #F0F0F2
    &.top
      margin-top 20rpx
    .text
      width 26%
      font-size 32rpx
      text-align left
      padding-left 20rpx
    .input
      width 40%
      font-size 30rpx
      padding-left 50rpx
    .logo
      margin-right 30rpx
      width 68rpx
      height 68rpx
      border-radius 60rpx
      background #ededed
      overflow hidden
      text-align center
      line-height 68rpx
      color #aaa
      font-size 36rpx
      img
        width 100%
        height 100%
    .text-button
      margin-right 30rpx
      font-size 16px
      color #8F8E94
      width 60%
      text-align right

  section
    width 92vw
    margin-top 30rpx
    padding 4vw
    background #fff
    .chose-wrap
      overflow hidden
    .shangh-title
      span
        font-size 32rpx
    .imgs
      height 160rpx
      width 100%
      margin-top 20rpx
      position relative
      .choose
        display inline-block
        margin-right 10rpx
        width 200rpx
        height 112rpx
        line-height 112rpx
        text-align center
        /*overflow hidden*/
        font-size 36rpx
        color #dedede
        border-radius 8rpx
        border 2rpx solid #ccc
        position relative
        box-sizing border-box

        .chooseImage
          width 100%
          height 100%

  .choose-tip
    width 700rpx
    margin-top 20rpx
    color #A8A8A8
    text-align center
    font-size 26rpx

  .select-container
    width 100%
    margin-top 20rpx
    background #fff
    .select-line
      margin 0 4vw
      width 92vw
      border-bottom 1px solid #ccc
      display flex
      line-height 100rpx
      height 100rpx
      justify-content space-between
      align-items center
      color #030303
      font-size 32rpx
      &:last-child
        border none
      div:last-child
        color #8F8E94
        text-align right

  // margin-right 13px
  .register-tip
    color #B8B8B8
    font-size 28rpx
    line-height 40rpx
    margin-top 16rpx
    margin-left 28rpx

  .button
    margin-top 20rpx
    margin-bottom 20rpx
    width 80%
    background #2E2E2E
    color #fff
</style>
