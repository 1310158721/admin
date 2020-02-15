<template>
  <div>
    {{ $t('name') }}
    <div>
      <el-button @click='handleSwitch("zh")'>中文</el-button>
      <el-button @click='handleSwitch("en")'>英文</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  components: {},
  props: {},
  data () {
    return {};
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
  watch: {
    '$i18n.locale' (val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped></style>
