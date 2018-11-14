/**
 * Created by cimc on 2018/7/5.
 */
import {Toast} from 'vue-ydui/dist/lib.rem/dialog'
import request from './request'

export function weixinUtilsInit() {
  let url = location.href.split('#');
  request({
    url: '/WxTencent/getConfig',
    method: 'post',
    data:{
      "url":url[0]
     // "url":"http://bk.3bd.com.cn:8080/dist/"
    }
  }).then((res) => {
    console.log(res);
    if(res){
      let res_data = res.data;
      wx.config({
        //debug:process.env.WEIXIN_BUG,
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx25d188be5160e798', // 必填，公众号的唯一标识
        timestamp: res_data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res_data.nonceStr, // 必填，生成签名的随机串
        signature: res_data.signature,// 必填，签名
        jsApiList: ['scanQRCode','chooseImage','uploadImage','translateVoice'] // 必填，需要使用的JS接口列表
      });
    }

  })
}

//扫码
export function wxScanQRCode() {
  return new Promise((resolve, reject) => {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      //scanType: ["qrCode"], // 可以指定扫二维码
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        console.log(res);
        resolve(res);
        //var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      },
      fail: function (res) {
        console.log(res);
        //console.log(res);
        actionTip(2);
        reject(res)
      }
    })
  })
}

//选择图片
export function wxChooseImage() {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        resolve(res);
        // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      },
      fail: function (res) {
       // console.log(res);
        actionTip(3);
        reject(res)
      }
    });
  })
}

//上传图片
export function wxUploadImage(data) {
  return new Promise((resolve, reject) => {
    wx.uploadImage({
      localId: data, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        resolve(res);
        //var serverId = res.serverId; // 返回图片的服务器端ID
      },
      fail: function (res) {
       // console.log(res);
        actionTip(4);
        reject(res)
      }
    });
  })
}

export function wxDownloadImage(data) {
  return new Promise((resolve, reject) => {
    wx.downloadImage({
      serverId: data, // 需要下载的图片的服务器端ID，由uploadImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
       // var localId = res.localId; // 返回图片下载后的本地ID
        resolve(res);
      }
    });
  })
}

function actionTip(tip_type) {
  let tip_text = '';
  switch (tip_type + '') {
    case '2':
      tip_text = "请求扫码失败,请稍后再试";
      break;
    case '3':
      tip_text = "请求获取图片失败,请稍后再试";
      break;
    case '4':
      tip_text = "上传图片失败,请稍后再试";
      break;
    default:
      tip_text = tip_type;
      break;
  }

  Toast({
    mes: tip_text,
    timeout: 2000,
    icon: 'error',
    callback: () => {
    }
  });
}

