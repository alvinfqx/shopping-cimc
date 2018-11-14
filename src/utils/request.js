import axios from 'axios'
import {Confirm, Alert, Toast, Notify, Loading} from 'vue-ydui/dist/lib.rem/dialog';
import {wipeOffNull} from './utils'

// const BASE_API = "http://10.47.34.130:8077/cimcmq";
// const BASE_API = "http://10.47.34.130:9902/cimcmq";
// const BASE_API = "https://bk.3bd.com.cn/cimcmq";
// const BASE_API = "http://10.47.34.229:8077/cimcmq";
// const BASE_API = "https://bk.3bd.com.cn/cimcmq";
const BASE_API = "https://bk.3bd.com.cn/cimcmqTest";

//默认配置项
const defSeting = {
  method: 'post'
};

const service = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: BASE_API,
  timeout: 5000
});

// request interceptor
service.interceptors.request.use(config => {
  Loading.open('加载中..');
  Object.assign(defSeting, config);
  return config
}, error => {
  Loading.close();
  console.log(error); // for debug
  Promise.reject(error)
});

// respone interceptor
service.interceptors.response.use(
  response => {

    Loading.close();

    let res = response.data;
    if (res.code == "200") {
      return wipeOffNull(res)
    } else {
      analyCode(res.code, res)
    }

  },
  error => {
    Loading.close();
    console.log('err ===>' + error);// for debug
    Toast({
      mes: '暂无数据,请稍后再试',
      timeout: 2000,
      icon: 'error',
      callback: () => {
      }
    });
    return Promise.reject(error)
  })
export default service

function analyCode(code, res) {
  if (!!code) {

  } else if (!!res) {
    Toast({
      mes: res.status.errorMessage,
      timeout: 2000,
      icon: 'error',
      callback: () => {
      }
    });
  }
}
