<template>
  <div>
    <span v-for='(i, index) in list' :key='index'>
      <QrItem :query='i.query' />
    </span>
  </div>
</template>

<script>
import QrItem from './Components/QrItem';
export default {
  name: 'QRCode',
  components: {
    QrItem
  },
  props: {},
  data () {
    return {
      list: [
        { query: 1 },
        { query: 2 },
        { query: 3 },
        { query: 4 },
        { query: 5 },
        { query: 6 }
      ]
    };
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.qr-code {
  display: inline-block;
  margin: 10px;
}
</style>
