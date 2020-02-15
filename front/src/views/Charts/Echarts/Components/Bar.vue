<template>
  <div id='bar'></div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'Bar',
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
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      }
    };
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {
    const myChart = echarts.init(document.getElementById('bar'));
    myChart.setOption(this.option);

    window.onresize = function () {
      myChart.resize();
    };
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
#bar {
  width: 100%;
  height: 100%;
}
</style>
