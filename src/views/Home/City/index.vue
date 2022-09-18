<template>
  <div>
    <van-nav-bar
      title="城市列表"
      left-arrow
      class="navbar"
      @click-left="goBack"
    />
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell>{{ nowCity }}</van-cell>
      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        v-for="item in hotCity"
        :key="item.value"
        :title="item.label"
        @click="selectCity(item)"
        to="/Layout/Home"
      />
      <div class="CityList" v-for="(item, index) in mainIndexList" :key="index">
        <van-index-anchor :index="item">{{ item }}</van-index-anchor>
        <van-cell
          v-for="item1 in cityList.filter((i) => {
            return i.short.toUpperCase()[0] == item
          })"
          :key="item1.value"
          :title="item1.label"
          @click="selectCity(item1)"
          to="/Layout/Home"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityInfoAPI, getHotCityAPI } from '@/api'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      indexList: [
        '#',
        '热',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      mainIndexList: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      hotCity: [],
      cityList: [],
      isEmpty: false,
      newArr: []
    }
  },
  computed: {
    ...mapState(['nowCity'])
  },
  created() {
    this.getCityInfo()
    this.getHotCity()
  },
  methods: {
    ...mapMutations(['setnowCity']),
    ...mapMutations(['setCityId']),
    goBack() {
      this.$router.go(-1)
    },
    async getCityInfo() {
      const { data } = await getCityInfoAPI()
      this.cityList = data.body
      this.isEmpty = true
      // console.log(this.cityList)
      if (this.isEmpty === true) {
        this.cityFilter(this.indexList)
        this.cityFilter(this.mainIndexList)
      }

      // this.console.log(data)
    },
    async getHotCity() {
      const { data } = await getHotCityAPI()
      // console.log(data)
      this.hotCity = data.body
    },
    cityFilter(List) {
      for (let j = 2; j < List.length; j++) {
        this.newArr = this.cityList.filter((i) => {
          // console.log(i.short)
          // console.log(List)
          const nArr = i.short.toUpperCase().split('')
          return nArr[0] === List[j]
        })
        // console.log(newArr)
        if (this.newArr.length === 0) {
          List.splice(j, 1)
          j--
        }
        // console.log(this.List)
      }
    },
    selectCity(item) {
      // console.log(this.$store.state.nowCity)
      this.$store.commit('setnowCity', item.label)
      this.$store.commit('setCityId', item.value)
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar__content) {
  height: 45px;
  color: #fff;
  background-color: #21b97a !important;
}
:deep(.van-nav-bar__title) {
  color: #fff !important;
}
:deep(.van-icon) {
  color: #fff !important;
}
:deep(.hotcity1) {
  position: absolute;
  top: 10px;
}
</style>
