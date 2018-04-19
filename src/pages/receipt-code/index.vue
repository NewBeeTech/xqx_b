<template>
	<div class="wapper">
		<div class="c_spec7_1"><img src="/static/imgs/code_bg.png" alt=""></div>
		<div class="c_spec7_2">
			<div class="c_spec7_3"><img :src="codeImg" alt=""></div>
			<div class="c_spec7_4">扫一扫向我付款</div>
		</div>
		<div class="c_spec7_5" @click="saveImg">保存收款码到相册</div>
		<div class="c_spec7_6">
			<div class="c_spec7_7">
				<div class="c_spec7_8">收款优惠活动</div>
				<div class="c_spec7_9">
					设置 <img class="icon" src="/static/imgs/right.png" alt="">
				</div>
			</div>
		</div>
		<div class="c_spec7_10"></div>
	</div>
</template>

<script>
	import { wxRequest } from '@/api'
	export default {
		data() {
			return {
				codeImg: ''
			}
		},
		onLoad: function() {
			this.getCodeImg()
		},
		methods: {
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
		width: 343px;
		height: 100%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 15px;
		color: #000;
	}

	.c_spec7_10 {
		width: 99%;
		height: 121px;
		position: absolute;
		bottom: 0;
		background-color: white;
	}
</style>
