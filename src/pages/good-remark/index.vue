<template>
	<div class="main">
		<scroll-view scroll-y='true' style='height: 100%;'>

			<div class="padding remark">
				<textarea placeholder="请填写商品说明" v-model="info.explainContent"></textarea>
			</div>
			<div class="goodImg"  @click="chooseImage(4, 'images')" >

        <div >
          <img :src="item" alt="" @click="previewImg(index)" v-for="(item, index) in images" :key="index">
        </div>
				<div>

					<img src="/static/imgs/圆角矩形2拷贝2@2x.png" />
				</div>
				<label>	请上传商品图片</label>
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
      info:{
        explainImgUrl:[]
      },
      images: [],
    }
  },
  mounted () {

  },
    onUnload(){
    wx.setStorageSync("remark",JSON.stringify(this.info));
    },
  methods: {
    previewImg:function (index) {
      let that = this
      wx.previewImage({
        current: that.images[index], // 当前显示图片的http链接
        urls: that.images // 需要预览的图片http链接列表
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

              self.info.explainImgUrl.push(imageURL);
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
	}
	.goodImg{
		padding: 0 35rpx;
	}
	.goodImg>div{
		display: flex;
		margin-bottom: 20rpx;
	}
	.goodImg>div>img{
		width: 116rpx;
		height: 116rpx;
	}
</style>
