/**
 * Created by cimc on 2018/7/3.
 */

//标识码
var prefix = 'service_';

/*去除空格*/
export function sTrim(text) {
  return text.replace(/\s/ig, '')
}

//============localStorage================

export function StorageGetter(key) {
  return localStorage.getItem(prefix + key);
};

export function StorageSetter(key, val) {
  if (typeof(key) == "object" && Object.prototype.toString.call(key).toLowerCase() == "[object object]" && !key.length) {
    for (var item in key) {
      localStorage.setItem(prefix + item, key[item]);
    }
  } else {
    localStorage.setItem(prefix + key, val);
  }
}

export function StorageRemove(key) {
  return localStorage.removeItem(prefix + key)
}

//==============sessionStorage===============

export function SessionGetter(key) {
  return sessionStorage.getItem(prefix + key);
}

export function SessionSetter(key, val) {
  if (typeof(key) == "object" && Object.prototype.toString.call(key).toLowerCase() == "[object object]" && !key.length) {
    for (var item in key) {
      sessionStorage.setItem(prefix + item, key[item]);
    }
  } else {
    sessionStorage.setItem(prefix + key, val);
  }

}

export function SessionRemove(key) {
  return sessionStorage.removeItem(prefix + key)
}

/**
 * 获取指定URL的参数值
 * @param url  指定的URL地址
 * @param name 参数名称
 * @return 参数值
 */
export function getUrlParam(url, name) {
  var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
  var matcher = pattern.exec(url);
  var items = null;
  if (null != matcher) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]));
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1]);
      } catch (e) {
        items = matcher[1];
      }
    }
  }
  return items;
}

//去除数据中的null 或 undefined
export function wipeOffNull(data_list) {

  if (!data_list) {
    return ""
  }

  if (data_list instanceof Array) {

    var r_list = [];
    for (let i of data_list) {
      if (i instanceof Object) {
        wipeOffNull(i)
      } else {
        r_list.push(((i) || ""))
      }
    }
    data_list = r_list

  } else if(data_list instanceof Object){

    for (let item in data_list) {
      let data_item = data_list[item];
      if (data_item instanceof Object) {
        wipeOffNull(data_list[item])
      } else {
        data_list[item] = ((data_item) || "")
      }
    }

  }

  return data_list
}
