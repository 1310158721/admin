<template>
  <el-dropdown trigger="click" class="multilingual-wrapper" @command="handleCommand">
    <span class="el-dropdown-link">
      <i class="iconfont icon-language multilingual"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) in multilingualEnum"
        :key="index"
        :command="item.command"
        :divided="item.divided"
        :disabled="item.disabled"
        >{{ item.title }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'Multilingual',
  components: {},
  props: {},
  data () {
    return {
      multilingualEnum: [
        {
          command: 'zh',
          title: '中文简体',
          disabled: false,
          divided: false
        },
        {
          command: 'en',
          title: 'English',
          disabled: false,
          divided: false
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleCommand (command) {
      localStorage.setItem('locale', command);
      this.$i18n.locale = command;
      switch (command) {
        case 'zh':
          this.$message.success('切换语言成功');
          return;
        case 'en':
          this.$message.success('Switch Language Success');
          return;
        default: 
          return;
      }
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.multilingual-wrapper {
  width: 50px;
  height: 50px;
  position: relative;
  .multilingual {
    font-size: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    outline: none;
    cursor: pointer;
    overflow: hidden;
  }
}
</style>
