<template>
	<div class="main">
		<div class="groupsTab" >
			<div :class="{active:current == 0}" @click="tabChange" id='0'>进行中</div>
			<div :class="{active:current == 1}" @click="tabChange" id='1'>未开始</div>
			<div :class="{active:current == 2}" @click="tabChange" id='2'>已结束</div>
		</div>
		<swiper @change="bindchange" :current='current'>
			<swiper-item >
				<div class="grousLists">
					<scroll-view scroll-y='true'>
						<div class="paddingBottom">
							<div v-for="item in list1" class="grousList" @click="navGo('/pages/discount-detail/main?id='+item.id+'&status=1')">
								<!-- <img :src="item.imgUrl"/> -->
								<div class="grousListMsg">
									<p><text>{{item.name}}</text><text>返佣比例：{{item.ratio}}%</text></p>
									<p>¥{{item.price/100}} <text>¥{{item.groupPrice/100}}</text></p>
									<p>有效期：24h</p>
									<p>创建日期：{{item.createTimeDesc}}</p>
									<!-- <p>砍价成功：{{item.groupPersonNum}}份 <text>砍价中：{{item.groupPersonNum}}份</text></p> -->
								</div>
							</div>
						</div>

					</scroll-view>
				</div>
			</swiper-item>
			<swiper-item>
				<div class="grousLists">
					<scroll-view scroll-y='true'>
            <div class="paddingBottom">
              <div v-for="item in list2" class="grousList" @click="navGo('/pages/create-discount/main?id='+item.id)">
                <!-- <img :src="item.imgUrl"/> -->
                <div class="grousListMsg">
                  <p><text>{{item.name}}</text><text>返佣比例：{{item.ratio}}%</text></p>
                  <p>¥{{item.price/100}} <text>¥{{item.groupPrice/100}}</text></p>
                  <p>有效期：{{item.groupAging}}h</p>
                  <p>创建日期：{{item.createTimeDesc}}</p>
                </div>
              </div>
            </div>
					</scroll-view>
				</div>
			</swiper-item>
			<swiper-item>
				<div class="grousLists">
					<scroll-view scroll-y='true'>
            <div class="paddingBottom">
              <div v-for="item in list3" class="grousList" @click="navGo('/pages/discount-detail/main?id='+item.id+'&status=3')">
                <!-- <img :src="item.imgUrl"/> -->
                <div class="grousListMsg">
                  <p><text>{{item.name}}</text><text>返佣比例：{{item.ratio}}%</text></p>
                  <p>¥{{item.price/100}} <text>¥{{item.groupPrice/100}}</text></p>
                  <p>有效期：24h</p>
                  <p>创建日期：{{item.createTimeDesc}}</p>
                  <!-- <p>砍价成功：{{item.groupPersonNum}}份 <text>砍价中：{{item.createTime}}份</text></p> -->
                </div>
              </div>
            </div>
					</scroll-view>
				</div>
			</swiper-item>
		</swiper>
		<div class="makeGroups" @click="navGo('/pages/create-discount/main')">创建砍价</div>
	</div>

</template>

<script>
  import {wxRequest} from '@/api'

	export default {
  data () {
    return {
      current: 0,
      list1:[],
      list2:[],
      list3:[],
    }
  },
  mounted () {

  },
    onShow(){
      this.searchGroup(this.current);
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
    searchGroup (status){
      var num = 0;
      if(this.current == 0){num = 1}
      if(this.current == 1){num = 0}
      if(this.current == 2){num = 3}
      let that = this;
      //		获取首页信息
      wxRequest('queryGoodsGroup',{
				status:num,
				goodsType: 3,
			})
        .then(res => {
          console.log(res)
          if (res.code == 1) {
						let result = res.value;
						result = result.map( item => ({ ...item, createTimeDesc: that.timeDesc(item.createTime) }));
						if (num === 1) {
							that.list1 = result;
						} else if (num === 0) {
							that.list2 = result;
						} else if (num === 3) {
							that.list3 = result;
						}
            // that.list = result;
            console.warn(res);
          }

        }).catch(err => {
        console.log(err)
      })
    },
    bindchange (e) {
      console.log(e.target.current)
      this.current = e.target.current
      this.searchGroup(this.current);
    },
    tabChange (e){
    		console.log(e.target.id)
    		this.current = e.target.id;
      this.searchGroup(this.current);
    },
    submit (id) {
      wx.navigateTo({
        url: '/pages/merchant-edit/main?id='+id
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
	}

	.groupsTab {
		height: 88rpx;
		display: flex;
		border-top: 1rpx solid #efefef;
		border-bottom: 1rpx solid #efefef;
		align-items: center;
		justify-content: space-around;
	}

	.groupsTab div {
		height: 100%;
		line-height: 88rpx;
		color: #999;
		position: relative;
	}

	.groupsTab .active {
		color: #fea401;
	}

	.groupsTab .active:after {
		width: 100%;
		height: 1px;
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		background: #FEA401;
	}

	swiper {
		height: calc(100% - 88rpx);
	}

	.grousLists {
		height: 100%;
	}

	.grousLists scroll-view {
		height: 100%;
	}

	.grousList {
		display: flex;
		padding: 38rpx 30rpx;
		border-radius: 8px;
		margin: 30rpx;
		box-shadow: 0px 0px 10px #efefef;
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
	.grousListMsg p:nth-child(1){
		display: flex;
		justify-content: space-between;
	}
	.grousListMsg p:nth-child(1)>text:nth-child(1) {
		display: inline-block;
		width: 270rpx;
		font-size: 28rpx;
		color: #333;
		display: block;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
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

	.makeGroups {
		box-sizing: border-box;
		width: calc(100% - 60rpx);
		height: 92rpx;
		position: absolute;
		bottom: 35rpx;
		left: 0;
		margin: 0 30rpx;
		text-align: center;
		background: #FEA400;
		color: white;
		border-radius: 8px;
		line-height: 92rpx;
		font-size: 28rpx;
	}

	.paddingBottom {
		padding-bottom: 130rpx;
	}
</style>
