<template>
  <div class="header-wrapper">
    <i id='guide-collapse' v-if='!$store.state.isFixedSystemAside' class="iconfont collapse-icon" :class="collapseClass" @click='collapseIconClick' />
    <i id='guide-collapse' v-else class="iconfont icon-tudingguding collapse-icon"></i>
    <MyBreadcrumb id='guide-breadcrum' />
    <div style="flex: 1;"></div>
    <UserCenter id='guide-user-center' />
  </div>
</template>

<script>
import EventBus from '@/assets/js/eventBus';
import MyBreadcrumb from './components/breadcrumb';
import UserCenter from './components/userCenter';
export default {
  name: 'MyHeader',
  components: {
    MyBreadcrumb,
    UserCenter
  },
  props: {},
  data () {
    return {
      isCollapse: false
    };
  },
  computed: {
    collapseClass () {
      return this.isCollapse ? 'icon-weibiaoti26' : 'icon-daohangzhankai-';
    }
  },
  methods: {
    collapseIconClick () {
      this.isCollapse = !this.isCollapse;
      // VUE 事件中心调用 switchMenuCollapse 事件
      EventBus.$emit('switchMenuCollapse', this.isCollapse);
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  height: 50px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0,21,41,.2);
  display: flex;
  flex-direction: row;
  .collapse-icon {
    width: 50px;
    height: 50px;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    color: rgba(0,0,0,.65);
    margin-right: 8px;
    &:hover {
      background-color: rgba(0,0,0,.025);
      color: rgb(64, 158, 255);
    }
  }
}
</style>
