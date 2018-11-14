/**
 * Created by cimc on 2018/9/29.
 */
/*const hijack = (obj, method, fun) => {
  let orig = obj[method]
  obj[method] = fun(orig)
}

hijack(window, 'console.log', (orig) => {

  return (text) => {
    let canLog = process.env.NODE_ENV === 'production';
    console.log("ceshi1")
    if (false) {
      orig.call(this,text)
    }
  }
});*/


let log = console.log;
window.console.log = (t) => {
  let canLog = process.env.NODE_ENV !== 'production';
  if (canLog) log(t)
};
