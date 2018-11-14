<template>
  <div>

    <div class="menu-block bg-c-fff">

      <div class="menu-item tc">
        <router-link to="/home/facility" replace>
          <div class="menu-icon">
            <img class="facility-icon" :src="facility_icon" alt="facility-icon">
          </div>
          <span>我的设备</span>
        </router-link>
      </div>

      <div class="middle-item tc" @click="openScanCamera">
        <div class="middle-icon">
          <img :src="scan_icon" alt="scan-icon">
        </div>
        <span>维修</span>
      </div>

      <div class="menu-item tc">
        <router-link to="/home/bills" replace>
          <div class="menu-icon">
            <img class="bills-icon" :src="bills_icon" alt="bills-icon">
          </div>
          <span>我的维修单</span>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script>
  import {wxScanQRCode} from '@/utils/weixin-utils'
  import {
    openFacilityDoor,
    getBillsIdByfacilityId
  } from '@/api/facility'

  export default{
    name: 'bottom-menu',
    props: {
    },
    data(){
      return {
        facility_icon: "",
        bills_icon: "",
        //设备
        bills_default: require('@/assets/icons/order_icon_default_tabber@2x.png'),
        bills_activate: require('@/assets/icons/order_icon_hover_tabber@2x.png'),
        //维修单
        facility_default: require('@/assets/icons/equipment_icon_default_tabber@2x.png'),
        facility_activate: require('@/assets/icons/equipment_icon_hover_tabber@2x.png'),
        //扫一扫
        scan_icon: require('@/assets/icons/maintenance@2x.png')
      }
    },
    mounted() {
      this.switchImage(this.$route.name)
    },
    methods: {
      openScanCamera() {
        wxScanQRCode()
          .then((res) => {
            console.log(res);

//            let device_id = getUrlParam(res.path, "deviceId");
            let device_id = res.resultStr;
            if (!!device_id) {

              openFacilityDoor(device_id).then((res) => {

                if (res.data == "success") {
                  this.$tip.success("开门成功")
                } else {
                  this.$tip.error("开门失败")
                }

              });

            } else {
              this.$tip.error('设备id无法解析')
            }
          })
      },
      switchImage(name) {
        if (name == "bills") {
          this.facility_icon = this.facility_default;
          this.bills_icon = this.bills_activate;
        } else if (name == "facility") {
          this.facility_icon = this.facility_activate;
          this.bills_icon = this.bills_default;
        }
      }
    },
    watch: {
      $route(to, from){
        let name = to.name;
        this.switchImage(name)
      }
    },
  }
</script>

<style scoped>
  .menu-block {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.1rem 1rem;
    color: #999;
  }

  .middle-item {
    position: absolute;
    top: -0.4rem;
    left: 44%;
  }

  .menu-icon {
    border-radius: 50%;
  }

  .middle-icon img {
    width: 0.9rem;
    height: 0.9rem;
  }

  .menu-item span {
    color: #999;
  }

  .menu-icon img {
    width: 0.5rem;
    height: 0.5rem;
  }

  .router-link-active span {
    color: #06b5c4 !important;
  }

</style>
