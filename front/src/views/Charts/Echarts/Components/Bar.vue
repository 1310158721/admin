<template>
  <div id='bar' ref='bar'></div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'Bar',
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
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      };
    }
  },
  methods: {},
  created () {},
  mounted () {
    this.$nextTick(() => {
      const myChart = echarts.init(this.$refs.bar);
      myChart.setOption(this.option);

      window.onresize = function () {
        myChart.resize();
      };
    });
  },
  watch: {
    '$i18n.locale' () {
      this.$nextTick(() => {
        const myChart = echarts.init(this.$refs.bar);
        myChart.setOption(this.option);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#bar {
  width: 100%;
  height: 100%;
}
</style>
