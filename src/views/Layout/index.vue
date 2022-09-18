<template>
  <div id="layout">
    <router-view />

    <van-tabbar
      v-model="active"
      active-color="#21b994"
      inactive-color="#888888"
      route
    >
      <van-tabbar-item icon="home-o" to="/Layout/Home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/Layout/Search">找房</van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" to="/Layout/News">资讯</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/Layout/My">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
#layout {
  padding-bottom: 50px;
}
</style>
