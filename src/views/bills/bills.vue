<template>
  <div>
    <div class="list-block">
      <div class="info-item bg-c-fff tc"
           v-for="(item,index) in dataList"
           :key="item.id"
           @click="goBillsDetailsPage(item.id,item.status)"
      >
        <span>{{item.createDateTime}}</span>
        <span>{{item.id}}</span>
        <span :style="{color:analyStatusColor(item.status)}">{{item.status | analyBillsStatus}}</span>
      </div>
    </div>

  </div>
</template>

<script>
  import {getBillsData} from '@/api/bills'

  export default{
    name: '',
    props: {},
    data(){
      return {
        dataList: []
      }
    },
    components: {},
    created(){
      this.getList()
    },
    mounted() {

    },
    methods: {
      getList(){
        let user_data = this.$store.getters.userData;
        getBillsData(user_data.id)
          .then((res) => {

            if (res.data.length == 0) {
              this.$tip.toast({type: 1});
            } else {
              this.dataList = res.data;
            }

          })
      },
      goBillsDetailsPage(res_id, res_status){
        if (res_status == "0") {
          this.$tip.toast({
            type: 0,
            text: "该维修单待审核"
          })
        } else if (res_status == "1") {
          this.$tip.toast({
            type: 0,
            text: "该维修单已处理"
          })
        } else {
          this.$router.push({path: '/bills-details', query: {id: res_id}})
        }
      },
      analyStatusColor(status){
        let color = '状态未明';
        switch (status + '') {
          case '0':
            color = "#ff6868";
            break;
          case '1':
            color = "#999999";
            break;
          case '2':
            color = "#ff6868";
            break;
        }
        return color
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style scoped>
  .info-item {
    display: flex;
    height: 1.15rem;
    padding: 0 0.3rem;
    line-height: 1.15rem;
    border-bottom: 1px solid #ededed;
  }

  .info-item span:first-child {
    width: 3rem;
    min-width: 3rem;
  }

  .info-item span:last-child, span:nth-child(2) {
    flex: 1;
  }
</style>
