import axios from 'axios'
import store from '@/store'
axios.defaults.baseURL = 'http://liufusong.top:8080'
axios.defaults.timeout = 3000
axios.interceptors.request.use(
  function (config) {
    // 每一次发请求都会执行
    // 在发送请求之前都做些什么
    // 登录了，所有的请求都加上Authorization
    const {
      getters: { isLogin },
      state: { user }
    } = store
    if (isLogin) {
      config.headers.Authorization = `${user.token}`
    }
    return config
  },
  function (error) {
    console.log(error)
  }
)
export default axios
