<template>
  <div>

    <!--顶部导航-->
    <yd-navbar title="我的维修单" bgcolor="#3e4860" color="#fff">
      <yd-icon slot="left" name="ucenter-outline" size=".6rem" color="#fff" @click.native="popupShow = true"></yd-icon>

      <router-link to="/service-record" color="#fff" slot="right">
        <span class="c-fff">维修记录</span>
      </router-link>
    </yd-navbar>

    <!--侧边栏-->
    <yd-popup v-model="popupShow" position="left" width="60%">
      <home-page-broadside></home-page-broadside>
    </yd-popup>

    <router-view/>

    <!--底部导航-->
    <div class="menu-block">
      <bottom-menu></bottom-menu>
    </div>

  </div>
</template>

<script>
  export default{
    name: '',
    props: {},
    data(){
      return {
        popupShow: false
      }
    },
    components: {

    },
    mounted() {

    },
    created(){

    },
    methods: {},
    computed: {},
    watch: {}
  }
</script>

<style scoped>
  .menu-block {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
