<template>
  <div>
    <div id="container" style="width:100%; height:100%">
      <map-markers :markers="places"></map-markers>
    </div>
  </div>
</template>

<script>
  import mapMarkers from './components/mapMarkers'
  var map;
  export default{
    name: '',
    props: {},
    provide: function () {
      return {
        getMap: this.getMap,
        openInfoWindow:this.openInfoWindow
      }
    },
    data(){
      return {
        places: [
          {
            name: 'Wrocław',
            position: [
              116.405467, 39.907761
            ]
          },
          {
            name: 'New Orleans',
            position: [
              116.405467, 38.907761
            ]
          }
        ]
      }
    },
    components: {
      mapMarkers
    },
    mounted() {
      this.mapInit();
    },
    methods: {
      mapInit: function () {
        map = new AMap.Map('container', {
          center: [116.397428, 39.90923],
          resizeEnable: true,
          zoom: 10
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
          map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.Scale())
        })

        AMap.event.addListener(map, 'zoomend', function () {
          var zoom_size = map.getZoom()

            console.log(zoom_size)

        })

      },
      getMap: function (found) {
        let self = this;
        function checkForMap () {
          if (map) {
            found(map)
          } else {
            setTimeout(checkForMap, 50)
          }
        }
        checkForMap()
      },
      openInfoWindow:function (infowin) {
        let self = this;
        function checkForMap() {
          if(map){
              infowin(map)
          }else{
              setTimeout(checkForMap,50)
          }
        }
        checkForMap()
      }
    },

    computed: {},
    watch: {}
  }
</script>

<style scoped>

</style>
