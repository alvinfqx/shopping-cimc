import request from '@/utils/request'

//获取维修单数据
export function getBillsData(id) {
  return request({
    url: '/repairOrder/findRepairRecord',
    method: 'post',
    data: {
      "userId": id
    }
  })
}

//获取维修记录
export function getServiceRecord(id) {
  return request({
    url: '/repairOrder/getProcessed',
    method: 'post',
    data: {
      "userId": id
    }
  })
}

//获取维修单详情
export function getDetail(data) {
  return request({
    url: '/repairOrder/getDetail',
    method: 'post',
    data: data
  })
}

//上传图片
export function downloadPhoto(mediaId) {
  return request({
    url: '/repairOrder/downloadPhoto',
    method: 'post',
    data: {
      "mediaId":mediaId
    }
  })
}

//编辑维修详情
export function upData(data) {
  return request({
    url: '/repairOrder/updateFinish',
    method: 'post',
    data: data
  })
}

//获取维修单(已处理)
export function getProcessed(data) {
  return request({
    url: '/repairOrder/getProcessed',
    method: 'post',
    data: data
  })
}
