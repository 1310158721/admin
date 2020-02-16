<template>
  <div>
    <p>
      {{ $t('Tools.Clipboard.text1') }}
    </p>
    <!-- v-clipboard 只会在第一次渲染生效 -->
    <el-button type='success' size='small' class='mgt-20' v-clipboard="$t('Tools.Clipboard.button1')">
      {{ $t('Tools.Clipboard.button1') }}
    </el-button>
    <el-divider></el-divider>
    <p>
      {{ $t('Tools.Clipboard.text2') }}
    </p>
    <el-input style="width: 300px;" size='small' :placeholder="$t('Tools.Clipboard.inputPlaceholder')" v-model="clipboardData" class='mgt-20'>
      <template slot="append">
        <el-button ref='clipboard' type='primary' size='small' v-clipboard @click='handleClick'>{{ $t('Tools.Clipboard.Copy') }}</el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'Clipboard',
  data () {
    return {
      clipboardData: '',
      button1Text: null,
      refresh: true
    };
  },
  computed: {},
  methods: {
    handleClick () {
      const clipboard = this.$refs.clipboard.$el;
      // 设置的属性 data 开头，不会报错
      clipboard.setAttribute('data-clipboard', this.clipboardData);
    }
  },
  created () {},
  watch: {
    '$i18n.locale' () {
    }
  }
};
</script>

<style lang="scss" scoped></style>
