<template>
  <span>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </span>
</template>

<script>
export default {
  name: 'MyContent',
  components: {},
  props: {},
  data () {
    return {
      keep: ''
    };
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped></style>
