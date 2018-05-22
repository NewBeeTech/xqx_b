<template>
	<div class="wapper">
		<div class="c_spec7_1"><img src="/static/imgs/code_bg.png" alt=""></div>
		<div class="c_spec7_2">
			<div class="c_spec7_3"><img :src="codeImg" alt=""></div>
			<div class="c_spec7_4">扫一扫向我付款</div>
		</div>
		<div class="c_spec7_5" @click="saveImg">保存收款码到相册</div>
		<div class="c_spec7_12">
			<div class="c_spec7_10">
				<div class="c_spec7_11">收款优惠活动</div>
			 <div class="active_list" @click="navGo('/pages/preferential-active/main')">
				 <div v-if="full" class="list">
					 <div v-for="(item,key) in full" :key="index" class="item">
					 	满{{item.full}}减{{item.subtract}}
					 </div>
				 </div>
				 <div v-else-if="rebate" class="list">
				 	  {{rebate}}
				 </div>
				 <div v-else class="list">
				 	  设置
				 </div>
				 <img class="icon" src="/static/imgs/right.png" alt="">
			 </div>
		 </div>
		</div>
	</div>
</template>

<script>
	import { wxRequest } from '@/api'
	const Default=require("../../api//Default.js");
	export default {
		data() {
			return {
				token:'',
				codeImg: '',
				full:[{full:10,subtract:2},{full:10,subtract:2}],
				rebate:''
			}
		},
		onLoad: function() {
			const that=this;
			this.getCodeImg()
			wx.getStorage({
			  key: 'token',
			  success: function(res) {
			      console.log(res.data)
						that.token=res.data;
						that.getActive()
			  }
			})
		},
		methods: {
			//获取活动
			getActive(){
				const that=this,data1={sessionKey:this.token,discountMode:'MD'},data2={sessionKey:this.token,discountMode:'MR'};
				wx.request({
          url: Default.HOST+'xcxm/MerchantController/merchantQueryActivities',
          data:data1,
          method:'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function(res) {
						if(res.data.code==1){
							that.full=res.data.value;
						}
					}
				})
				wx.request({
          url: Default.HOST+'xcxm/MerchantController/merchantQueryActivities',
          data:data2,
          method:'POST',
          header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function(res) {
					   if(res.data.code==1){
							 that.rebate=res.data.value;
						 }
					}
				})
			},
			//获取二维码
			getCodeImg() {
				let that = this;
				wxRequest('getMerchantMoneyCollectQr')
					.then(res => {
						console.log(res)
						that.codeImg = res.value
					}).catch(err => {
						console.log(err)
					})
			},
			saveImg() {
					let that = this;
				wx.getImageInfo({
					src: that.codeImg,
					success: function(res) {
						console.log(res.path)
						let path = res.path;
						wx.saveImageToPhotosAlbum({
							filePath: path,
							success(res) {
								wx.showToast({
									title: '保存成功',
									icon: 'success',
									duration: 2000
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.wapper {
		height: 100%;
		background: #f5f5f5;
		padding-top: 17px;
	}

	.icon {
		width: 11px;
		height: 18px;
		position: relative;
		top: 3px
	}

	.c_spec7_1 {
		margin: auto;
		width: 343px;
		height: 50px;
		background-color: yellow;
	}

	.c_spec7_1 img {
		width: 100%;
		height: 100%;
	}

	.c_spec7_2 {
		padding-top: 27px;
		margin: auto;
		width: 343px;
		/*height: 300px;*/
		padding-bottom: 22px;
		background-color: #FFFFFF;
		box-sizing: border-box;
		border-bottom: 1px solid #adadad;
	}

	.c_spec7_3 {
		width: 217px;
		margin: auto;
		height: 217px;
		background-color: black;
	}

	.c_spec7_3 img {
		width: 100%;
		height: 100%;
	}

	.c_spec7_4 {
		width: 100%;
		text-align: center;
		color: #000;
		font-weight: bold;
		font-size: 15px;
		margin-top: 22px;
	}

	.c_spec7_5 {
		width: 343px;
		height: 42.5px;
		margin: auto;
		background-color: #FFFFFF;
		color: #333;
		font-size: 13px;
		text-align: center;
		line-height: 42.5px;
		border: none;
		display: block;
	}

	.c_spec7_6 {
		width: 100%;
		height: 50px;
		background-color: #FFFFFF;
		margin-top: 15px;
	}

	.c_spec7_7 {
		width:686rpx;
		height: 100%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		color: #000;
	}
  .c_spec7_12{
		width:100%;
		background-color: white;
		margin-top:10px;
		padding:15px 0;
		position: fixed;
		bottom: 0;
	}
	.c_spec7_10 {
		width:686rpx;
		margin:auto;
		font-size: 15px;
		color: #000;
		display: flex;
		justify-content: space-between;
		align-items: top;
	}
	.active_list{
		display: flex;
		justify-content: space-between;
	}
	.icon{margin-left:10px;}
	.item{margin-top:10px;}
	.list .item:nth-of-type(1){margin-top:0;}
</style>
