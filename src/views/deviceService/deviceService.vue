<template>
  <div>

    <back-nav-bar title="维修设备"></back-nav-bar>

    <div class="info-block">
      <div class="content-block bg-c-fff">
        <div class='info-row'>
          <div class="doc">设备名称</div>
          <div class="info-data">{{serviceData.deviceName}}</div>
        </div>
        <div class='info-row'>
          <div class="doc">设备地址</div>
          <div class="info-data">{{serviceData.coordinate}}</div>
        </div>
        <div class='info-row'>
          <div class="doc">维修单时间</div>
          <div class="info-data">{{serviceData.createDateTime}}</div>
        </div>
        <div class='form-item'>
          <div class="doc">维修内容</div>
          <div class="input-block">
            <yd-cell-item>
              <yd-textarea slot="right" placeholder="请输入维修内容" maxlength="200" v-model="reasons"></yd-textarea>
            </yd-cell-item>
          </div>
        </div>
        <div class='form-item'>
          <div class="doc">维修照片</div>
          <div class="pick-img-block" v-if="isPick" @click="openCamera">
            <img :src="pickIcon" alt="选择图片icon">
          </div>
          <div class="show-img-block" v-else>

            <yd-lightbox>
              <yd-lightbox-img :src="pickImage" :original="pickImage"></yd-lightbox-img>
            </yd-lightbox>

          </div>
        </div>
        <p class="tr mg-01" v-if="!isPick">
          <yd-button size="small" type="hollow" shape="circle" @click.native="openCamera">更换图片</yd-button>
        </p>
      </div>
    </div>

    <div class="confirm-btn" @click="upData">
      确认维修
    </div>

  </div>
</template>

<script>
  import {
    openFacilityDoor
  } from '@/api/facility'

  import {
    getDetail,
    upData,
    downloadPhoto
  } from '@/api/bills'

  import {
    wxChooseImage,
    wxUploadImage,
    wxDownloadImage
  } from '@/utils/weixin-utils'

  export default{
    name: '',
    props: {},
    data(){
      return {
        id: '',
        deviceId: '',
        serviceData: {},
        reasons: '',
        isPick: true,
        pickIcon: require('@/assets/icons/add_equipment@2x.png'),
        pickImage: ""
      }
    },
    components: {
    },
    created(){
      this.id = this.$route.query.id;
      this.deviceId = this.$route.query.deviceId;
      this.getData();
    },
    methods: {
      getData(){
        let user_data = this.$store.getters.userData;
        let post_data = {
          "userId": user_data.id
        };

        if (this.id) {
          post_data["id"] = this.id;
        }
        if (this.deviceId) {
          post_data["deviceId"] = this.deviceId;
        }
        getDetail(post_data)
          .then((res) => {
            console.log(res);
            this.serviceData = res.data;

           /* openFacilityDoor(res.data.deviceId).then((res) => {
              this.$tip.success("开门成功")
            });*/

          })
      },

      openCamera(){
        wxChooseImage()
          .then((res) => {
            console.log(res);
            this.isPick = false;
            this.pickImage = res.localIds;
          })
      },

      upData(){
        let reasons = this.reasons;
        if (!reasons) {
          this.$tip.error('请填写维修内容');
          return
        }

        let image_url = this.pickImage;
        if (!image_url[0]) {
          this.$tip.error('请选择或拍摄图片');
          return
        }

        wxUploadImage(image_url[0])
          .then((res) => {
            console.log(res.serverId);
            return res.serverId;
          })
          .then((serverId) => {
            console.log(serverId);

            downloadPhoto(serverId).then((res) => {
              let post_data = {
                "id": this.id,
                "status": "1",
                "explanation": this.reasons,
                "filepath": res.data
              };
              upData(post_data).then((res) => {
                if (res.code == "200") {
                  this.$tip.success('提交成功', () => {
                    this.$router.go(-1);
                  })
                }
              })
            })
          })
      }
    },
    computed: {},
    watch: {}
  }
</script>
<style>
  a {
    color: #fff;
  }
</style>
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

  .confirm-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0.39rem 0 0.25rem 0;
    text-align: center;
    background-color: #06b5c4;
    color: #fff;
  }
</style>
