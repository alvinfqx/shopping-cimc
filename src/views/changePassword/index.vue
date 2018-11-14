<template>
  <div>
    <back-nav-bar title="修改密码"></back-nav-bar>

    <div>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">原密码：</span>
          <input slot="right" type="password" placeholder="请输入原密码" v-model="formData.oldPassword">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">新密码：</span>
          <input slot="right" type="password" placeholder="请输入新密码" v-model="formData.newPassword">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">确认密码：</span>
          <input slot="right" type="password" placeholder="请输入新密码" v-model="formData.confirmPassword">
        </yd-cell-item>
      </yd-cell-group>
    </div>


    <div class="btn-block tc">
      <div class="login-btn" @click="changePassword">
        确认修改
      </div>
    </div>

  </div>
</template>

<script>
  import {StorageRemove} from '@/utils/utils'
  import {LOGINFORM} from '@/utils/constant'

  export default{
    name: '',
    props: {},
    data(){
      return {
        formData: {
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        }
      }
    },
    components: {
    },
    mounted() {
    },
    methods: {
      changePassword(){
        let formData = this.formData;
        let userData = this.$store.getters.userData;

        if (!formData.oldPassword && !formData.newPassword && !formData.confirmPassword) {
          this.$tip.toast({
            text: "请填写完整信息"
          });
          return
        }

        formData["userId"] = userData.id;

        this.$http({
          url: '/user/updatePassword',
          method: 'post',
          data: formData
        }).then((res) => {
          console.log(res)

          this.$tip.success('修改成功,请重新登录', () => {

            StorageRemove(LOGINFORM);
            this.$router.replace('/login')

          })

        }).catch((res) => {
          console.log(res);
          this.$tip.error('修改失败')
        })

      }
    },
    computed: {},
    watch: {}
  }
</script>

<style scoped>
  .btn-block {
    margin-top: 0.8rem;
  }

  .btn-block .login-btn {
    display: inline-block;
    padding: 0.3rem 2.4rem;
    font-size: 0.34rem;
    background-color: #06b5c4;
    color: #fff;
    border-radius: 4rem;
    box-shadow: 2px 11px 43px rgba(156, 237, 245, 0.6);
  }
</style>
