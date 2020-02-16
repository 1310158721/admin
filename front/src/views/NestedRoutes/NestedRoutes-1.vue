<template>
  <div class="NestedRoutes-1-wrapper">
    <p>
      {{ $t('NestedRoutes.Routes-2') }}
    </p>
    <p>
      {{ $t('NestedRoutes.menu-1') }}
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
