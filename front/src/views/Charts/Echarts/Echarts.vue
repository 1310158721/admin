<template>
  <el-tabs class="tabs-wrapper" v-model="activeName" type="card">
    <!-- lazy 属性用于解决 tab 切换时 echarts 的显示出错问题 -->
    <el-tab-pane v-for='(i) in chartsEnum' :key='i.name' :label='i.label' :name='i.name' lazy>
      <span :is='i.component'></span>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import PolygonalLine from './Components/PolygonalLine';
import Bar from './Components/Bar';
import Pie from './Components/Pie';
export default {
  name: 'Echarts',
  components: {
    PolygonalLine,
    Bar,
    Pie
  },
  props: {},
  data () {
    return {
      activeName: '1'
    };
  },
  computed: {
    chartsEnum () {
      return [
        { label: '折线图', name: '1', component: 'PolygonalLine' },
        { label: '柱形图', name: '2', component: 'Bar' },
        { label: '饼形图', name: '3', component: 'Pie' }
      ];
    }
  },
  methods: {},
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.el-tabs {
  height: 100%;
  border: 1px black solid;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /deep/.el-tabs__content {
    flex: 1;
    height: 100%;
    .el-tab-pane {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
