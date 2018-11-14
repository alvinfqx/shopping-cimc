<template>
  <div>

    <back-nav-bar title="维修设备"></back-nav-bar>

    <div class="info-block">
      <div class="content-block bg-c-fff">
        <div class='info-row'>
          <div class="doc">设备名称</div>
          <div class="info-data">{{data.deviceName}}</div>
        </div>
        <div class='info-row'>
          <div class="doc">设备地址</div>
          <div class="info-data">{{data.coordinate}}</div>
        </div>
        <div class='info-row'>
          <div class="doc">维修单时间</div>
          <div class="info-data">{{data.createDateTime}}</div>
        </div>
        <div class='info-row'>
          <div class="doc">维修内容</div>
          <div class="info-data">
            {{data.explanation}}
          </div>
        </div>
        <div class='form-item'>
          <div class="doc">维修照片</div>
          <div class="show-img-block">

            <yd-lightbox>
              <yd-lightbox-img v-lazy="pickImage" :original="pickImage"></yd-lightbox-img>
            </yd-lightbox>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getProcessed} from '@/api/bills'
  export default{
    data(){
      return {
        id: "",
        pickImage: '',
        data: {}
      }
    },
    components: {},
    created(){
      this.id = this.$route.query.id;
      this.getData()
    },
    mounted() {
    },
    methods: {
      getData(){
        let user_data = this.$store.getters.userData;
        let post_data = {
          "userId": user_data.id,
          "id": this.id
        };
        getProcessed(post_data).then((res) => {
          console.log(res);
          this.data = res.data[0]
          this.pickImage = process.env.IMAGE_URL + res.data[0].filepath
        })
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style scoped>
  .info-block {
    padding: 0.3rem;
  }

  .content-block {
    padding: 0 0.3rem 0 0.5rem;
    border-radius: 0.1rem;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    height: 0.7rem;
    line-height: 0.7rem;
  }

  .form-item {
    /*height: 0.7rem;*/
    /*line-height: 0.7rem;*/
  }

  .form-item .doc {
    display: inline-block;
    margin-right: 0.3rem;
  }

  .form-item .input-block {
    display: inline-block;
    width: 4.6rem;
    border: 1px solid #ededed;
  }

  .pick-img-block {
    display: inline-block;
    margin: 0.5rem 0 3.8rem 0;
  }

  .pick-img-block img {
    width: 0.64rem;
    height: 0.64rem;
  }

  .show-img-block {
    display: inline-block;
    margin: 0.5rem 0 0.3rem 0;
  }

  .show-img-block img {
    width: 3.5rem;
    height: 2.5rem;
  }
</style>

<style>
  a {
    color: #fff !important;
  }
</style>
