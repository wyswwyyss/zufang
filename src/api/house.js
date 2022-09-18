import request from '@/utils/request'
export const getHouseConditionAPI = (id) => {
  return request({
    method: 'GET',
    url: '/houses/condition',
    params: {
      id
    }
  })
}
export const getHouseItemAPI = (
  id,
  area,
  subway,
  rentType,
  price,
  more,
  roomType,
  oriented,
  characteristic,
  floor,
  end
) => {
  return request({
    method: 'GET',
    url: '/houses',
    params: {
      cityId: id,
      area,
      subway,
      rentType,
      price,
      more,
      roomType,
      oriented,
      characteristic,
      floor,
      end
    }
  })
}
