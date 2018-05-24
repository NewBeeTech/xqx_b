<template>
	<div class="main">
		<scroll-view scroll-y='true' style='height: 100%;'>
			<div class="goodName listStyle padding">
				<label>商品名称</label>
				<div>
					<input :disabled="disabled"  placeholder-style="color: #cbcbcb; font-weight: normal;" v-model="name" type="text" placeholder="请输入商品名称" v-bind="name" />
				</div>
			</div>
			<div class="goodLogo listStyle padding align-top" >
				<label>商品图片</label>
				<div v-if="logo" class="logo-container" >
					<img v-if="!disabled" class="close-img" src="/static/imgs/close-img.png" style="width: 40rpx; height: 40rpx;" @click="deleteImg()" />
					<img :src="logo" alt="" @click="previewImg()" />
				</div>
				<div v-else>
					<img @click="chooseImage(1, 'logo')" src="/static/imgs/add-imgs.png" />
				</div>
			</div>
			<div class="padding">
				<div class="listStyle" @click="selectDispatchWay">
					<label>配送方式</label>
					<div class="goods-info">
						<div class="goods-info-text">{{ deliveryMethodDesc ? deliveryMethodDesc : '邮寄/到店自提' }}</div>
						<img src="/static/imgs/right.png" alt="" />
					</div>
				</div>
				<div class="listStyle" @click="navGo('/pages/create-discount-info/main?onlyView='+onlyView)">
					<label>商品说明</label>
					<div class="goods-info">
						<div class="goods-info-text">{{goodsInfoDesc}}</div>
						<img src="/static/imgs/right.png" alt="" />
					</div>
				</div>
				<div class="listStyle">
					<label>商品原价</label>
					<div>
						<input :disabled="disabled" placeholder-style="color: #cbcbcb; font-weight: normal;" v-model="originPrice" v-bind="originPrice" type="digit" confirm-type="done" placeholder="请输入商品价格" />
					</div>
				</div>
				<div class="listStyle">
					<label>商品底价</label>
					<div>
						<input :disabled="disabled" placeholder-style="color: #cbcbcb; font-weight: normal;" v-model="groupPrice" type="digit" placeholder="请输入砍价商品底价" v-bind="groupPrice"/>
					</div>
				</div>
				<!-- <div class="listStyle">
					<label>返金比例</label>
					<div class="form-rate">
						<input style="padding-right: 20rpx; margin-right: 10rpx;" :disabled="disabled" placeholder-style="color: #cbcbcb; font-weight: normal;" v-model="ratio" type="digit" placeholder="请设置返金比例" v-bind="ratio"/>

					</div>
					<span style="width: 20rpx;" v-if="ratio">%</span>
				</div> -->
				<!-- <div class="listStyle">
					<label>单笔交易返养老金（元）</label>
					<div>
						<div>{{ (groupPrice * ratio / 100 > 0.01 ? groupPrice * ratio / 100 : 0.01) || '￥0.00'}}</div>
					</div>
				</div> -->
				<div class="listStyle">
					<label>单次砍价金额</label>
					<div>
						<input :disabled="disabled" placeholder-style="color: #cbcbcb; font-weight: normal;" v-model="onceGroupPrice" type="digit" placeholder="请输入单次砍价金额" v-bind="onceGroupPrice"/>
					</div>
				</div>
				<div class="listStyle">
					<label>活动返金 <img style="width: 24rpx; height: 24rpx;" @click="showModalInfo(1)" src="/static/imgs/info-detail.png" /></label>
					<div class="form-rate">
						<input style="padding-right: 20rpx; margin-right: 10rpx;" :disabled="disabled" placeholder-style="color: #cbcbcb; font-weight: normal;" v-model="ratio" type="digit" placeholder="请设置返金比例" v-bind="ratio"/>

					</div>
					<span style="width: 20rpx;" v-if="ratio">%</span>
				</div>
				<div class="listStyle twoColumn">
					<div class="listStyle1">
						<label>用户返金 <img style="width: 24rpx; height: 24rpx;" @click="showModalInfo(2)" src="/static/imgs/info-detail.png" /></label>
						<div class="form-rate">
							<!-- <input placeholder-style="color: #cbcbcb; font-weight: normal;" type="number" disabled v-model="currency" /> -->
							<div>活动返金的10%</div>
						</div>
					</div>
					<div class="listStyle1">
						<label>推广返佣 <img style="width: 24rpx; height: 24rpx;" @click="showModalInfo(3)" src="/static/imgs/info-detail.png" /></label>
						<div class="form-rate">
							<!-- <input placeholder-style="color: #cbcbcb; font-weight: normal;" type="number" disabled v-model="spreadCurrency" /> -->
							<div>活动返金的90%</div>
						</div>
					</div>
				</div>
				<div class="listStyle">
					<label>砍价有效期</label>
					<div>
						<input placeholder-style="color: #cbcbcb; font-weight: normal;" type="number" disabled value="48h" />
					</div>
				</div>
			</div>
			<div class="padding remark">
				<div>砍价规则</div>
				<input :disabled="disabled" placeholder-style="color: #cbcbcb; font-weight: normal;"  auto-height placeholder="请填写砍价规则" v-model="rule"></textarea>
			</div>
			<div class="serviceMsg padding">
				<div style="font-weight: normal">服务说明</div>
				<div class="serviceList">
					<img v-if="!disabled"  src="/static/imgs/dui.png" />
					<div>
						<p>全场包邮</p>
						<p>所有商品均无条件包邮</p>
					</div>
				</div>
				<div class="serviceList">
					<img v-if="!disabled" src="/static/imgs/dui.png" />
					<div>
						<p>消费即得养老金</p>
						<p>每一笔消费都能获得相应的比例的养老金</p>
					</div>

				</div>
				<div class="serviceList">
					<img v-if="!disabled"  src="/static/imgs/dui.png" />
					<div>
						<p>假一赔十</p>
						<p>若收到的商品是假冒品牌，可获得加倍的赔偿</p>
					</div>
				</div>
			</div>
			<div v-if="!disabled && !onlyView" class="makeBtn" >
				<div @click="saveGroups">保存</div>
				<div @click="makeGroups">上架</div>
			</div>
			<div v-if="disabled && !onlyView" class="makeBtn2" >
				<div @click="deleteGoods">删除</div>
				<div @click="editGoods">编辑</div>
				<div @click="makeGroups">上架</div>
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
				onlyView: false, // 不展示底部操作
				id: '',
				disabled: false,
				name: '', // 商品名称
        logo: '', // 商品图片
				originPrice: '', // 商品原价
				groupPrice: '', // 商品底价
				onceGroupPrice: '', // 单次砍价金额
				rule: '', // 砍价规则
				ratio: 3,
				type: 0,
        info:{},
				goodsInfoDesc: '请填写商品说明',
				deliveryMethod: '',
				deliveryMethodDesc: '',
				currency: 0.00,
				spreadCurrency: 0.00,
			}
		},
		onLoad: function() {
			let that = this;
			let id = that.$root.$mp.query.id;
			let onlyView = that.$root.$mp.query.onlyView;
			if (onlyView) {
				this.onlyView = true;
			}
			this.id = id;
			if (id) {
				this.disabled = true;
				this.useIdQueryGoodsGroup(id);
			} else { // 创建态
				this.disabled = false;
			}
			// that.type = type;
			// if(type == 0){
	  	// 		wx.setNavigationBarTitle({
	  	// 			title:'创建活动'
	  	// 		})
			//
	  	// 	}else{
	  	// 		 wx.setNavigationBarTitle({
	  	// 			title:'活动详情'
	  	// 		})
	  	// 	}
		},
		onShow: function() {
			/**
			 * 处理商品说明文案显示，有说明和无说明的文案
			 * @type {[type]}
			 */
			try {
				var discountInfo = JSON.parse(wx.getStorageSync("discount-info"));
				if(discountInfo.explainContent || discountInfo.explainImgUrl.length > 0) {
					this.goodsInfoDesc = '查看商品说明';
				} else {
					this.goodsInfoDesc = '请填写商品说明';
				}
			} catch(e) {
			}
		},
		onUnload: function() {
			this.logo = '';
			this.disabled = false;
			this.name = ''; // 商品名称
			this.logo = ''; // 商品图片
			this.originPrice = ''; // 商品原价
			this.groupPrice = ''; // 商品底价
			this.onceGroupPrice = ''; // 单次砍价金额
			this.rule = ''; // 砍价规则
			this.ratio = '';
			this.type = 0;
			this.info = {};
			this.onlyView = false; // 不展示底部操作
			this.goodsInfoDesc = '请填写商品说明';
			wx.setStorageSync("discount-info", "");
		},

		mounted() {},
		methods: {
			/**
			 * 模态框进行介绍
			 * @param  {[type]} type [description]
			 * @return {[type]}      [description]
			 */
			showModalInfo: function(type) {
				if (type == 1) {
					wx.showModal({
  					title: '',
						showCancel: false,
						confirmText: '我知道了',
  					content: '商品活动返金金额默认为商品底价的3%，您也可以自定义返金金额。',
					});
				} else if (type == 2) {
					wx.showModal({
  					title: '',
						showCancel: false,
						confirmText: '我知道了',
  					content: '用户购买商品时，将获得商品活动反金金额的10%的消费养老金。',
					});
				} else if (type == 3) {
					wx.showModal({
  					title: '',
						showCancel: false,
						confirmText: '我知道了',
  					content: '用户购买商品时，将从商家设置的活动返金金额里的90%作为奖励金返还给该用户的所属商户。您也可以通过推广新用户获得奖励金。您推广的新用户在小确幸平台购买商品时，您将获得其他商户活动的奖励金。',
					});
				}
			},
			/**
			 * 选择配送方式
			 * @return {[type]} [description]
			 */
			selectDispatchWay: function() {
				if(this.disabled) {
				} else {
					const that = this;
					wx.showActionSheet({
	  				itemList: ['邮寄', '到店自提'],
	  				success: function(res) {
	    				console.log(res.tapIndex)
							if (res.tapIndex == 0) {
								that.deliveryMethod = 1;
								that.deliveryMethodDesc = '邮寄';
							} else if (res.tapIndex == 1) {
								that.deliveryMethod = 2;
								that.deliveryMethodDesc = '到店自提';
							}
							console.log(that.deliveryMethodDesc);
	  				},
	  				fail: function(res) {
	    				console.log(res.errMsg)
	  				}
					});
				}

			},
			/**
			 * 进入编辑态
			 * @return {[type]} [description]
			 */
			editGoods: function() {
				this.disabled = false;
			},
			/**
			 * 删除砍价
			 * @return {[type]} [description]
			 */
			deleteGoods: function() {
				const id = this.id;
				if (id) {
					wxRequest('deleteGoodsGroup', {
						id,
						status: 4,
					})
						.then(res => {
							if (res.code === 1) {
								wx.navigateBack();
							}
						}).catch(err => {
							console.log(err)
	          wx.showToast({
	            title:err.message,
	            duration:2000
	          })
						})
				}
			},
			/**
			 * 预览图片
			 * @return {[type]} [description]
			 */
			previewImg:function () {
	      let that = this
	      wx.previewImage({
	        current: that.logo, // 当前显示图片的http链接
					urls: [that.logo]// 需要预览的图片http链接列表
	      })
	    },
			/**
			 * 删除图片
			 * @return {[type]} [description]
			 */
			deleteImg: function() {
				this.logo = '';
			},
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
							console.warn('logo：',res);
              // that.logo = tempFilePaths[0]
							console.warn('logo adress: ', that.logo);
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
								self.logo = imageURL;

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
				if (this.validateForm()) {
					let self = this;
					try {
						var discountInfo = wx.getStorageSync("discount-info");
						if (!discountInfo) {
							discountInfo = {
								explainContent: '',
								explainImgUrl: [],
							};
						} else {
							var discountInfo = JSON.parse(wx.getStorageSync("discount-info"));
						}
						if (self.id) {
							wxRequest('updateGoodsGroup', {
								id: self.id,
								name: self.name,
								imgUrl: self.logo,
								explainContent: discountInfo.explainContent,
								explainImgUrl: JSON.stringify(discountInfo.explainImgUrl),
								price: parseInt(self.originPrice * 100),
								groupPrice: parseInt(self.groupPrice * 100),
								singlePrice: parseInt(self.onceGroupPrice * 100),
								// ratio: self.ratio,
								ratio: self.ratio && Math.floor(Number(self.ratio)*10)/10,
								currency: parseInt(self.groupPrice* self.ratio ) > 1 ? parseInt(self.groupPrice * self.ratio) : 1 ,
								// spreadCurrency: parseInt(self.groupPrice* self.ratio * 0.9) > 1 ? parseInt(self.groupPrice * self.ratio * 0.9) : 1 ,
								deliveryMethod: self.deliveryMethod,
								groupAging: 48,
								rule: self.rule,
								status: 1,
								goodsType: 3,
							})
			          .then(res => {
			            console.log(res)
			            wx.navigateBack()
			            //				that.codeImg = res.value
			          }).catch(err => {
			          console.log(err)
			        });
						} else {
							wxRequest('createGoodsGroup', {
								name: self.name,
								imgUrl: self.logo,
								explainContent: discountInfo.explainContent,
								explainImgUrl: JSON.stringify(discountInfo.explainImgUrl),
								price: parseInt(self.originPrice * 100),
								groupPrice: parseInt(self.groupPrice * 100),
								singlePrice: parseInt(self.onceGroupPrice * 100),
								// ratio: self.ratio,
								ratio: self.ratio && Math.floor(Number(self.ratio)*10)/10,
								currency: parseInt(self.groupPrice* self.ratio ) > 1 ? parseInt(self.groupPrice * self.ratio ) : 1 ,
								// spreadCurrency: parseInt(self.groupPrice* self.ratio * 0.9) > 1 ? parseInt(self.groupPrice * self.ratio * 0.9) : 1 ,
								deliveryMethod: self.deliveryMethod,
								groupAging: 48,
								rule: self.rule,
								status: 1,
								goodsType: 3,
							})
			          .then(res => {
			            console.log(res)
			            wx.navigateBack()
			            //				that.codeImg = res.value
			          }).catch(err => {
			          console.log(err)
			        });
						}
					} catch (e) {
					}
				}
			},
			//保存活动
			saveGroups:function() {
				if (this.validateForm()) {
					let self = this;
					try {
						var discountInfo = wx.getStorageSync("discount-info");
						if (!discountInfo) {
							discountInfo = {
								explainContent: '',
								explainImgUrl: [],
							};
						} else {
							var discountInfo = JSON.parse(wx.getStorageSync("discount-info"));
						}
						if (self.id) {
							wxRequest('updateGoodsGroup', {
								id: self.id,
								name: self.name,
								imgUrl: self.logo,
								explainContent: discountInfo.explainContent,
								explainImgUrl: JSON.stringify(discountInfo.explainImgUrl),
								price: parseInt(self.originPrice * 100),
								groupPrice: parseInt(self.groupPrice * 100),
								singlePrice: parseInt(self.onceGroupPrice * 100),
								// ratio: self.ratio,
								ratio: self.ratio && Math.floor(Number(self.ratio)*10)/10,
								currency: parseInt(self.groupPrice* self.ratio) > 1 ? parseInt(self.groupPrice * self.ratio) : 1 ,
								// personCurrency: parseInt(self.groupPrice* self.ratio * 0.9) > 1 ? parseInt(self.groupPrice * self.ratio * 0.9) : 1 ,
								// spreadCurrency: parseInt(self.groupPrice* self.ratio * 0.9) > 1 ? parseInt(self.groupPrice * self.ratio * 0.9) : 1 ,
								deliveryMethod: self.deliveryMethod,
								groupAging: 48,
								rule: self.rule,
								status: 0,
								goodsType: 3,
							})
			          .then(res => {
			            console.log(res)
			            wx.navigateBack()
			            //				that.codeImg = res.value
			          }).catch(err => {
			          console.log(err)
			        });
						} else {
							wxRequest('createGoodsGroup', {
								name: self.name,
								imgUrl: self.logo,
								explainContent: discountInfo.explainContent,
								explainImgUrl: JSON.stringify(discountInfo.explainImgUrl),
								price: parseInt(self.originPrice * 100),
								groupPrice: parseInt(self.groupPrice * 100),
								singlePrice: parseInt(self.onceGroupPrice * 100),
								// ratio: self.ratio,
								ratio: self.ratio && Math.floor(Number(self.ratio)*10)/10,
								currency: parseInt(self.groupPrice* self.ratio) > 1 ? parseInt(self.groupPrice * self.ratio) : 1 ,
								// spreadCurrency: parseInt(self.groupPrice* self.ratio * 0.9) > 1 ? parseInt(self.groupPrice * self.ratio * 0.9) : 1 ,
								deliveryMethod: self.deliveryMethod,
								groupAging: 48,
								rule: self.rule,
								status: 0,
								goodsType: 3,
							})
			          .then(res => {
			            console.log(res)
			            wx.navigateBack()
			            //				that.codeImg = res.value
			          }).catch(err => {
			          console.log(err)
			        });
						}
					} catch (e) {
					}
				}
			},
			// 校验填写数据
			validateForm: function() {
				// console.log(Number(this.onceGroupPrice) , Number(this.originPrice))
				function isNumeric(n) {
  				return !isNaN(parseFloat(n)) && isFinite(n);
				}
				var discountInfo = {
					explainContent: '',
					explainImgUrl: [],
				}
				try {
					discountInfo = JSON.parse(wx.getStorageSync("discount-info") || '');
				} catch(e) {
					console.warn(e);
				}
				if (!this.name) {
					wx.showToast({
						title: '请输入商品名称',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (this.name.length > 30) {
					wx.showToast({
						title: '商品名称最多输入30个字',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!this.logo) {
					wx.showToast({
						title: '请上传商品图片',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!this.deliveryMethod) {
					wx.showToast({
						title: '请选择配送方式',
						icon: 'none',
						duration: 2000
					});
				} else if ( discountInfo && discountInfo.explainContent && discountInfo.explainContent.length > 300) {
					wx.showToast({
						title: '商品说明最多可输入300字',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!this.originPrice) {
					wx.showToast({
						title: '请输入商品原价',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!isNumeric(this.originPrice)) {
					wx.showToast({
						title: '请输入正确格式的商品原价',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (Number(this.originPrice) < 0.01 || Number(this.originPrice) > 999999.99) {
					wx.showToast({
						title: '商品原价输入范围0.01 ~ 999999.99',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!this.ratio) {
					wx.showToast({
						title: '请输入返金比例',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!isNumeric(this.ratio)) {
					wx.showToast({
						title: '请输入正确格式的返金比例',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (Number(this.ratio) < 3 || Number(this.ratio) > 80) {
					wx.showToast({
						title: '活动返金输入范围03 ~ 80',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!this.groupPrice) {
					wx.showToast({
						title: '请输入商品底价',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!isNumeric(this.groupPrice)) {
					wx.showToast({
						title: '请输入正确格式的商品底价',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (Number(this.groupPrice) < 0.01 || Number(this.groupPrice) > 999999.99) {
					wx.showToast({
						title: '商品底价输入范围0.01 ~ 999999.99',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (Number(this.groupPrice) > Number(this.originPrice)) {
					console.log(this.groupPrice, this.originPrice);
					wx.showToast({
						title: '输入商品底价不得超过商品原价',
						icon: 'none',
						duration: 2000
					});
					return false;
				}  else if (!this.onceGroupPrice) {
					wx.showToast({
						title: '请输入单次砍价金额',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (!isNumeric(this.onceGroupPrice)) {
					wx.showToast({
						title: '请输入正确格式的单次砍价金额',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if ( this.rule.length > 300) {
					wx.showToast({
						title: '砍价规则最多可输入300字',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (Number(this.onceGroupPrice) < 0.1) {
					wx.showToast({
						title: '输入单次砍价金额要大于等于0.1元',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else if (Number(this.onceGroupPrice) >= Number(this.originPrice)) {
					wx.showToast({
						title: '单次砍价不能大于等于商品原价',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else {
					return true;
				}
			},
			//保存活动
			useIdQueryGoodsGroup: function(id) {
				let self = this;
				try {
					wxRequest('useIdQueryGoodsGroup', {
						goodsGroupId: id,
					})
		      .then(res => {
						if (res.code === 1) {
							self.name = res.value.name;
							self.logo = res.value.imgUrl;
							wx.setStorageSync("discount-info",JSON.stringify({
								explainContent: res.value.explainContent,
								explainImgUrl: res.value.explainImgUrl,
							}));
							if(res.value.explainContent || res.value.explainImgUrl > 0) {
								this.goodsInfoDesc = '查看商品说明';
							}
							if (res.value.deliveryMethod == 1) {
								self.deliveryMethodDesc = '邮寄';
							} else if (res.value.deliveryMethod == 2) {
								self.deliveryMethodDesc = '到店自提';
							}
							self.originPrice = res.value.price / 100;
							self.groupPrice = res.value.groupPrice / 100;
							self.onceGroupPrice = res.value.singlePrice / 100;
							self.ratio = res.value.ratio,
							self.currency = res.value.currency;
							self.rule = res.value.rule;
							self.deliveryMethod = res.value.deliveryMethod;
							// status: 0,
							// goodsType: 3,
						}
		      	console.log(res)
		      }).catch(err => {
		      	console.log(err)
		      });
				} catch (e) {
				}
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
	.form-rate {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.listStyle {
		height: 96rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #f0f0f0;
	}
	.listStyle1 {
		height: 96rpx;
		line-height: 96rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* width: 100%; */
		width: 600rpx;
		flex-shrink: 0;
		/* padding-left: 96rpx; */
		margin-left: 80rpx;
	}
	.listStyle1>div {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}

	.listStyle1>div>input {
		text-align: right;
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
		color: #000;
		font-size: 30rpx;
		font-weight: normal;
	}

	.listStyle img {
		width: 15rpx;
		height: 30rpx;
	}
	.align-top {
		align-items: flex-start;
		padding-top: 30rpx;
	}
	.goodName,
	.goodLogo {
		height: 154rpx;
		background: white;
		margin-bottom: 18rpx;
	}

	.goodLogo img {
		width: 120rpx;
		height: 116rpx;
		display: flex;
	}

	.remark {
		font-weight: normal;
		padding: 30rpx 35rpx;
	}

	.remark div {
		line-height: 80rpx;
		color: #000;
	}

	.remark textarea {
		/* height: 100rpx;
		color: #333;
		font-weight: 100; */
	}

	.placeholder {
		color: #999;
	}

	.serviceMsg>div:nth-child(1) {
		line-height: 100rpx;
		border-top: 1rpx solid #f0f0f0;
	}

	.serviceList {
		font-weight: normal;
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
		font-weight: normal;
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
		font-weight: normal;
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
	.logo-container {
		position: relative;
	}
	.close-img {
		position: absolute;
		width: 10rpx;
		height: 10rpx;
		right: 100rpx;
		top: -20rpx;
	}
	.goods-info {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.goods-info-text {
		color: #cbcbcb;
		font-weight: normal;
		margin-right: 10rpx;
	}
	textarea {
		position: default;
		display: flex;
		border: 1rpx solid red;
	}
	.twoColumn {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
</style>
