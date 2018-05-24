export let api = {
	// HTTP_HOST: 'https://bmini.xqx.com/',
	HTTP_HOST: 'http://wind.denong.com/',
	HTTP_SERVER: {
		"updateGoodsGroupOrderExpressNumber": "/xcxm/GoodsGroupOrderController/updateGoodsGroupOrderExpressNumber", // 设置订单快递单号接口
		"useIdQueryGoodsGroup": "/xcxm/GoodsGroupController/useIdQueryGoodsGroup",
	  "useAppLoginNameQueryMerchant":"xcxm/MerchantController/useAppLoginNameQueryMerchant",
		'userLogin': 'xcxm/AuthorizedController/checkAuthorization', //获取code，登录
    "getMessageCode":"xcxm/UtilsController/getMessageCode",//获取验证码
    "verificationCode":"xcxm/UtilsController/verificationCode",//手机验证码 验证
    "getQiniuToken":"xcxm/QiniuController/getQiniuToken",
    "merchantRegister":"xcxm/MerchantController/merchantRegister",
    'homeMsg':"xcxm/TradeController/incomeStatisticsMap",
		'getShopInfo':'xcxm/MerchantController/queryMerchantInfo', //获取商户信息
		'getCodeImg':'xcxm/MerchantController/getMerchantMoneyCollectQr',//获取二维码
    "updateMerchantInfo":"xcxm/MerchantController/updateMerchantInfo",
		'createGoodsGroup':'xcxm/GoodsGroupController/createGoodsGroup',//创建活动
    "updateGoodsGroup":"xcxm/GoodsGroupController/updateGoodsGroup",
    "deleteGoodsGroup":"xcxm/GoodsGroupController/deleteGoodsGroup",
    "queryGoodsGroup":"xcxm/GoodsGroupController/queryGoodsGroup",
    "getProvince":"xcxm/UtilsController/getProvince",//省
    "getCity":"xcxm/UtilsController/getCity",//市
    "getCounty":"xcxm/UtilsController/getCounty",//县
    "getBusinessCircle":"xcxm/UtilsController/getBusinessCircle",
    "getOneIndustry":"xcxm/UtilsController/getOneIndustry",//获取行业1级数据
    "getTowIndustry":"xcxm/UtilsController/getTowIndustry",//获取行业2级数据
    "queryGoodsGroupOrderState":"xcxm/GoodsGroupOrderController/queryGoodsGroupOrderState",
    "getMerchantMoneyCollectQr":"xcxm/MerchantController/getMerchantMoneyCollectQr",
    "decryptPhoneNumber":"xcxm/AuthorizedController/decryptPhoneNumber",
    "queryGroupBuy":"xcxm/GoodsGroupOrderController/queryGoodsGroupOrderCount",
		"getFan":"xcxm/PersonController/fansList",
		"getGet":"xcxm/GoodsGroupController/viewRevenueStatistics"
	}
}
export let wxRequest = function(server, parm) {

	wx.showLoading({
		title: '加载中'
	})
	parm = parm || {}
	if(!parm.code){
		parm.sessionKey = wx.getStorageSync('token');
	}
  console.log("parm:",parm);
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
        console.log(res)
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

export let toDoubleNum = function(e){
  var num = e?e:"0.00";
  return ~~num/100==num/100?num/100+".00":~~(num*100)/100;
}
