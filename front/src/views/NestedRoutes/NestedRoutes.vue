<template>
  <div class="NestedRoutes-wrapper">
    <p>
      我是嵌套路由第一层
    </p>
    <p>
      NestedRoutes
    </p>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'NestedRoutes',
  components: {},
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
.NestedRoutes-wrapper {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgba(255,0,0,.1);
}
</style>
