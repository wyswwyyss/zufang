import axios from '@/utils/request'

export const getHomeSwiperAPI = () => {
  return axios({
    url: '/home/swiper'
  })
}
export const getGroupAPI = () => {
  return axios({
    url: '/home/groups'
  })
}
