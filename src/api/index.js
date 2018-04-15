export let api = {
	HTTP_HOST: 'http://wmomo.wicp.net/',
	HTTP_SERVER: {
		'userLogin': 'mxcx/AuthorizedController/checkAuthorization', //获取code，登录
		'homeMsg': 'mxcx/MerchantController/incomeStatisticsMap', //首页信息
		'getShopInfo':'mxcx/MerchantController/queryMerchantInfo', //获取商户信息
		'getCodeImg':'mxcx/MerchantController/getMerchantMoneyCollectQr',//获取二维码
		'makeGroups':'mxcx/GoodsGroupController/createGoodsGroup',//创建活动
	}
}
export let wxRequest = function(server, parm) {
	wx.showLoading({
		title: '加载中',
	})
	parm = parm || {}
	if(!parm.code){
		parm.sessionKey = wx.getStorageSync('token');
	}
	return new Promise(function(success, fail) {
		wx.request({
			url: api.HTTP_HOST + api.HTTP_SERVER[server],
			data: parm,
			method:'POST',	
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success: function(res) {
				wx.hideLoading()
				success(res.data);

			},
			fail: function(error) {
				wx.hideLoading()
				wx.showToast({
					title: error,
					icon: 'none',
					duration: 2000
				})
				fail(error)
			}
		})
	});
}
//module.exports = {
//	api
//}