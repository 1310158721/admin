<template>
  <div v-if='picArr' class="viewer-wrapper">
    <div class="images" v-viewer>
      <img width="100" height='100' v-for="src in picArr" :src="src" :key="src">
    </div>
  </div>
</template>

<script>
import pic1 from '@/assets/img/viewer/1.jpg';
import pic2 from '@/assets/img/viewer/2.jpg';
import pic3 from '@/assets/img/viewer/3.jpg';
import pic4 from '@/assets/img/viewer/4.jpg';
export default {
  name: 'ViewerComponent',
  components: {},
  props: {},
  data () {
    return {
      picArr: null
    };
  },
  computed: {},
  methods: {},
  created () {
    // 模拟接口请求
    setTimeout(() => {
      this.picArr = [pic1, pic2, pic3, pic4];
    }, 20);
  },
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.viewer-wrapper {
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,.1);
  position: relative;
  .images {
    width: 100%;
    height: 100px;
    position: absolute;
    top: 50%;
    margin-top: -50px;
    text-align: center;
    img {
      margin: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
