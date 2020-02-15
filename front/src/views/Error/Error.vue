<template>
  <div class="error-wrapper">
    <el-button @click='handleBack' class="go-back" type='primary' size='small'>Back</el-button>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  components: {},
  props: {},
  data () {
    return {};
  },
  computed: {},
  methods: {
    handleBack () {
      this.$router.replace({
        path: '/Dashboard'
      });
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.error-wrapper {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/404.png');
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  .go-back {
    width: 200px;
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
