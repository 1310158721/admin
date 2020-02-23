<template>
  <div id="Pie" ref='Pie'></div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'Pie',
  components: {},
  props: {},
  data () {
    return {};
  },
  computed: {
    // 放在computed上，当切换多语言时能更新图表的语言，在watch监听切换语言时重新渲染图表
    option () {
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: [this.$t('Charts.Echarts.Pie.直接访问'), this.$t('Charts.Echarts.Pie.邮件营销'), this.$t('Charts.Echarts.Pie.联盟广告'), this.$t('Charts.Echarts.Pie.视频广告'), this.$t('Charts.Echarts.Pie.搜索引擎')]
        },
        series: [
          {
            name: this.$t('Charts.Echarts.Pie.访问来源'),
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: this.$t('Charts.Echarts.Pie.直接访问') },
              { value: 310, name: this.$t('Charts.Echarts.Pie.邮件营销') },
              { value: 234, name: this.$t('Charts.Echarts.Pie.联盟广告') },
              { value: 135, name: this.$t('Charts.Echarts.Pie.视频广告') },
              { value: 1548, name: this.$t('Charts.Echarts.Pie.搜索引擎') }
            ]
          }
        ]
      };
    }
  },
  methods: {},
  created () {},
  mounted () {
    this.$nextTick(() => {
      const myChart = echarts.init(this.$refs.Pie);
      myChart.setOption(this.option);

      window.onresize = function () {
        myChart.resize();
      };
    });
  },
  watch: {
    '$i18n.locale' () {
      this.$nextTick(() => {
        const myChart = echarts.init(this.$refs.Pie);
        myChart.setOption(this.option);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#Pie {
  width: 100%;
  height: 100%;
}
</style>
