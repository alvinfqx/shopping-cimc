import request from '@/utils/request'

//登录
export function login(account,password) {
  return request({
    url: '/user/operatorLogin',
    method: 'post',
    data:{
      "account":account,
      "password":password
    }
  })
}
