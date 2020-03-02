<template>
  <div class="demo-layout-wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'DemoLayout',
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
.demo-layout-wrapper {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.2);
  padding: 10px;
  box-sizing: border-box;
}
</style>
