<template>
  <div>
      <info-window></info-window>
  </div>
</template>

<script>
  import infoWindow from './infoWindow'
  export default{
    name: '',
    props: {
      markers:{
          type:Array
      }
    },
    inject: ["getMap","openInfoWindow"],
    data(){
      return {

      }
    },
    components: {
        infoWindow
    },
    mounted() {

    },
    methods: {},
    created: function () {
      var self = this
      self.getMap(function (map) {
        self.markers.forEach(function (place) {
          var marker = new AMap.Marker({
            position: place.position, //经纬度位置定位
            map: map
          });
          AMap.event.addListener(marker, 'click', function() {
            console.log(marker.getPosition())

            openInfoWindow(function(){
              marker.getPosition()
            })

//            infoWindow.open(map, marker.getPosition());
          });
        })
      })
    },
    computed: {},
    watch: {}
  }
</script>

<style scoped>

</style>
