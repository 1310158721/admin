<template>
  <div class="dashboard-wrapper">
    <div class="clock-wrapper">
      <Clock :size='400' />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
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
.dashboard-wrapper {
  height: 100%;
  position: relative;
  .clock-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
