export let api = {
	HTTP_HOST: 'http://wmomo.wicp.net/',
	HTTP_SERVER: {
	  "useAppLoginNameQueryMerchant":"mxcx/MerchantController/useAppLoginNameQueryMerchant",
		'userLogin': 'mxcx/AuthorizedController/checkAuthorization', //获取code，登录
    "getMessageCode":"mxcx/UtilsController/getMessageCode",//获取验证码
    "verificationCode":"mxcx/UtilsController/verificationCode",//手机验证码 验证
    "getQiniuToken":"mxcx/QiniuController/getQiniuToken",
    "merchantRegister":"mxcx/MerchantController/merchantRegister",
    'homeMsg':"mxcx/TradeController/incomeStatisticsMap",
		'getShopInfo':'mxcx/MerchantController/queryMerchantInfo', //获取商户信息
		'getCodeImg':'mxcx/MerchantController/getMerchantMoneyCollectQr',//获取二维码
    "updateMerchantInfo":"mxcx/MerchantController/updateMerchantInfo",
		'createGoodsGroup':'mxcx/GoodsGroupController/createGoodsGroup',//创建活动
    "updateGoodsGroup":"mxcx/GoodsGroupController/updateGoodsGroup",
    "deleteGoodsGroup":"mxcx/GoodsGroupController/deleteGoodsGroup",
    "queryGoodsGroup":"mxcx/GoodsGroupController/queryGoodsGroup",
    "getProvince":"mxcx/UtilsController/getProvince",//省
    "getCity":"mxcx/UtilsController/getCity",//市
    "getCounty":"mxcx/UtilsController/getCounty",//县
    "getBusinessCircle":"mxcx/UtilsController/getBusinessCircle",
    "getOneIndustry":"mxcx/UtilsController/getOneIndustry",//获取行业1级数据
    "getTowIndustry":"mxcx/UtilsController/getTowIndustry",//获取行业2级数据
    "queryGoodsGroupOrderState":"mxcx/GoodsGroupOrderController/queryGoodsGroupOrderState",
    "getMerchantMoneyCollectQr":"mxcx/MerchantController/getMerchantMoneyCollectQr",
    "decryptPhoneNumber":"mxcx/AuthorizedController/decryptPhoneNumber",
    "queryGroupBuy":"mxcx/GroupBuyController/queryGroupBuy"
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
