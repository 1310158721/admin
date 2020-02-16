<template>
  <div>
    <el-button type="primary" size="small" @click.prevent.stop="handleClick"
      >{{$t('Guide.新手引导')}}</el-button
    >
  </div>
</template>

<script>
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
export default {
  name: 'Guide',
  components: {},
  props: {},
  data () {
    return {
      driver: null,
      steps: [
        {
          element: '#guide-collapse',
          popover: {
            title: '导航栏状态切换按钮',
            description: '可以控制导航栏的显示 && 隐藏'
          }
        },
        {
          element: '#guide-breadcrum',
          popover: {
            title: '系统面包屑',
            description: '显示当前路由的所在层级',
            position: 'bottom'
          }
        },
        {
          element: '#guide-user-center',
          popover: {
            title: '用户中心',
            description: '查看用户信息 && 系统设置',
            position: 'left'
          }
        },
        {
          element: '#guide-tabs',
          popover: {
            title: 'tabs菜单栏',
            description: '可以在这里跳转页面',
            position: 'bottom'
          }
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleClick () {
      this.driver.defineSteps(this.steps);
      this.driver.start();
    }
  },
  created () {},
  mounted () {
    this.driver = new Driver();
  },
  watch: {}
};
</script>

<style lang="scss" scoped></style>
