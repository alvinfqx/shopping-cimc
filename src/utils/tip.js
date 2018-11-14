import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor() {
    this.isLoading = false;
  }

  static success(title,callback) {
    Toast({
      mes: title,
      timeout: 1500,
      icon: 'success',
      callback:() =>{
        callback&&callback()
      }
    });
  }

  static error(title,callback) {
    Toast({
      mes: title,
      timeout: 1500,
      icon: 'error',
      callback:() =>{
        callback&&callback()
      }
    });
  }

  static toast(options){
    if(options.type+''){
      switch (options.type+''){
        case '1':
          options['text'] = '暂无数据,请稍后再试';
              break;
      }
    }
    Toast({
      mes: options['text'],
      timeout: 1500
    });
  }


}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false;
