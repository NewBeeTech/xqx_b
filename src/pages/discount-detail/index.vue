<template>
	<div class="main">

		<div class="grousList">
			<div class="grousLists">
				<!-- <img src="/static/imgs/ArtboardCopy9@2x.png" /> -->
				<div class="grousListMsg">
					<p><text>{{name}}</text><text>返金比例：{{infoRatio}}%</text></p>
					<p>¥{{groupPrice}} <text>¥{{price}}</text></p>
					<p>有效期：48h</p>
					<p>创建时间：{{createTimeDesc}}</p>
					<p v-if="close">下架时间：{{endTimeDesc}}</p>
				</div>
			</div>

			<div class="openDetail" @click="navGo('/pages/create-discount/main?id='+id+'&onlyView=true')">
				<p>查看砍价活动详情</p>
				<img src="/static/imgs/right.png" />
			</div>
		</div>
		<div class="market">
			注：客户参加活动砍价成功后，支付的款项会在您预设的返金比例扣除返金金额后才能进入您的小确幸账户中～
		</div>
		<div class="groupsDetailMsg">
			<div class="detailTab" v-if="!close">
				<p @click="changeShow2" :class="{active:isShow}">已砍价</p>
				<p @click="changeShow1" :class="{active:!isShow}">砍价中</p>
			</div>
			<!--已拼团-->
			<div v-if="isShow && !close">
				<div class="detailRes">
					<div>
						<p>已砍价（份）</p>
						<p>{{yiKan?yiKan:0}}</p>
					</div>
					<div>
						<p>已收款（元）</p>
						<p>{{yishou?yishou:0}}</p>
					</div>
				</div>
				<div class="detailRes">
					<div>
						<p>已返金（元）</p>
						<p>{{yifan?yifan:0}}</p>
					</div>
					<div>
						<p>返金比例</p>
						<p>{{ratio?ratio:0}}%</p>
					</div>
				</div>
			</div>

			<!--已拼团-->
			<!--拼团中-->
			<div class="detailRes" v-else>
				<div>
					<p>砍价中（份）</p>
					<p>{{kanjiazhong?kanjiazhong:0}}</p>
				</div>
				<div>
					<p>返金比例</p>
					<p>{{kanjiazhongRatio?kanjiazhongRatio:0}}%</p>
				</div>
			</div>
			<!--拼团中-->
		</div>
		<div v-if="!close" class="makeGroups" @click="makeGroups">下架砍价</div>
	</div>

</template>

<script>
  import { wxRequest } from '@/api'

		export default {
  data () {
    return {
			close: false,
			id: '',
			infoRatio: '',
      isShow: true,
      info:{},
			name: '',
			price: '',
			groupPrice: '',
			createTimeDesc: '',
			endTimeDesc: '',
			yiKan: '',
			yishou: '',
			yifan: '',
			ratio: '',
			kanjiazhong: '',
			kanjiazhongRatio: '',
    }
  },
  mounted () {
	},
  onLoad(options){
  	let that = this;
		let id = that.$root.$mp.query.id;
		let status = that.$root.$mp.query.status;
		if (status == 3) {
			this.close = true;
		} else {
			this.close = false;
		}
		console.warn(status, this.close);
		this.id = id;
		this.useIdQueryGoodsGroup(id);
    //		获取首页信息
    wxRequest('queryGroupBuy',{goodsGroupId: id,status: 12 })
          .then(res => {
            console.log(res)
            if (res.code == 1) {
              // that.info = res.value[0]
							that.yiKan = res.value.groupNum;
							that.yifan = res.value.successCountCurrency / 100;
							that.yishou = res.value.successCountMoney / 100;
							that.kanjiazhongRatio = res.value.ratio;
              console.log(res);
            }

          }).catch(err => {
          console.log(err)
    });
		wxRequest('queryGroupBuy',{goodsGroupId: id,status: 11 })
          .then(res => {
            console.log(res)
            if (res.code == 1) {
              // that.info = res.value[0]
							that.kanjiazhong = res.value.groupNum;
							that.ratio = res.value.ratio;
              console.log(res);
            }

          }).catch(err => {
          console.log(err)
    });
  },
	unLoad() {
		this.close = false;
		this.id = '';
		this.isShow = true;
		this.info = {};
		this.name = '';
		this.ratio = '';
		this.price = '';
		this.groupPrice = '';
		this.createTimeDesc = '';
		this.infoRatio = '';
		this.endTimeDesc = '';
		this.yiKan = '';
		this.yishou = '';
		this.yifan = '';
		this.kanjiazhong = '';
		this.kanjiazhongRatio = '';
	},
  methods: {
		timeDesc(time) {
			const timeObj = new Date(time);
			const min = timeObj.getMinutes() >= 10 ? timeObj.getMinutes() : '0'+timeObj.getMinutes();
      const hour = timeObj.getHours() >= 10 ? timeObj.getHours() : '0'+timeObj.getHours();
      const month = timeObj.getMonth() + 1;
			const year = timeObj.getFullYear();
      const day = timeObj.getDate();
			console.log(`${year}-${month}-${day} ${hour}:${min}`);
			return `${year}-${month}-${day} ${hour}:${min}`;
		},
		// 获取砍价活动信息
		useIdQueryGoodsGroup: function(id) {
			console.log(id);
			let self = this;
			try {
				wxRequest('useIdQueryGoodsGroup', {
					goodsGroupId: id,
				})
				.then(res => {
					if (res.code === 1) {
						self.name = res.value.name;
						self.price= res.value.price / 100;
						self.groupPrice = res.value.groupPrice / 100;
						self.onceGroupPrice = res.value.singlePrice / 100;
						self.infoRatio = res.value.ratio && Number(res.value.ratio).toFixed(1),
						self.currency = res.value.currency;
						self.rule = res.value.rule;
						self.createTimeDesc = self.timeDesc(res.value.createTime);
						self.endTimeDesc = self.timeDesc(res.value.endTime);
					}
					console.log(res)
				}).catch(err => {
					console.log(err)
				});
			} catch (e) {
			}
		},
    changeShow1 () {
      this.isShow = false;
      console.log(this.isShow);
    },
    changeShow2 () {
      this.isShow = true;
      console.log(this.isShow);
    },
    makeGroups () {
      var self = this;
      wx.showModal({
        content: '活动正在进行中，要下架该活动吗？',
        // content: '下架？',
        success: function (res) {
          console.log(res)
					if (res.confirm) {
						wxRequest("updateGoodsGroup",{id:self.id,status:3}).then(function (res) {
							if (res.code === 1) {
								wx.navigateBack();
							}
	          }).catch(function (err) {
	            console.log(err);
	          });
					} else {
					}

        }
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
	}

	.grousList {
		/*display: flex;*/
		/*padding: 38rpx 30rpx;*/
		border-radius: 8px;
		margin: 30rpx;
		box-shadow: 0px 0px 10px #efefef;
	}

	.grousLists {
		padding: 38rpx 30rpx;
		display: flex;
	}

	.grousList img {
		width: 106rpx;
		height: 106rpx;
		border-radius: 5px;
		margin-right: 34rpx;
	}

	.grousListMsg {
		color: #999;
		flex: 1;
	}

	.grousListMsg p:nth-child(1) {
		display: flex;
		justify-content: space-between;
	}

	.grousListMsg p:nth-child(1)>text:nth-child(1) {
		display: inline-block;
		width: 270rpx;
		font-size: 28rpx;
		color: #333;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.grousListMsg p:nth-child(1)>text:nth-child(2) {
		font-size: 24rpx;
		color: #999;
		float: right;
	}

	.grousListMsg p:nth-child(2) {
		font-size: 28rpx;
		color: #333;
		line-height: 50rpx;
	}

	.grousListMsg p:nth-child(2)>text {
		font-size: 24rpx;
		color: #999;
		margin-left: 30rpx;
		text-decoration: line-through;
	}

	.openDetail {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 96rpx;
		line-height: 96rpx;
		border-top: 1rpx solid #efefef;
	}

	.openDetail img {
		width: 20rpx;
		height: 35rpx;
		margin-left: 20rpx;
	}

	.market {
		font-size: 12px;
		color: #999;
		padding: 30rpx;
	}

	.groupsDetailMsg {
		padding: 20rpx 30rpx;
	}

	.detailTab {
		margin: 0 156rpx;
		height: 78rpx;
		display: flex;
		align-items: center;
		text-align: center;
		border: 1rpx solid #FEA401;
		border-radius: 10rpx;
		margin-bottom: 48rpx;
	}

	.detailTab p {
		height: 100%;
		line-height: 78rpx;
		flex: 1;
		color: #FEA401;
	}

	.detailTab .active {
		color: white;
		background: #FEA401;
	}

	.detailRes {
		padding: 40rpx 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 10px #efefef;
		line-height: 40rpx;
	}

	.detailRes>div {
		flex: 1;
	}

	.detailRes>div:nth-child(1) {
		border-right: 1rpx solid #efefef;
	}

	.detailRes>div>p:nth-child(1) {
		color: #999;
	}

	.makeGroups {
		width: calc(100% - 60rpx);
		height: 92rpx;
		margin: 0 30rpx;
		text-align: center;
		background: #FEA401;
		color: white;
		border-radius: 8px;
		line-height: 92rpx;
		font-size: 28rpx;
		margin-bottom: 20rpx;
	}
</style>
