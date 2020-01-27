<template>
  <div class="NestedRoutes-1-wrapper">
    <p>
      我是嵌套路由第二层
    </p>
    <p>
      NestedRoutes-1
    </p>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'NestedRoutes-1',
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
.NestedRoutes-1-wrapper {
  padding: 20px;
  background-color: rgba(0,255,0,.1);
}
</style>
