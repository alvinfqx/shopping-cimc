<template>
  <div>
    <back-nav-bar title="维修单详情"></back-nav-bar>

    <div class="list-block">
      <div class="info-item bg-c-fff">
        <div class="content-block">
          <div class="head-block">
            <span>{{dataList.deviceName}}</span>
            <span>{{dataList.type | analyBillsType}}</span>
            <span :style="{color:dataList.status=='1'?'#999':'#ff6868'}">{{dataList.status | analyBillsStatus}}</span>
          </div>
          <div class="adds-block">
            <span>{{dataList.coordinate}}</span>
            <span>{{dataList.createDateTime}}</span>
            <span v-if="dataList.state!=1" class="apply-btn tc" @click="goDeviceService(id)">维修</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getDetail} from '@/api/bills'

  export default{
    name: '',
    props: {},
    data(){
      return {
        //维修单id
        id: '',
        //设备id
        deviceId: '',
        //列表数据
        dataList: {}
      }
    },
    components: {},
    created(){
      this.id = this.$route.query.id;
      this.deviceId = this.$route.query.deviceId;
      this.getData()
    },
    mounted() {
    },
    methods: {
      getData(){
        let user_data = this.$store.getters.userData;
        let post_data = {
          "id": this.id,
          "userId": user_data.id
        };
        if (this.deviceId) {
          post_data["deviceId"]
        }
        getDetail(post_data)
          .then((res) => {
            console.log(res);
            this.dataList = res.data
          })
      },
      goDeviceService(id){
        let device_id = this.deviceId;
        this.$router.push({path: '/device-service', query: {id: id, deviceId: device_id}})
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style scoped>
  .list-block {
    padding: 0.3rem;
  }

  .info-item {
    padding: 0.3rem 0;
    margin-bottom: 0.2rem;
    border-radius: 0.1rem;
    font-size: 0.24rem !important;
  }

  .content-block {
    padding: 0 0.3rem;
    border-left: solid 0.06rem #06b5c4;
  }

  .head-block, .adds-block {
    display: flex;
    justify-content: space-between;
  }

  .head-block {
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #ededed;
  }

  .adds-block {
    padding-top: 0.2rem;
  }

  /*.head-block,.adds-block{*/
  /*height: 0.6rem;*/
  /*line-height: 0.6rem;*/
  /*}*/

  .apply-btn {
    display: inline-block;
    width: 1.62rem;
    min-width: 1.62rem;
    height: 0.45rem;
    font-size: 0.24rem;
    line-height: 0.15rem;
    padding: 0.12rem 0.22rem;
    border: 1px solid #999999;
    color: #3e3d3d;
    border-radius: 0.06rem;
  }
</style>
