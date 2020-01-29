<template>
  <el-container id="app-container">
    <MyAside />
    <el-container id='app-right-aside' :class="[$store.state.isFixedSystemHeader ? 'fixed-header' : 'release-header']">
      <MyHeader class='app-header' />
      <my-tab v-if='$store.state.isShowSystemTabView' />
      <div id='app-content' :class="{ 'is-show-tabs': $store.state.isShowSystemTabView }">
        <MyContent />
      </div>
    </el-container>
    <LayoutConfig />
  </el-container>
</template>

<script>
import MyHeader from './Header';
import MyAside from './Aside';
import MyContent from './Content';
import LayoutConfig from '@/components/system/layoutConfig';
import MyTab from './components/tab';
export default {
  name: 'LayoutBase',
  components: {
    MyHeader,
    MyAside,
    MyContent,
    MyTab,
    LayoutConfig
  },
  props: {},
  data () {
    return {};
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
#app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  #app-right-aside {
    height: 100%;
    overflow-y: auto;
    &.fixed-header {
      display: flex;
      flex-direction: column;
      #app-content {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        box-sizing: border-box;
      }
    }
    &.release-header {
      display: block;
      min-height: 100%;
      #app-content {
        height: calc(100% - 50px);
        padding: 20px;
        box-sizing: border-box;
        &.is-show-tabs {
          height: calc(100% - 50px - 32px);
        }
      }
    }
  }
}

</style>
