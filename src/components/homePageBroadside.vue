<template>
  <div>

    <div class="tc mg-b-03" v-once>
      <yd-icon name="ucenter" size="1.42rem"></yd-icon>
      <p>{{userName}}</p>
    </div>
    <div>
      <yd-cell-group>
       <!-- <yd-cell-item arrow href="/map" type="link">
          <yd-icon slot="icon" name="feedback" size=".42rem"></yd-icon>
          <span slot="left">地图</span>
        </yd-cell-item>-->
        <yd-cell-item arrow href="/change-password" type="link">
          <yd-icon slot="icon" name="feedback" size=".42rem"></yd-icon>
          <span slot="left">修改密码</span>
        </yd-cell-item>
        <yd-cell-item arrow @click.native="userQuit">
          <img slot="icon" :src="quitIcon">
          <span slot="left">退出登录</span>
        </yd-cell-item>
      </yd-cell-group>
    </div>

  </div>
</template>

<script>
  export default{
    name: '',
    props: {},
    data(){
      return {
        userName: "",
        quitIcon:require('@/assets/icons/personal_edit_icon@2x.png')
      }
    },
    components: {},
    mounted() {
      this.getUserName()
    },
    methods: {
      getUserName: function () {
        let user_data = this.$store.getters.userData;
        this.userName = user_data.name;
      },

      userQuit: function () {
        this.$router.replace('/login')
      }

    },
    computed: {},
    watch: {}
  }
</script>

<style scoped>

</style>
