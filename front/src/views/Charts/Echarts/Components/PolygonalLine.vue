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
    return {};
  },
  computed: {
    // 放在computed上，当切换多语言时能更新图表的语言，在watch监听切换语言时重新渲染图表
    option () {
      return {
        xAxis: {
          type: 'category',
          data: [this.$t('Charts.Echarts.Week.Mon'), this.$t('Charts.Echarts.Week.Tue'), this.$t('Charts.Echarts.Week.Wed'), this.$t('Charts.Echarts.Week.Thu'), this.$t('Charts.Echarts.Week.Fri'), this.$t('Charts.Echarts.Week.Sat'), this.$t('Charts.Echarts.Week.Sun')]
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
      };
    }
  },
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
  watch: {
    '$i18n.locale' () {
      const myChart = echarts.init(document.getElementById('polygonal-line'));
      myChart.setOption(this.option);
    }
  }
};
</script>

<style lang="scss" scoped>
#polygonal-line {
  width: 100%;
  height: 100%;
}
</style>
