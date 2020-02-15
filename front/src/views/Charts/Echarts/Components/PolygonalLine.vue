<template>
  <div id="polygonal-line"></div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'PolygonalLine',
  components: {},
  props: {},
  data () {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {
    const myChart = echarts.init(document.getElementById('polygonal-line'));
    myChart.setOption(this.option);

    window.onresize = function () {
      setTimeout(() => {
        myChart.resize();
      }, 200);
    };
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
#polygonal-line {
  width: 100%;
  height: 100%;
}
</style>
