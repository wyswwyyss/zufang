import request from '@/utils/request'

export const getCityInfoAPI = (level) => {
  return request({
    method: 'GET',
    url: '/area/city',
    params: {
      level: 1
    }
  })
}
export const getHotCityAPI = () => {
  return request({
    method: 'GET',
    url: '/area/hot'
  })
}
