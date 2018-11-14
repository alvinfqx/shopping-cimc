<template>
  <div>

  </div>
</template>

<script>
  export default{
    name: '',
    props: {},
    inject: ["getMap","openInfoWindow"],
    data(){
      return {

      }
    },
    components: {},
    mounted() {

    },
    created:function () {
      var info = [];
      info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
      info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
      info.push("电话 : 010-84107000   邮编 : 100102");
      info.push("地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>");
      var infoWindow = new AMap.InfoWindow({
        content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
      });
      openInfoWindow(function (map,options) {
        infoWindow.open(map, options);
      })
    },
    methods: {},
    computed: {},
    watch: {}
  }
</script>

<style scoped>

</style>
