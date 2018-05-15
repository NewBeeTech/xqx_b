<template>
	<div class="main">
		<scroll-view scroll-y='true' style='height: 100%;'>

			<div class="padding remark">
				<textarea :disabled="onlyView" auto-height placeholder="请填写商品说明" v-model="info.explainContent"></textarea>
			</div>
			<div class="goodImg"  >
				<div class="good-imgs">
					<div v-if="info.explainImgUrl.length < 10">
						<img v-if="!onlyView" class="add-img" @click="chooseImage(4, 'images')"  src="/static/imgs/add-imgs.png" />
					</div>
					<div class="img-container" v-for="(item, index) in info.explainImgUrl"  >
						<img v-if="!onlyView" class="close-img" src="/static/imgs/close-img.png" style="width: 40rpx; height: 40rpx;" @click="deleteImg(index)" />
		    		<img class="good-img" :src="item" alt="" @click="previewImg(index)" :key="index">
	        </div>
				</div>

				<label v-if="info.explainImgUrl.length < 10 && !onlyView">	请上传商品图片</label>
			</div>
		</scroll-view>
	</div>

</template>

<script>
  import { wxRequest } from '@/api'
  import {qiniu} from "../../api/qiniuUploader"

	export default {
  data () {
    return {
      current: 0,
			onlyView: false,
      info:{
				explainContent: '',
        explainImgUrl:[]
      },
      images: [],
    }
  },
	onLoad() {
		let onlyView = this.$root.$mp.query.onlyView;
		// console.warn('onlyView: ', onlyView);
		if (onlyView == 'true') {
			this.onlyView = true;
		} else {
			this.onlyView = false;
		}
		try {
			var discountInfo = JSON.parse(wx.getStorageSync("group-info"));
			console.log('discountInfo', discountInfo);
			if (Array.isArray(discountInfo.explainImgUrl)) {
			} else {
				discountInfo.explainImgUrl = JSON.parse(discountInfo.explainImgUrl);
			}
			this.info = discountInfo;
		} catch(e) {
			console.warn(e);
		}
	},
  mounted () {

  },
  onUnload(){
    wx.setStorageSync("group-info",JSON.stringify(this.info));
		this.info = {
			explainContent: '',
			explainImgUrl:[]
		};
  },
  methods: {
		deleteImg: function(index) {
			console.log(index);
			let explainImgUrl = this.info.explainImgUrl;
			explainImgUrl.splice(index, 1);
			console.log(explainImgUrl);
			this.info.explainImgUrl = explainImgUrl;
		},
    previewImg:function (index) {
      let that = this
      wx.previewImage({
        current: that.info.explainImgUrl[index], // 当前显示图片的http链接
        urls: that.info.explainImgUrl // 需要预览的图片http链接列表
      })
    },
    chooseImage:function (count, type) {
      let that = this
      wx.chooseImage({
        count: 9, // 默认9
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
            // that.uploadImage("ccpp-mpic",that.images[0]);
            that.uploadImage("ccpp-mpic", tempFilePaths);
          }


        }
      })
    },
    uploadImage:function(bucket,filePaths){
      var self = this;
			filePaths.map(filePath => {
				wxRequest('getQiniuToken', {bucket:bucket})
	        .then(res => {
	          console.log(res)

	          if (res.code == 1){
	            var token = res.value
	            var date = new Date()

	            qiniu.upload(filePath, (res) => {
	              console.log(res);
	              var type = bucket.replace("ccpp-","");
	              var imageURL = "https://"+type+".denong.com/"+res.key;
	              console.log(imageURL);

								if (self.info.explainImgUrl.length < 10) {
	              	self.info.explainImgUrl.push(imageURL);
								}
								console.warn(self.info.explainImgUrl);
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
			})
    },
    bindchange () {

    },
    submit () {
      wx.navigateTo({
        url: '/pages/merchant-edit/main'
      })
    }
  }
}
</script>

<style scoped>
	.good-imgs {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.good-img {
		margin: 10rpx 10rpx;
		width: 116rpx;
		height: 116rpx;
	}
	.close-img {
		position: absolute;
		width: 10rpx;
		height: 10rpx;
		right: 100rpx;
		top: -20rpx;
	}
	.img-container {
		position: relative;
	}
	.main {
		width: 100%;
		height: 100%;
		font-size: 24rpx;
		position: relative;
		border-top: 1rpx solid #efefef;
		font-size: 30rpx;
		font-weight: 100;
		background: #fff;
	}

	.remark{
		padding: 30rpx 35rpx 0;
	}
	.remark div{
		line-height: 80rpx;
		color: #000;
	}
	.remark textarea{
		min-height: 160rpx;
		color: #333;
		font-weight: 100;
		width: 100%;
	}
	.goodImg{
		margin-top: 40rpx;
		padding: 0 35rpx;
	}
	.goodImg>div{
		display: flex;
		margin-bottom: 20rpx;
	}
	.add-img{
		width: 120rpx;
		height: 116rpx;
		margin-right: 20rpx;
	}
</style>
