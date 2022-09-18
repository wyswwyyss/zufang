<template>
  <div>
    <div class="searchbox">
      <van-row class="searchbox_search">
        <van-col span="1" class="select_city" @click="toCity"
          >{{nowCity }}<van-icon name="arrow-down" /><span
            class="search_border"
          ></span>
        </van-col>
        <van-col span="17"
          ><van-icon
            name="search"
            style="position: absolute; margin-top: 13px; margin-left: 10px" />
          <input
            type="text"
            class="search_input"
            placeholder="请输入小区或地址"
            style="padding-left: 20px"
        /></van-col>
        <van-col
          span="3"
          class="search_map"
          style="font-size: 24px; color: white"
          ><van-icon name="guide-o"
        /></van-col>
      </van-row>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="item in SwiperArr"
          :key="item.id"
          :style="`background-image:url(http://liufusong.top:8080${item.imgSrc}
) index:100;background-size:cover`"
        >
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-grid class="small-navbar">
      <van-grid-item class="rent-navbar" icon="wap-home-o" text="整租" />
      <van-grid-item class="rent-navbar" icon="friends-o" text="合租" />
      <van-grid-item class="rent-navbar" icon="guide-o" text="地图找房" />
      <van-grid-item class="rent-navbar" icon="bill-o" text="去出租" />
    </van-grid>
    <div class="group">
      <h3 class="group-title">租房小组</h3>
      <span class="more">更多</span>
      <van-grid :column-num="2" gutter="10">
        <van-grid-item v-for="(item, index) in rentGroup" :key="index"
          ><img
            :src="'http://liufusong.top:8080' + item.imgSrc"
            alt=""
            style="
              width: 50px;
              height: 50px;
              display: inline-block;
              margin-right: 10px;
            "
          />
          <div style="display: inline-block">
            {{ item.title }}<br />
            {{ item.desc }}
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- <span>搜索栏</span> -->
  </div>
</template>

<script>
import { getHomeSwiperAPI, getGroupAPI } from '@/api'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      SwiperArr: [],
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      rentGroup: []
    }
  },
  computed: {
    ...mapState(['nowCity'])
  },
  created() {
    this.getHomeSwiper()
    this.getgroups()
  },
  methods: {
    async getHomeSwiper() {
      const { data } = await getHomeSwiperAPI()
      // console.log(data)
      this.SwiperArr = data.body
      // console.log(this.SwiperArr)
    },
    toCity() {
      this.$router.push('/city')
    },
    async getgroups() {
      try {
        const { data } = await getGroupAPI()
        // console.log(data)
        this.rentGroup = data.body
        // console.log(this.rentGroup)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.rent-navbar) {
  .van-grid-item__content {
    flex-direction: column;
  }
}
:deep(.van-grid-item__content) {
  flex-direction: row;
}

.group {
  position: relative;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background-color: #f6f5f6;
  overflow: hidden;
  padding: 0 10px 10px;
  .group-title {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    font-family: 'Microsoft YaHei';
    color: #333;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
    margin: 15px 0 15px 10px;
    font-size: 15px;
  }
  .more {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    font-family: 'Microsoft YaHei';
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: #787d82;
    position: absolute;
    right: 10px;
    font-size: 14px;
    font-weight: 400;
    top: 20px;
  }
}
.small-navbar {
  margin-top: 20px;
}
.search_border {
  display: inline-block;
  position: absolute;
  top: 10px;
  left: 63px;
  width: 1px;
  height: 16px;
  background-color: rgb(214, 214, 214);
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 212px;
  text-align: center;
  /* background-color: #39a9ed; */
  /* background: image(); */
}
.searchbox_search {
  line-height: 34px;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 25px;
  width: 92%;
  padding: 0 10px;
  z-index: 2;
  text-align: left;
  overflow: hidden;
  display: flex;
  align-items: center;
  /* border: 1px solid #fff; */
  margin-left: 20px !important;
  height: 34px;
  margin-right: 10px;
  /* border-radius: 3px !important; */
}
.select_city {
  border-radius: 5px 0 0 5px;
}
.search_input {
  width: 95%;
  height: 34px;
  border: 0;
  outline: 0;
  border-radius: 0 5px 5px 0;
  padding-left: 30px !important;
}
.search_map {
  text-align: center;
  padding-left: 29px;
}
.select_city {
  background-color: #fff;
  width: 18%;
  height: 34px;
  line-height: 34px;
  text-align: center;
}
</style>
