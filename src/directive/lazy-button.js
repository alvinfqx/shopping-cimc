import Vue from 'vue'
const install = function(Vue) {

  Vue.directive('lazy-button', {

    bind(el, binding,vnode) {
      var oldClassName = "";
      var oldButtonHtml = "";
      el.addEventListener('click', e => {
        console.log(binding);
        console.log(el);

        oldClassName = el.className;
        oldButtonHtml = el.innerHTML;


        el.setAttribute("disabled","disabled")

        console.log(oldClassName)
        el.className = oldClassName+" is-loading"
        el.innerHTML = '<span class="yd-btn-loading"><span class="yd-btn-rolling yd-btn-rolling-large" style="margin-right: 8px;"><i></i></span> 缓慢加载中</span>';
        setTimeout(function () {
          console.log(oldClassName)
          el.className = oldClassName
          el.removeAttribute("disabled")
          el.innerHTML = oldButtonHtml
          console.log(el)
        },3000)
      })



    }
  })
}
Vue.use(install);
