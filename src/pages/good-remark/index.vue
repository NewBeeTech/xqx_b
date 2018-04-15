<template>
	<div class="main">
		<scroll-view scroll-y='true' style='height: 100%;'>
			
			<div class="padding remark">
				<textarea placeholder="请填写商品说明"></textarea>
			</div>
			<div class="goodImg">

				<div>
					<div>
						<!--<img src="/static/imgs/2.png"/>-->
					</div>
					<img src="/static/imgs/圆角矩形2拷贝2@2x.png" />
				</div>
				<label>	请上传商品图片</label>
			</div>
		</scroll-view>
	</div>

</template>

<script>
	export default {
  data () {
    return {
      current: 0
    }
  },
  mounted () {
  },
  methods: {
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