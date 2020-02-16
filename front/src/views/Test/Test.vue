<template>
  <div>
    Test
  </div>
</template>

<script>
export default {
  name: 'Test',
  components: {},
  props: {},
  data () {
    return {
      title: '标题'
    };
  },
  computed: {},
  methods: {
    handleSwitch (type) {
      localStorage.setItem('locale', type);
      this.$i18n.locale = type;
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped></style>
