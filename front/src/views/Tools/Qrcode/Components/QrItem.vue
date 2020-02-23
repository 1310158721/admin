<template>
  <div>
    <span class="qr-code" ref="qr" />
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
  name: 'QrItem',
  components: {},
  props: {
    query: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {};
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {
    const dom = this.$refs.qr;
    dom.innerHTML = '';
    this.$qr = new QRCode(dom, {
      text: 'https://www.baidu.com?query=' + this.query,
      width: 144,
      height: 144,
      colorDark: '#333333', // 二维码颜色
      colorLight: '#ffffff', // 二维码背景色
      correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
    });
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.qr-code {
  display: inline-block;
  margin: 10px;
}
</style>
