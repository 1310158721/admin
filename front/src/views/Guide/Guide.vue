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
            title: this.$t('Guide.Collapse.Title'),
            description: this.$t('Guide.Collapse.Desc')
          }
        },
        {
          element: '#guide-breadcrum',
          popover: {
            title: this.$t('Guide.Breadcrum.Title'),
            description: this.$t('Guide.Breadcrum.Desc'),
            position: 'bottom'
          }
        },
        {
          element: '#full-screen',
          popover: {
            title: this.$t('Guide.Screen.Title'),
            description: this.$t('Guide.Screen.Desc'),
            position: 'left'
          }
        },
        {
          element: '#routes-search',
          popover: {
            title: this.$t('Guide.Search.Title'),
            description: this.$t('Guide.Search.Desc'),
            position: 'left'
          }
        },
        {
          element: '#multilingual',
          popover: {
            title: this.$t('Guide.Multilingual.Title'),
            description: this.$t('Guide.Multilingual.Desc'),
            position: 'left'
          }
        },
        {
          element: '#guide-user-center',
          popover: {
            title: this.$t('Guide.User.Title'),
            description: this.$t('Guide.User.Desc'),
            position: 'left'
          }
        },
        {
          element: '#guide-tabs',
          popover: {
            title: this.$t('Guide.Tab.Title'),
            description: this.$t('Guide.Tab.Desc'),
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
