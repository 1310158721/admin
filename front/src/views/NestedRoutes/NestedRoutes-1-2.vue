<template>
  <div class="NestedRoutes-1-2-wrapper">
    <p>
      我是嵌套路由第三层
    </p>
    <p>
      NestedRoutes-1-2
    </p>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'NestedRoutes-1-2',
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
.NestedRoutes-1-2-wrapper {
  padding: 20px;
  background-color: rgba(0,0,255,.1);
}
</style>
