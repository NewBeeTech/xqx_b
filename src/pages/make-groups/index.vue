<template>
	<div class="main">
		<scroll-view scroll-y='true' style='height: 100%;'>
			<div class="goodName listStyle padding">
				<label>商品名称</label>
				<div>
					<input v-model="info.name" type="text" placeholder="请输入商品名称" v-bind="info.name" />
				</div>
			</div>
			<div class="goodLogo listStyle padding" @click="chooseImage(1, 'logo')">
				<label>商品图片</label>
        <img v-if="logo" :src="logo" alt="">
				<div v-else>
					<img src="/static/imgs/圆角矩形2拷贝2@2x.png" />
				</div>
			</div>
			<div class="padding">
				<div class="listStyle" @click="navGo('/pages/good-remark/main')">
					<label>商品说明</label>
					<div>
						<img src="/static/imgs/right.png" alt="" />
					</div>
				</div>
				<div class="listStyle">
					<label>商品价格</label>
					<div>
						<input v-model="info.price" v-bind="info.price" type="digit" placeholder="请输入商品价格" />
					</div>
				</div>
				<div class="listStyle">
					<label>拼团价</label>
					<div>
						<input v-model="info.groupPrice" type="digit" placeholder="请输入拼团价格" v-bind="info.groupPrice"/>
					</div>
				</div>
				<div class="listStyle">
					<label>返金比例</label>
					<div>
						<input v-model="info.ratio" type="digit" placeholder="请设置返金比例" v-bind="info.ratio"/>
					</div>
				</div>
				<div class="listStyle">
					<label>单笔交易返养老金（元）</label>
					<div>
						<input v-model="info.currency" type="digit" placeholder="¥0.00" />
					</div>
				</div>
				<div class="listStyle">
					<label>参团人数</label>
					<div>
						<input v-model="info.groupPersonNum" type="number" placeholder="请输入2～200" @blur="checkPersonNum"/>
					</div>
				</div>
				<div class="listStyle">
					<label>拼团有效期</label>
					<div>
						<input type="number" disabled  value="24h" />
					</div>
				</div>
			</div>
			<div class="padding remark">
				<div>拼团规则</div>
				<textarea auto-height placeholder="请填写拼团规则" v-model="info.rule"></textarea>
			</div>
			<div class="serviceMsg padding">
				<div>服务说明</div>
				<div class="serviceList">
					<img src="/static/imgs/dui.png" />
					<div>
						<p>全场包邮</p>
						<p>所有商品均无条件包邮</p>
					</div>
				</div>
				<div class="serviceList">
					<img src="/static/imgs/dui.png" />
					<div>
						<p>消费即得养老金</p>
						<p>每一笔消费都能获得相应的比例的养老金</p>
					</div>

				</div>
				<div class="serviceList">
					<img src="/static/imgs/dui.png" />
					<div>
						<p>假一赔十</p>
						<p>若收到的商品是假冒品牌，可获得加倍的赔偿</p>
					</div>
				</div>
			</div>
			<div class="makeBtn" v-if="type == 0">
				<div @click="saveGroups">保存</div>
				<div @click="makeGroups">创建并上架</div>
			</div>
			<div class="makeBtn2" v-if='type == 1'>
				<div>删除</div>
				<div>编辑</div>
				<div>上架</div>
			</div>
		</scroll-view>
	</div>

</template>

<script>
	import { wxRequest } from '@/api'
  import {qiniu} from "../../api/qiniuUploader"

	export default {
		data() {
			return {
				type: 0,
        logo: '',
        info:{}
			}
		},
		onLoad: function() {
			let that = this;
			let type = that.$root.$mp.query.type;//入口类型0:创建，1:未开始，2:进行中/已完成
			that.type = type;
			if(type == 0){
	  			wx.setNavigationBarTitle({
	  				title:'创建活动'
	  			})

	  		}else{
	  			 wx.setNavigationBarTitle({
	  				title:'活动详情'
	  			})
	  		}
		},

		mounted() {},
		methods: {
      checkPersonNum(e){
        if (e){
          console.log(e);
        }
      },
      deleteImage (index){
        var self = this;
        wx.showModal({
          title: '是否要删除图片',
          success: function(res) {
            if (res.confirm) {
              console.log(self.images)
              self.images.splice(index,1);
              console.log(self.images)
            } else if (res.cancel) {

            }
          }
        })
      },
      chooseImage:function (count, type) {
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
              that.uploadImage("ccpp-logo",tempFilePaths[0]);
            } else {
              that[type] = [...that[type], ...tempFilePaths]
              console.log(that.images)
              that.uploadImage("ccpp-mpic",that.images[0]);
            }


          }
        })
      },
      uploadImage:function(bucket,filePaths){
        var self = this;
        wxRequest('getQiniuToken', {bucket:bucket})
          .then(res => {
            console.log(res)

            if (res.code == 1){
              var token = res.value
              var date = new Date()

              qiniu.upload(filePaths, (res) => {
                console.log(res);
                var type = bucket.replace("ccpp-","");
                var imageURL = "https://"+type+".denong.com/"+res.key;
                console.log(imageURL);

                if (type == "logo") {
                  self.info.imgUrl = imageURL;
                }
              },(error) => {
                console.log('error: ' + error);
              },{
                region: 'NCN',
                domain: bucket,
                key: date.getTime()+".jpg",
                uptoken: token

              },(res) => {

              });

            }else {
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
			//创建并上架活动
			makeGroups:function() {
				let self = this;

				var mark = JSON.parse(wx.getStorageSync("remark"));
        self.info.explainContent = mark.explainContent;
        self.info.explainImgUrl = mark.explainImgUrl;
        self.info.groupAging = 24;
        self.info.status = 1;

        for (let key in self.info) {
          if (!key){
            if (!self.info[key]){
              wx.showToast({
                title:"请传入完整信息",
                duration:2000
              })
              return;
            }
          }
        }
				wxRequest('createGoodsGroup',self.info)
					.then(res => {
						console.log(res)
						//				that.codeImg = res.value
            wx.navigateBack()
					}).catch(err => {
						console.log(err)
          wx.showToast({
            title:err.message,
            duration:2000
          })
					})
			},
			//保存活动
			saveGroups:function() {
        let self = this;
        var mark = JSON.parse(wx.getStorageSync("remark"));
        self.info.explainContent = mark.explainContent;
        self.info.explainImgUrl = mark.explainImgUrl;
        self.info.status = 0;
        self.info.groupAging = 24;
        wxRequest('createGoodsGroup',self.info)
          .then(res => {
            console.log(res)
            wx.navigateBack()
            //				that.codeImg = res.value
          }).catch(err => {
          console.log(err)
        })
			},
			submit:function() {
				wx.navigateTo({
					url: '/pages/merchant-edit/main'
				})
			}
		}
	}
</script>

<style scoped>
	.main {
		width: 100%;
		height: 100%;
		font-size: 24rpx;
		position: relative;
		border-top: 1rpx solid #efefef;
		font-size: 30rpx;
		font-weight: 100;
		background: #f0f0f0;
	}

	.listStyle {
		height: 96rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.listStyle>div {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}

	.listStyle>div>input {
		text-align: right;
	}

	.padding {
		padding: 0 35rpx;
		background: white;
	}

	.listStyle label {
		color: #333;
	}

	.listStyle img {
		width: 15rpx;
		height: 30rpx;
	}

	.goodName,
	.goodLogo {
		height: 164rpx;
		background: white;
		margin-bottom: 18rpx;
	}

	.goodLogo img {
		width: 116rpx;
		height: 116rpx;
	}

	.remark {
		padding: 30rpx 35rpx;
	}

	.remark div {
		line-height: 80rpx;
		color: #000;
	}

	.remark textarea {
		height: 100rpx;
		color: #333;
		font-weight: 100;
	}

	.placeholder {
		color: #999;
	}

	.serviceMsg>div:nth-child(1) {
		line-height: 100rpx;
		border-top: 1rpx solid #f0f0f0;
	}

	.serviceList {
		display: flex;
		font-size: 28rpx;
		padding: 20rpx 0;
		/*align-items: center;*/
	}

	.serviceList>div>p:nth-child(2) {
		color: #999;
	}

	.serviceList img {
		width: 42rpx;
		height: 42rpx;
		display: block;
		margin-right: 20rpx;
	}

	.makeBtn {
		padding: 35rpx;
		border-top: 1rpx solid #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background: white;
	}

	.makeBtn>div {
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		flex: 1;
		border: 1rpx solid #FEA401;
		color: #FEA401;
		border-radius: 10rpx;
	}

	.makeBtn>div:nth-child(2) {
		background: #FEA401;
		color: white;
		margin-left: 20rpx;
	}

	.makeBtn2 {
		padding: 35rpx;
		border-top: 1rpx solid #f0f0f0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background: white;
	}

	.makeBtn2>div {
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		flex: 1;
		border: 1rpx solid #FEA401;
		color: #FEA401;
		border-radius: 10rpx;
	}

	.makeBtn2>div:nth-child(2) {
		margin: 0 20rpx;
	}

	.makeBtn2>div:nth-child(3) {
		background: #FEA401;
		color: white;
	}
</style>
