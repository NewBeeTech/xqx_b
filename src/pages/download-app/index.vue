<template>
  <div class="container">
    <img class="download-app-icon" src="/static/imgs/download-app.png" />
    <div class="download-app-desc">您还不是CCPP特约商户，请先下载小确幸商家版APP按成注册</div>
    <div class="download-app-btn" @click="navGo('/pages/app-download/main')">立即下载APP</div>
  </div>
</template>
<script>
import { wxRequest } from '@/api'
</script>
<style scoped>
.download-app-icon {
  width: 150rpx;
  height: 150rpx;
  margin-top: 150rpx;
}
.download-app-desc {
  font-size: 26rpx;
  max-width: 500rpx;
  text-align: center;
  margin: 50rpx 0;
  color: grey;
}
.download-app-btn {
  width: 600rpx;
  text-align: center;
  background-color: #FEA401;
  height: 90rpx;
  border-radius: 10rpx;
  color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25rpx;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
