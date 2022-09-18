<template>
  <div class="house" style="clear: both">
    <van-nav-bar left-arrow class="navbar" @click-left="goBack" />
    <van-row class="searchbox_search">
      <van-col span="1" class="select_city" @click="toCity"
        >{{ nowCity }}<van-icon class="ardown" name="arrow-down" /><span
          class="search_border"
        ></span>
      </van-col>
      <van-col span="17"
        ><van-icon class="iconsearch" name="search" />
        <input
          type="text"
          class="search_input"
          placeholder="请输入小区或地址"
          style="padding-left: 20px"
      /></van-col>
      <van-col span="3" class="search_map" style="font-size: 24px; color: white"
        ><van-icon name="guide-o"
      /></van-col>
    </van-row>
    <div class="filterMask" :class="{ isShow: isShow }"></div>
    <van-tabbar
      class="filterbox"
      v-model="active"
      active-color="#21b97a"
      inactive-color="#000"
      ><van-tabbar-item class="area" @click="isShow = false"
        >区域<span
          class="iconfont icon-sanjiaoxia"
          style="font-size: 20px"
        ></span
      ></van-tabbar-item>
      <van-tabbar-item @click="isShow = false"
        >方式<span
          class="iconfont icon-sanjiaoxia"
          style="font-size: 20px"
        ></span>
      </van-tabbar-item>
      <van-tabbar-item @click="isShow = false"
        >租金<span
          class="iconfont icon-sanjiaoxia"
          style="font-size: 20px"
        ></span>
      </van-tabbar-item>
      <van-tabbar-item
        @click="
          isShow = true
          show = true
        "
        >筛选<span
          class="iconfont icon-sanjiaoxia"
          style="font-size: 20px"
        ></span>
      </van-tabbar-item>
    </van-tabbar>
    <div :class="{ isShow: isShow }">
      <van-picker
        :columns="columnsArea"
        style="z-index: 3; top: -5px"
        :class="{ isShow: active != 0 }"
        ref="area"
        @confirm="selectArea"
      />
      <van-picker
        :columns="columnsRent"
        style="z-index: 3; top: -5px"
        :class="{ isShow: active != 1 }"
      />
      <van-picker
        :columns="columnsPrice"
        style="z-index: 3; top: -5px"
        :class="{ isShow: active != 2 }"
      />
      <div class="select" :class="{ isShow: active == 3 }">
        <span class="cancel" style="z-index: 4" @click="isShow = !isShow"
          >取消</span
        ><span class="confirm" style="z-index: 4" @click="selectArea"
          >确定</span
        >
      </div>
    </div>
    <van-popup
      v-model="show"
      position="right"
      style="width: 80%; height: 100%; z-index: 5"
    >
      <div class="filterMore">
        <dl class="filterMore_dl">
          <dt class="filterMore_dt">户型</dt>
          <dd class="filterMore_dd">
            <span
              class="filterMore_tag"
              v-for="(item, index) in columnsRoom"
              :key="index"
              @click="selected($event)"
              >{{ item.label }}</span
            >
          </dd>
          <dt class="filterMore_dt">朝向</dt>
          <dd class="filterMore_dd">
            <span
              class="filterMore_tag"
              v-for="item in columnsLocation"
              :key="item.value"
              @click="selected($event)"
              >{{ item.label }}</span
            >
          </dd>
          <dt class="filterMore_dt">楼层</dt>
          <dd class="filterMore_dd">
            <span
              class="filterMore_tag"
              v-for="item in columnsFloor"
              :key="item.value + 1"
              @click="selected($event)"
              >{{ item.label }}</span
            >
          </dd>
          <dt class="filterMore_dt">房屋亮点</dt>
          <dd class="filterMore_dd">
            <span
              class="filterMore_tag"
              v-for="item in columnsLight"
              :key="item.value + 2"
              @click="selected($event)"
              >{{ item.label }}</span
            >
          </dd>
        </dl>
      </div>
      <div class="filterFooter">
        <span class="footer-clear">清除</span>
        <span class="footer-confirm">确定</span>
      </div>
    </van-popup>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="rv">
        <div class="houseItem" v-for="(item, index) in houseItem" :key="index">
          <div class="houseItem_imgWrap">
            <img
              class="houseItem_img"
              :src="`http://liufusong.top:8080${item.houseImg}`"
              alt=""
            />
          </div>
          <div class="houseItem_content">
            <h3 class="houseItem_title">{{ item.title }}</h3>
            <div class="houseItem_desc">{{ item.desc }}</div>
            <div>
              <span
                class="houseItem_tag"
                v-for="(item1, index) in item.tags"
                :key="index + 1"
                >{{ item1 }}</span
              >
            </div>
            <div class="houseItem_price">
              <span class="houseItem_priceNum">{{ item.price }}</span> 元/月
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getHouseConditionAPI, getHouseItemAPI } from '@/api'
export default {
  data() {
    return {
      active: 2,
      show: false,
      columnsArea: [],
      columnsRent: [],
      columnsPrice: [],
      columnsRoom: [],
      columnsLocation: [],
      columnsFloor: [],
      columnsLight: [],
      houseItem: [],
      areaId: '',
      lastItemLength: 0,
      loading: false,
      finished: false,
      refreshing: false,
      isShow: true
    }
  },
  created() {
    this.getHouseCondition(this.cityId)
  },
  computed: {
    ...mapState(['nowCity']),
    ...mapState(['cityId'])
  },
  methods: {
    async getHouseCondition(id) {
      console.log(id)
      try {
        const { data } = await getHouseConditionAPI(id)
        console.log(data)
        this.columnsArea[0] = data.body.area
        this.columnsArea[1] = data.body.subway
        this.columnsRent = data.body.rentType
        this.columnsPrice = data.body.price
        this.columnsRoom = data.body.roomType
        this.columnsLocation = data.body.oriented
        this.columnsFloor = data.body.floor
        this.columnsLight = data.body.characteristic
        console.log(this.columnsLight)
        // console.log(this.columnsRent)
        /* eslint quote-props: ["error", "as-needed", { "keywords": true, "unnecessary": false }] */
        this.columnsArea = this.getfilterInfo(this.columnsArea)
        this.columnsRent = this.convertKey(this.columnsRent, { label: 'text' })
        this.columnsPrice = this.convertKey(this.columnsPrice, {
          label: 'text'
        })
        // this.
      } catch (error) {
        console.log(error)
      }
    },
    onConfirm() {
      this.$refs.item.toggle()
    },
    goBack() {
      this.$router.go(-1)
    },
    toCity() {
      this.$router.push('/city')
    },
    convertKey(arr, keyMap) {
      let tempString = JSON.stringify(arr)
      for (var key in keyMap) {
        var reg = `/"${key}":/g`
        tempString = tempString.replace(
          this.evil(reg),
          '"' + keyMap[key] + '":'
        )
      }
      return JSON.parse(tempString)
    },
    evil(fn) {
      const Fn = Function
      return new Fn('return' + fn)()
    },
    addChildren(arr) {
      arr.forEach((item) => {
        // console.log(arr)
        if (!item.children && item.text) {
          item.children = []
        } else {
          this.addChildren(item.children)
        }
      })
      return arr
    },
    getfilterInfo(arr) {
      arr = this.convertKey(arr, {
        label: 'text'
      })
      arr = this.addChildren(arr)
      return arr
    },
    selected(e) {
      if (e.target.className === 'filterMore_tag') {
        e.target.className = 'filterMore_tagActive'
      } else {
        e.target.className = 'filterMore_tag'
      }
    },
    async getHouseItem(area, end) {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        const { data } = await getHouseItemAPI(this.cityId, area, end)
        this.houseItem = data.body.list
        // console.log(this.houseItem)
      } catch (error) {
        console.log(error)
      }
    },
    async selectArea() {
      this.getAreaValue(this.$refs.area.getValues())
      this.isShow = !this.isShow
      await this.getHouseItem(this.areaId, 20)
      // console.log(this.areaId)
    },
    async onLoad() {
      this.lastItemLength = this.houseItem.length
      await this.getHouseItem(this.areaId, this.houseItem.length + 20)
      this.loading = false
      // console.log(this.lastItemLength)
      if (
        this.loading === false &&
        this.lastItemLength === this.houseItem.length
      ) {
        this.finished = true
      } else {
        this.finished = false
      }
    },
    getAreaValue(arr) {
      console.log(arr)
      if (
        arr[arr.length - 1] === undefined ||
        arr[arr.length - 1].value === 'null'
      ) {
        // console.log(1)
        if (
          arr[arr.length - 2] === undefined ||
          arr[arr.length - 2].value === 'null'
        ) {
          // console.log(1)
          this.areaId = ''
        } else {
          // console.log(2)
          this.areaId = arr[arr.length - 2].value
        }
      } else {
        this.areaId = arr[arr.length - 1].value
      }
    }
  }
}
</script>

<style scoped lang="less">
.houseItem_priceNum {
  -webkit-text-size-adjust: 100%;
  font-family: 'Microsoft YaHei';
  direction: ltr;
  line-height: 22px;
  color: #fa5741;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  font-weight: bolder;
}
.houseItem_price {
  -webkit-text-size-adjust: 100%;
  font-family: 'Microsoft YaHei';
  direction: ltr;
  line-height: 22px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 12px;
  color: #fa5741;
}
.houseItem_tag {
  -webkit-text-size-adjust: 100%;
  font-family: 'Microsoft YaHei';
  direction: ltr;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  display: inline-block;
  font-size: 12px;
  border-radius: 3px;
  padding: 4px 5px;
  margin-right: 5px;
  line-height: 12px;
  color: #39becd;
  background: #e1f5f8;
}
.houseItem_desc {
  -webkit-text-size-adjust: 100%;
  font-family: 'Microsoft YaHei';
  direction: ltr;
  line-height: 22px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  font-size: 12px;
  color: #afb2b3;
}
.houseItem_title {
  -webkit-text-size-adjust: 100%;
  font-family: 'Microsoft YaHei';
  direction: ltr;
  line-height: 22px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 0;
  font-size: 15px;
  color: #394043;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.rv {
  line-height: 1;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: auto;
  max-width: 345px;
  overflow: hidden;
  position: relative;
}
.houseItem_content {
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  direction: ltr;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  line-height: 22px;
  padding-left: 12px;
}
.houseItem_img {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  direction: ltr;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-style: none;
  width: 106px;
  height: 80px;
}
.houseItem_imgWrap {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  direction: ltr;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  float: left;
  width: 106px;
  height: 80px;
}
.houseItem {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  direction: ltr;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  justify-content: space-around;
  padding-top: 18px;
  border-bottom: 1px solid #e5e5e5;
  height: 120px;
  width: 90%;
  margin: 0px auto;
}
.filterMore_tagActive {
  -webkit-text-size-adjust: 100%;
  font-family: 'Microsoft YaHei';
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  display: inline-block;
  height: 32px;
  width: 70px;
  margin: 0 18px 15px 0;
  border-radius: 3px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  border: 1px solid #21b97a;
  color: #21b97a;
  background-color: #defaef;
}
.filterMore_tag {
  -webkit-text-size-adjust: 100%;
  font-family: 'Microsoft YaHei';
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  display: inline-block;
  height: 32px;
  width: 70px;
  margin: 0 18px 15px 0;
  border: 1px solid #ddd;
  border-radius: 3px;
  line-height: 32px;
  text-align: center;
  font-size: 12px;
  color: #888;
}
.footer-confirm {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  border-radius: 0;
  flex: 2 1;
  color: #fff;
  background-color: #21b97a;
  z-index: 9999;
}
.footer-clear {
  z-index: 9999;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  flex: 1 1;
  border-radius: 0;
  color: #21b97a;
}
.filterFooter {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-align: left;
  overflow: hidden;
  display: flex;
  margin-top: 20px;
  border-top: 1px solid #e9e9e9;
  position: fixed;
  left: 12px;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 9999;
  align-items: center;
}
.filterMore_dd {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 14px;
}
.filterMore_dt {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 20px 0;
  font-size: 15px;
}
.filterMore_dl {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  padding: 0 -15 0 0px;
  margin-bottom: 50px;
}
.filterMore {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: fixed;
  display: flex;
  top: 0;
  left: 16px;
  right: 0;
  bottom: 25px;
  overflow: auto;
  padding-bottom: 50px;
  z-index: 3;
  background-color: #fff;
}
:deep(.select) {
  background-color: white;
  z-index: 3;
}
.filterMask {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
}
.confirm {
  -webkit-text-size-adjust: 100%;
  font-family: 'Microsoft YaHei';
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  display: inline-block;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  border-radius: 0;
  flex: 2 1;
  color: #fff;
  background-color: #21b97a;
}
.cancel {
  -webkit-text-size-adjust: 100%;
  font-family: 'Microsoft YaHei';
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgb(255, 255, 255);
  display: inline-block;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  flex: 1 1;
  border-radius: 0;
  color: #21b97a;
  background-color: #fff;
}
.select {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #fff;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-align: left;
  overflow: hidden;
  display: flex;
  margin-top: -6px;
  border-top: 1px solid #e9e9e9;
  align-items: center;
}
.isShow {
  display: none;
  // z-index: 3;
}
:deep(.van-tabbar-item) {
  width: 93.75px;
  height: 35px;
}
:deep(.filterbox) {
  height: 35px;
  line-height: 35px;
  // text-align: center;
  padding-bottom: 5px;
  top: 45px;
  z-index: 4;
  position: absolute;
  .van-tabbar-item {
    font-size: 18px;
    z-index: 4;
  }
}
.search-input {
  color: red;
}
:deep(.van-icon) {
  color: #fff !important;
}
:deep(.iconsearch) {
  position: absolute;
  margin-top: 13px;
  margin-left: 10px;
  color: #9c9fa1 !important;
}
:deep(.ardown) {
  color: black !important;
}

:deep(.van-nav-bar__content) {
  height: 45px;
  color: #fff;
  background-color: #21b97a !important;
  margin-bottom: 45px;
}
.small-navbar {
  margin-top: 20px;
}
.search_border {
  display: inline-block;
  position: absolute;
  top: 7px;
  left: 63px;
  width: 1px;
  height: 16px;
  background-color: rgb(214, 214, 214);
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 212px;
  text-align: center; /* background-color:
#39a9ed; */ /* background: image(); */
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
  top: 7px;
  width: 85%;
  padding: 0 10px;
  z-index: 2;
  text-align: left;
  overflow: hidden;
  display: flex;
  align-items: center; /*
border: 1px solid #fff; */
  margin-left: 35px !important;
  height: 30px;
  margin-right: 10px; /* border-radius: 3px !important; */
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
