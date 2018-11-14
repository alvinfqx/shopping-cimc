<template>
  <div class="ground bg-c-f5">

    <div class="header-block tc c-fe">
      <p class="">欢迎登录</p>
      <p class="">Welcome to login</p>
    </div>

    <div class="login-form tc">
      <div class="form-item">
        <div class="input-icon">
          <img :src="nameLogin"/>
        </div>
        <input type="text" maxlength="15" v-model.trim="loginForm.userName" placeholder="请输入用户名">
      </div>

      <div class="form-item">
        <div class="input-icon">
          <img :src="codeLogin"/>
        </div>
        <input type="password" maxlength="15" v-model.trim="loginForm.passWord" placeholder="请输入密码">
        <!--<div class="show-icon">-->
        <!--<img :src="codeLogin">-->
        <!--</div>-->
      </div>

    </div>

    <div class="check-block">
      <yd-checkbox v-model="isRemember" color="#999" size="16">记住密码</yd-checkbox>
      <yd-checkbox v-model="isAutoLogin" color="#999" size="16">自动登录</yd-checkbox>
    </div>

    <div class="btn-block tc">
      <div class="login-btn" @click="handleLogin">
        登录
      </div>
    </div>

  </div>
</template>

<script>

  import  {
    sTrim,
    StorageGetter,
    StorageSetter
  } from '@utils/utils'
  import {
    LOGINFORM,
    AUTOLOGIN
  } from '@utils/constant'
  import {login} from '@/api/login'
  import {weixinUtilsInit} from '@utils/weixin-utils'

  export default{
    name: '',
    props: {},
    data(){
      return {
        loginForm: {
          userName: "",
          passWord: ""
        },
        isRemember: false,
        isAutoLogin: false,
        inputType: "password",
        nameLogin: require('@/assets/icons/name_login@2x.png'),
        codeLogin: require('@/assets/icons/code_login@2x.png')
      }
    },
    components: {},
    mounted() {
      /*let url = location.href.split('#');
       console.log(url);*/
      weixinUtilsInit();
      this.judgeLogin();
    },
    methods: {
      // ...mapMutations(['SET_USERDATA']),

      //登录按钮
      handleLogin() {
        let login_form = this.loginForm;

        if (login_form.userName && login_form.passWord) {

          if (this.isRemember) {
            this.savePassword()
          }

          if (this.isAutoLogin) {
            this.saveAutoLogin()
          }

          this.login(login_form)

        } else {
          this.$tip.error('请输入用户名或密码')
        }
      },

      login(login_form){

        login(sTrim(login_form.userName), sTrim(login_form.passWord))
          .then(res => {
            console.log(res);

            if (res.data.userType != "1") {
              this.$tip.error('暂无权限');
              return
            }

            //this.SET_USERDATA(res.data)
            this.$store.commit('SET_USERDATA', res.data);

            this.$tip.success('登录成功', () => {
              this.$router.replace('/home/facility')
            })

          })
      },

      savePassword(){

        let login_form = this.loginForm;

        StorageSetter({
          [LOGINFORM]: JSON.stringify(login_form)
        })

      },

      saveAutoLogin(){

        StorageSetter({
          [AUTOLOGIN]: true
        })

      },

      judgeLogin(){

        let login_form = StorageGetter(LOGINFORM);

        if (login_form) {

          this.loginForm = JSON.parse(login_form);
          this.isRemember = true;
          this.judgeAutoLogin(login_form)

        }

      },
      judgeAutoLogin(login_form){

        let auto_login = StorageGetter(AUTOLOGIN);
        if (auto_login) {

          this.isAutoLogin = true;
          if (login_form.userName && login_form.passWord) {
            this.login(login_form)
          }

        }

      }
    },
    computed: {},
    watch: {}
  }
</script>

<style scoped>
  .ground {
    width: 100%;
    height: 100%;
  }

  .header-block {
    padding: 1.4rem 0 1.35rem 0;
    font-weight: normal;
    background-color: #364660;
  }

  .header-block p:first-child {
    font-size: 0.7rem;
  }

  .header-block p:last-child {
    margin-top: 0.2rem;
    font-size: 0.3rem;
  }

  .login-form {
    padding-top: 0.73rem;
  }

  .form-item {
    position: relative;
    display: inline-block;
    width: 5.2rem;
    padding: 0.15rem 0.15rem 0.15rem 0.3rem;
    border-bottom: 1px solid #dfdfdf;
    text-align: center;
  }

  .form-item:first-child {
    margin-bottom: 0.6rem;
  }

  .form-item input {
    font-size: 0.3rem;
  }

  .show-icon {
    position: absolute;
    top: 4px;
    right: 0.5rem;
  }

  .show-icon img {
    width: 1rem;
    height: 1rem;
  }

  .input-icon {
    position: absolute;
    top: 4px;
    left: 0.16rem;
  }

  .input-icon img {
    width: 0.4rem;
    height: 0.4rem;
  }

  .btn-block {
    margin-top: 0.8rem;
  }

  .btn-block .login-btn {
    display: inline-block;
    padding: 0.3rem 0 0.3rem 0;
    width: 4.8rem;
    font-size: 0.34rem;
    background-color: #06b5c4;
    color: #fff;
    border-radius: 4rem;
    box-shadow: 2px 11px 43px rgba(156, 237, 245, 0.6);
  }
</style>

<style>
  .check-block {
    padding: 0.3rem 1.3rem;
  }

  .check-block {
    display: flex;
    justify-content: space-between;
  }

  .check-block div span {
    color: #999 !important;
  }
</style>
