<template>
  <div class="container">
    <div class="user-from top sec">
      <div class="text">商户名称</div>
      <div class="input">
        <input type="text" minlength="1" maxlength="15" placeholder="请输入商户名称" placeholder-style='font-size: 15px' v-model="info.name" @blur="checkName" :value="info.name">
      </div>
    </div>
    <div class="user-from  sec">
      <div class="text">设置登录密码</div>
      <div class="input">
        <input @input="bindKeyInput" type="text" maxlength="16" minlength="8" placeholder="请设置登录密码" placeholder-style='font-size: 15px' v-model="info.appPasswd"  @blur="checkPassword" :value="pass">
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
            <div class="choose" @click="chooseImage(4,'images')" v-if="images.length < 4">
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
        <!-- <div>所在地区</div> -->
        <div>选择省/市/区</div>
        <!-- <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
          <div class="picker">
            {{region[0]}}/{{region[1]}}/{{region[2]}} <img class="right_" src="/static/imgs/right.png" alt="">
          </div>
        </picker> -->
        <picker v-if="isload" mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" range-key="araename" :range="objectMultiArray">
          <view class="picker">
            {{objectMultiArray[0][multiIndex[0]].araename}}/{{objectMultiArray[1][multiIndex[1]].araename}}/{{objectMultiArray[2][multiIndex[2]].araename}}
          </view>
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

    <div class="select-line">
      <div class="register-tip">推荐您注册的人员编号，如有请填写</div>
    </div>

    <div class="select-container">
      <div class="select-container">
        <div class="select-line  top sec">
          <div>推荐人编号</div>
          <div class="input">
            <input type="digit" max-length="15" placeholder="请输入推荐人编号" placeholder-style='font-size: 15px' v-model="info.counterid">
          </div>
        </div>
        <div class="select-line  top sec">
          <div>客服电话</div>
          <div class="input">
            <input type="digit" max-length="14" placeholder="请输入客服电话" placeholder-style='font-size: 15px' v-model="info.storePhone" @blur="checktel">
          </div>
        </div>
        <div class="select-line  top sec">
          <div>邮箱</div>
          <div class="input">
            <input type="text" max-length="14" placeholder="请输入邮箱" placeholder-style='font-size: 15px' v-model="info.contractEmail" @blur="checkemail">
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
            <input type="text" placeholder="请输入联系人姓名" placeholder-style='font-size: 15px' @blur="checklname"
                   v-model="info.personInChargeName" :value="info.personInChargeName">
          </div>
        </div>
        <div class="select-line">
          <div>联系人电话</div>
          <div class="input">
            <input type="digit" placeholder="请输入联系人电话" placeholder-style='font-size: 15px' @blur="checkphone"
                   v-model="info.personInChargePhone" :value="info.personInChargePhone">
          </div>
        </div>
        <div class="select-line">
          <div>返金设置</div>
          <div class="percent">
            <div class="input">
              <input type="digit" placeholder="请设置返金比例" placeholder-style='font-size: 15px' @blur="chectratio"
                     v-model="info.ratio" :value="info.ratio">
            </div>
            <div v-if="ishow" class="danwei">
               %
            </div>
          </div>
        </div>
        <!-- <div class="select-line">
          <div>积分设置</div>
          <div class="input">
            <input type="digit" placeholder="最小0.1最大80" placeholder-style='font-size: 15px'
                   v-model="info.integralRatio" min="0.1" max="80" :value="info.integralRatio">
          </div>
        </div> -->
      </div>
      <button class="submit" @click="toSava">保存</button>
    </div>
  </div>
</template>

<script>
  import {wxRequest} from '@/api'
  import {qiniu} from "../../api/qiniuUploader"
  var Default = require("../../api//Default.js");

  export default {
    data() {
      return {
        ishow:true,
        pass:'',
        task:'',
        token:'',
        images: [],
        logo: '',
        yyTime: {},
        area:{},
        shangq: '',
        region:'',
        type: 0,
        info: {
          ratio:'',
          carouselFigure:{}
        },
        imageIndex: 0,
        mark:"",
        objectMultiArray: [[], [], []],
        multiIndex: [0, 0, 0],
        isload:false
      }
    },
    onLoad: function (option) {
      let that = this
      let type = this.$root.$mp.query.type
      const token=wx.getStorageSync('token');
      const rdata={proKey:"0",token:token}
      let arrindex=0;
      let arr=[];
      this.token=token;
      console.log(rdata)
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
      //that.objectMultiArray=[[{araename: ""}],[{araename: ""}],[{araename: "", lng: 121.472641, id: 0, lat: 31.231707}]]
      wxRequest('getProvince', rdata)
        .then(res => {
          console.log(res);
          if (res.code == 1) {
             that.objectMultiArray[0]=res.value
             console.log(res.value)
             that.area.sheng=res.value[0].araename;
             arrindex++
             if(arrindex==3){
               that.isload=true;
             }
          }
          if (res.code == 4000) {
            wx.showToast({
              title: '网络错误，请稍后再试',
              icon: 'none',
              duration: 2000
            })
          }
        })
        wxRequest('getCity', {cityKey:"110000",token:rdata.token})
          .then(res => {
            console.log(res);
            if (res.code == 1) {
               that.objectMultiArray[1]=res.value
               that.area.shi=res.value[0].araename;
               arrindex++
               if(arrindex==3){
                 that.isload=true;
               }
            }
            if (res.code == 4000) {
              wx.showToast({
                title: '网络错误，请稍后再试',
                icon: 'none',
                duration: 2000
              })
            }
          })

        wxRequest('getCounty', {countyKey:'110100',token:rdata.token})
          .then(res => {
            console.log(res);
            if (res.code == 1) {
               arrindex++
               that.objectMultiArray[2]=res.value
               that.area.id=res.value[0].id;
               that.area.q=res.value[0].araename;
               if(arrindex==3){
                 that.isload=true;
               }
               wx.setStorageSync('areaid',res.value[0].id)
            }
            if (res.code == 4000) {
              wx.showToast({
                title: '网络错误，请稍后再试',
                icon: 'none',
                duration: 2000
              })
            }
          })
    },
    computed: {
      isLang() {
        return this.$root.$mp.appOptions.from ? 1 : 2
      }
    },

    onShow() {
      console.log('onshow')
      var address = wx.getStorageSync("chooseAddress");
      if (address) {
        address = JSON.parse(address);
        this.info.latitude = address.location.lat;
        this.info.longitude = address.location.lng;
        this.mark ='已标记'|| address.title;
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
      filteremoji(content){
          var ranges = [
              '\ud83c[\udf00-\udfff]',
              '\ud83d[\udc00-\ude4f]',
              '\ud83d[\ude80-\udeff]'
          ];
          var emojireg = content .replace(new RegExp(ranges.join('|'), 'g'), '');
          return emojireg;
      },
      bindKeyInput(e){
        console.log(e)
        const that=this;
        this.pass=e.mp.detail.value
        if(!/[a-zA-Z0-9]+$/.test(e.mp.detail.value)){
          let str='',resstr=this.info.appPasswd
          for(var i=0;i<resstr.length;i++){
            if(/[a-zA-Z0-9]+$/.test(resstr.charAt(i))){
              str+=resstr.charAt(i)
            }
          }
          console.log(str)
          this.pass=str;
          this.info.appPasswd=str;
          wx.showToast({
            title: '只支持数字和字母',
            icon: 'none',
            duration: 3000
          })
        }
        console.log(this.info.appPasswd)
      },
      checkperman(e){
        if(!/^[0-9]+.?[0-9]*$/.test(e.target.value)){
          wx.showToast({
            title: '请输入正确的推荐人编号',
            icon: 'none',
            duration: 3000
          })
        }
      },
      checktel(e){
        if(!/^[0-9]{1,14}$/.test(e.target.value)){
          wx.showToast({
            title: '请输入正确的客服电话',
            icon: 'none',
            duration: 3000
          })
        }
      },
      chectratio(e){
        if(e.target.value>80||e.target.value<0.1){
          wx.showToast({
            title: '返金比例设置范围0.1~80',
            icon: 'none',
            duration: 3000
          })
        }
      },
      checklname(e){
        if(!/^[A-Za-z\u4e00-\u9fa5]+$/.test(e.target.value)){
          wx.showToast({
            title: '只支持汉字和字母',
            icon: 'none',
            duration: 3000
          })
        }
      },
      checkphone(e){
        if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(e.target.value)){
          wx.showToast({
            title: '请输入正确手机号',
            icon: 'none',
            duration: 3000
          })
        }
      },
      checkName(e){
        console.log(e);
        if (e.target.value.length==0){
          wx.showToast({
            title: '请输入商户名称',
            icon: 'none',
            duration: 3000
          })
        }
      },
      checkPassword(e){
        console.log(e);
        if (e.target.value.length==0){
          wx.showToast({
            title: '请设置登录密码',
            icon: 'none',
            duration: 2000
          })
        }else if(e.target.value.length<8){
          wx.showToast({
            title: '登录密码位数应为8-16位',
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
              that.uploadImage("ccpp-mpic", that.images[that.images.length-1]);
            }


          }
        })
      },
      uploadImage: function (bucket, filePaths) {
        var self = this;
        const index=self.imageIndex;
        self.imageIndex=self.imageIndex+1;
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
                  if (index == 0) {
                    self.info.storeBackgroundPicture = imageURL;
                  } else {
                    if (index == 1) {
                      self.info.carouselFigure.imgOne = imageURL
                    }
                    if (index == 2) {
                      self.info.carouselFigure.imgTwo = imageURL
                    }
                    if (index == 3) {
                      self.info.carouselFigure.imgThree = imageURL
                    }
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
      bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.mp.detail.value)
        this.multiIndex= e.mp.detail.value
        console.log(this.objectMultiArray[2][e.mp.detail.value[2]].id)
        this.areaid=this.objectMultiArray[2][e.mp.detail.value[2]].id;
        this.area={sheng:this.objectMultiArray[0][e.mp.detail.value[0]].araename,shi:this.objectMultiArray[1][e.mp.detail.value[1]].araename,q:this.objectMultiArray[2][e.mp.detail.value[2]].araename,id:this.objectMultiArray[2][e.mp.detail.value[2]].id}
        wx.setStorageSync('areaid',this.area.id)
      },
      bindMultiPickerColumnChange: function (e) {
        const that=this;
        let currentpage=getCurrentPages();
        currentpage=currentpage[0];
        console.log(currentpage.data)
        console.log(e)
        console.log('修改的列为', e.mp.detail.column, '，值为', e.mp.detail.value);
        if(that.task){
          that.task.abort()//中断上一次请求保持数据最新
        }
        if(e.mp.detail.column==0){
          console.log(this.token)
          let Arraydata=[that.objectMultiArray[0],[{araename: "加载中", lng: 121.472641, id: 0, lat: 31.231707}],[{araename: "加载中", lng: 121.472641, id: 0, lat: 31.231707}]];
          let pagedata=currentpage.data;
          pagedata.$root[0].objectMultiArray=Arraydata;
          this.objectMultiArray=Arraydata;
          this.multiIndex[1]=0;
          this.multiIndex[2]=0;
          this.objectMultiArray=Arraydata
          //currentpage.setData({$root:pagedata.$root})
          that.task=wx.request({
            url: Default.HOST+'xcxm/UtilsController/getCity', //仅为示例，并非真实的接口地址
            data: {cityKey:this.objectMultiArray[0][e.mp.detail.value].id,token:this.token,sessionKey:this.token},
            method:'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(res) {
              console.log(res.data)
              if (res.data.code == 1) {
                 let Arraydata=[that.objectMultiArray[0],res.data.value,that.objectMultiArray[2]];
                 let pagedata=currentpage.data;
                 pagedata.$root[0].objectMultiArray=Arraydata;
                 that.objectMultiArray=Arraydata;
                 //that.multiIndex[1]=0;
                 currentpage.setData({$root:pagedata.$root})
                 that.task=wx.request({
                   url: Default.HOST+'xcxm/UtilsController/getCounty', //仅为示例，并非真实的接口地址
                   data: {countyKey:that.objectMultiArray[1][0].id,token:that.token,sessionKey:that.token},
                   method:'POST',
                   header: {
                       'content-type': 'application/x-www-form-urlencoded' // 默认值
                   },
                   success: function(res) {
                     console.log(res.data)
                     if (res.data.code == 1) {
                       let Arraydata=[that.objectMultiArray[0],that.objectMultiArray[1],res.data.value];
                       let pagedata=currentpage.data;
                       pagedata.$root[0].objectMultiArray=Arraydata;
                       that.objectMultiArray=Arraydata;
                       //that.multiIndex[2]=0;
                       currentpage.setData({$root:pagedata.$root})
                     }
                     if (res.data.code == 4000) {
                       wx.showToast({
                         title: '网络错误，请稍后再试',
                         icon: 'none',
                         duration: 2000
                       })
                     }
                   }
                 })
              }
              if (res.data.code == 4000) {
                wx.showToast({
                  title: '网络错误，请稍后再试',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })

          // wxRequest('getCity', {cityKey:this.objectMultiArray[0][e.mp.detail.value].id,token:this.token})
          //   .then(res => {
          //     console.log(res);
          //     console.log(res.code == 1)
          //     if (res.code == 1) {
          //        let Arraydata=[that.objectMultiArray[0],res.value,that.objectMultiArray[2]];
          //        let pagedata=currentpage.data;
          //        pagedata.$root[0].objectMultiArray=Arraydata;
          //        that.objectMultiArray=Arraydata;
          //        currentpage.setData({$root:pagedata.$root})
          //     }
          //     if (res.code == 4000) {
          //       wx.showToast({
          //         title: '网络错误，请稍后再试',
          //         icon: 'none',
          //         duration: 2000
          //       })
          //     }
          //   })
        }else if(e.mp.detail.column==1){
          let Arraydata=[that.objectMultiArray[0],that.objectMultiArray[1],[{araename: "加载中", lng: 121.472641, id: 0, lat: 31.231707}]];
          let pagedata=currentpage.data;
          pagedata.$root[0].objectMultiArray=Arraydata;
          that.objectMultiArray=Arraydata;
          that.multiIndex[2]=0;
          currentpage.setData({$root:pagedata.$root})
          that.task=wx.request({
            url: Default.HOST+'xcxm/UtilsController/getCounty', //仅为示例，并非真实的接口地址
            data: {countyKey:that.objectMultiArray[1][e.mp.detail.value].id,token:this.token,sessionKey:this.token},
            method:'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(res) {
              console.log(res.data)
              if (res.data.code == 1) {
                let Arraydata=[that.objectMultiArray[0],that.objectMultiArray[1],res.data.value];
                let pagedata=currentpage.data;
                pagedata.$root[0].objectMultiArray=Arraydata;
                that.objectMultiArray=Arraydata;
                that.multiIndex[2]=0;
                currentpage.setData({$root:pagedata.$root})
              }
              if (res.data.code == 4000) {
                wx.showToast({
                  title: '网络错误，请稍后再试',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
          // wxRequest('getCounty', {countyKey:that.objectMultiArray[1][e.mp.detail.value].id,token:that.token})
          //   .then(res => {
          //     console.log(res);
          //     if (res.code == 1) {
          //       let Arraydata=[that.objectMultiArray[0],that.objectMultiArray[1],res.value];
          //       let pagedata=currentpage.data;
          //       pagedata.$root[0].objectMultiArray=Arraydata;
          //       that.objectMultiArray=Arraydata;
          //       currentpage.setData({$root:pagedata.$root})
          //     }
          //     if (res.code == 4000) {
          //       wx.showToast({
          //         title: '网络错误，请稍后再试',
          //         icon: 'none',
          //         duration: 2000
          //       })
          //     }
          //   })
        }
        let data=this.multiIndex
        data[e.mp.detail.column] = e.mp.detail.value;
        this.multiIndex=data;
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
        console.log(this.area)
        this.region=this.area.sheng+'/'+this.area.shi+'/'+this.area.q;
        this.info.appLoginname = wx.getStorageSync('phone');
        this.info.sessionKey=this.token;
        var message = "";
        if (!this.info.name){message = "请输入商户名称"}else if(this.info.name!=this.filteremoji(this.info.name)){message = "商户名不支持表情符"}
        if (!this.info.appPasswd){message = "请设置登录密码"}else if(this.info.appPasswd.length<8){message = "登录密码位数应为8-16位"}
        if (!this.logo){message = "请上传商户logo"}
        if (!this.info.businessIndName){message = "请输入行业名称"}
        if (this.images.length<=0){message = "请上传商品图片"}else{this.info.carouselFigure=this.info.carouselFigure.imgOne?JSON.stringify(this.info.carouselFigure):this.info.carouselFigure}
        if (!this.info.businessIndName){message = "请选择行业"}
        if (!this.region||this.area.shi=='加载中'||this.area.q=='加载中'||!this.area.shi||!this.area.q||!this.area.sheng){message = "请选择所在地区";}else{this.info.businessCityName=this.region;this.info.businessLicenseAreaid=this.area.id}
        if (!this.mark){message = "请选择地图标记";}
        if (!this.info.businessDistrict){message = "请选择商圈"}
        if (!/^[0-9]{1,14}$/.test(this.info.storePhone)){message = "请输入正确的客服电话"}
        if (!this.info.businessHours){message = "请选择营业时间"}
        if (!this.info.detailAddress){message='请填写详细地址'}else if(this.info.detailAddress!=this.filteremoji(this.info.detailAddress)){message = "详细地址不支持表情符"}
        if (!this.info.personInChargeName){message = "请输入联系人姓名"}else if(!/^[A-Za-z\u4e00-\u9fa5]+$/.test(this.info.personInChargeName)){message = "联系人姓名只支持汉字和字母"}
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.info.personInChargePhone)){message="请输入正确的联系人电话"}
        if (!this.info.ratio){message = "请设置返金比例"}else if(this.info.ratio>80||this.info.ratio<0.1){message = "返金比例设置范围0.1~80"}else if(!/^[0-9]+([.][0-9]{1}){0,1}$/.test(this.info.ratio)){message = "返金比例请保留一位小数"}
        // if (!this.info.integralRatio){message = "请设置积分设置"}
        console.log(this.info)
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
            if(res.code==1){
              wx.navigateTo({
                url: '/pages/index/main'
              })
            }else{
              wx.hideLoading();
              wx.showToast({
                title:res.errorMsg,
                icon:"none",
                duration: 2000
              })
            }

          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .nomargin{margin-top:0 !import;}
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
        vertical-align middle
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
      .percent
        display flex
        align-items center

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
