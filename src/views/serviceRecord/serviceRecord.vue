<template>
  <div>
    <back-nav-bar title="维修记录"></back-nav-bar>

    <div class="list-block">
      <div class="info-item bg-c-fff"
           v-for="(item,index) in dataList"
           :key="item.id"
           @click="goDetailsPage(item.id)"
      >
        <div class="content-block">
          <div class="head-block">
            <span>{{item.createDateTime}}</span>
            <span>{{item.type | analyBillsType}}</span>
          </div>
          <div class="adds-block">
            <span>{{item.deviceName}}</span>
            <span>{{item.coordinate}}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {getServiceRecord} from '@/api/bills'

  export default{
    name: '',
    props: {},
    data(){
      return {
        dataList: []
      }
    },
    components: {

    },
    created(){
      this.getList()
    },
    mounted() {

    },
    methods: {
      getList(){
        let user_data = this.$store.getters.userData;
        getServiceRecord(user_data.id)
          .then((res) => {

            console.log(res);
            if (res.data.length !== 0) {
              this.dataList = res.data
            } else {
              this.$tip.toast({type: 1})
            }

          })
      },
      goDetailsPage(id){
        console.log(id);
        this.$router.push({path: '/service-details', query: {id: id}})
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
    margin-top: 0.1rem;
    width: 1.62rem;
    min-width: 1.62rem;
    height: 0.45rem;
    font-size: 0.24rem;
    line-height: 0.15rem;
    padding: 0.12rem 0.22rem;
    border: 1px solid #ff6868;
    color: #ff6868;
    border-radius: 0.06rem;
  }
</style>
