import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'zufang',
      reducer({ user, nowCity, cityId }) {
        return { user, nowCity, cityId }
      }
    })
  ],
  state: {
    user: {},
    nowCity: '',
    cityId: ''
  },
  getters: {
    isLogin(state) {
      return !!state.user.token
    }
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    },
    setnowCity(state, cityName) {
      state.nowCity = cityName
    },
    setCityId(state, cityId) {
      state.cityId = cityId
    }
  },
  actions: {},
  modules: {}
})
