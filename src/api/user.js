// 用户相关请求模块
import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data
  })
}
export const userUpdate = (token) => {
  return request({
    method: 'GET',
    url: '/user',
    headers: {
      Authorization: token
    }
  })
}
