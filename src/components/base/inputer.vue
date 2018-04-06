<template>
  <div class="wrap">
    <div class="left" v-if="left">{{left}}</div>
    <div class="center"><input type="text"></div>
    <div class="right" v-if="right">{{right}}</div>
  </div>
</template>

<script>
export default {
  props: ['left', 'right']
}
</script>

<style lang="stylus" scoped>
.wrap
  background #fff
  width 100%
  display flex
  .left
    width 20%
  .right
    width 30%
  .center 
    flex 1
</style>
