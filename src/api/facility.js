import request from '@/utils/request'

//获取设备
export function getFacilityData(id) {
  return request({
    url: '/repairOrder/getDevice',
    method: 'post',
    data: {
      "userId": id
    }
  })
}

//根据设备id打开机库门
export function openFacilityDoor(id) {
  return request({
    url: '/repairOrder/opendHangar',
    method: 'post',
    data: {
      "deviceId": id
    }
  })
}

//根据设备编码 获取 维修单
export function getBillsIdByfacilityId(parma) {
  return request({
    url: '/repairOrder/getRepairOrder',
    method: 'post',
    data: parma
  })
}
