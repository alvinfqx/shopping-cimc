<template>
  <div>

    <yd-navbar v-bind="$attrs" :bgcolor="bgcolor" :color="color">
      <div @click="goBack" slot="left">
        <yd-navbar-back-icon :color="color"></yd-navbar-back-icon>
      </div>
    </yd-navbar>

  </div>
</template>

<script>
  export default{
    name: '',
    props: {
      bgcolor: {
        type: String,
        default: "#3e4860"
      },
      color: {
        type: String,
        default: "#fff"
      }
    },
    data(){
      return {}
    },
    components: {},
    mounted() {

    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style scoped>

</style>
