<template>
  <el-tabs class="tabs" type="card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for='i in tabsEnum' :key='i.name' :label="i.label" :name="i.name">
      <div :is='i.component'></div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import BaiduMapPeripheral from './Components/Peripheral';
import BaiduMapOtherType from './Components/OtherType';
export default {
  name: 'BaiduMapTabs',
  components: {
    BaiduMapPeripheral,
    BaiduMapOtherType
  },
  props: {},
  data () {
    return {
      activeName: '1',
      center: { lng: 116.404, lat: 39.915 }
    };
  },
  computed: {
    tabsEnum () {
      return [
      { label: '周边信息', name: '1', component: 'BaiduMapPeripheral' },
      { label: '其他类型', name: '2', component: 'BaiduMapOtherType' }
    ];
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.tabs {
  &.el-tabs--top {
    height: 100%;
    display: flex;
    flex-direction: column;
    /deep/.el-tabs__content {
      flex: 1;
      height: 100%;
      background: rgba(0,0,0,.1);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>
