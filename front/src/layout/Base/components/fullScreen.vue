<template>
  <i id='full-screen' class="iconfont full-screen" :class="[isFullScreen?'icon-tuichuquanping':'icon-quanping']" ref="el" @click='handleClick'></i>
</template>

<script>
import screenfull from 'screenfull';
export default {
  name: 'FullScreen',
  components: {},
  props: {},
  data () {
    return {
      isFullScreen: false
    };
  },
  computed: {},
  methods: {
    handleClick () {
      // 全屏化指定元素
      // 可以接受指定的元素，但要对元素的css设置，避免出现黑底
      // const fullScreenElement = document.body;
      this.isFullScreen = !this.isFullScreen;
      // 不传元素，默认全屏化，不会出现黑底
      screenfull.toggle();
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.full-screen {
  font-size: 30px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: #409EFF;
  }
}
</style>
