<template>
	<div class="main">

		<div class="grousList">
			<div class="grousLists">
				<!-- <img src="/static/imgs/ArtboardCopy9@2x.png" /> -->
				<div class="grousListMsg">
					<p><text>{{name}}</text><text>返佣比例：{{ratio}}%</text></p>
					<p>¥{{groupPrice}} <text>¥{{price}}</text></p>
					<p>有效期：24h</p>
					<p>创建日期：{{createTimeDesc}}</p>
				</div>
			</div>

			<div class="openDetail" @click="navGo('/pages/make-groups/main?id='+info.id+'type=detail')">
				<p>查看拼团活动详情</p>
				<img src="/static/imgs/right.png" />
			</div>
		</div>
		<div class="market">
			{{info.rule}}
		</div>
		<div class="groupsDetailMsg">
			<div class="detailTab" >
				<p @click="changeShow1" :class="{active:isShow}">已拼团</p>
				<p @click="changeShow2" :class="{active:!isShow}">拼团中</p>
			</div>
			<!--已拼团-->
			<div v-if="isShow">
				<div class="detailRes">
					<div>
						<p>已拼团（份）</p>
						<p>{{info.groupPersonNum?info.groupPersonNum:0}}</p>
					</div>
					<div>
						<p>已收款（元）</p>
						<p>{{0}}</p>
					</div>
				</div>
				<div class="detailRes">
					<div>
						<p>已返佣（元）</p>
						<p>{{0}}</p>
					</div>
					<div>
						<p>返佣比例</p>
						<p>{{info.ratio?info.ratio:0}}%</p>
					</div>
				</div>
			</div>

			<!--已拼团-->
			<!--拼团中-->
			<div class="detailRes" v-else>
				<div>
					<p>拼团中（份）</p>
					<p>{{0}}</p>
				</div>
				<div>
					<p>返佣比例</p>
					<p>{{info.ratio}}%</p>
				</div>
			</div>
			<!--拼团中-->
		</div>
		<div class="makeGroups" @click="makeGroups">下架拼团</div>
	</div>

</template>

<script>
  import { wxRequest } from '@/api'

		export default {
  data () {
    return {
      isShow: true,
      info:{},
			name: '',
			ratio: '',
			price: '',
			groupPrice: '',
			createTimeDesc: '',
    }
  },
  mounted () {

  },
  onLoad(options){
  	let that = this;
		let id = that.$root.$mp.query.id;
		this.useIdQueryGoodsGroup(id);
        this.id = options.type;
        console.log(options);
        //		获取首页信息
        wxRequest('queryGroupBuy',{goodsGroupid:options.type,status:this.isShow?"11":"12"})
          .then(res => {
            console.log(res)
            if (res.code == 1) {
              that.info = res.value[0]
              console.log(res);
            }

          }).catch(err => {
          console.log(err)
        })
      },
  methods: {
		timeDesc(time) {
			const timeObj = new Date(time);
      const min = timeObj.getMinutes() || '00';
      const hour = timeObj.getHours() > 10 ? timeObj.getHours() : '0'+timeObj.getHours();
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
						self.ratio = res.value.ratio,
						self.currency = res.value.currency;
						self.rule = res.value.rule;
						self.createTimeDesc = self.timeDesc(res.value.createTime);
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
        title: '提示',
        content: '删除？',
        success: function (res) {
          console.log(res)
          wxRequest("updateGoodsGroup",{id:self.id,status:4}).then(function (res) {
            console.log(res);
          }).catch(function (err) {
            console.log(err);
          });
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
