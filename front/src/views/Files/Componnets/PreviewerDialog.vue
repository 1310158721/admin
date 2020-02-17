<template>
  <el-dialog
    :title="$t('Files.Download.Dialog.文件查看器')"
    class="files-previewer-dialog"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :append-to-body='true'
    :show-close='false'
    :visible.sync="previewerDialog"
    width="800px"
  >
    <iframe class="iframe" v-if='src' :src="src" frameborder="10" />
    <span slot="footer" class="dialog-footer">
      <el-button size='small' @click="handleClose">{{ $t('Files.Download.Dialog.取消') }}</el-button>
      <el-button size='small' type="primary" @click="handleClose">{{ $t('Files.Download.Dialog.确定') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'PreviewerDialog',
  components: {},
  props: {
    previewerDialog: {
      type: Boolean,
      default: true
    },
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {};
  },
  computed: {},
  methods: {
    handleClose () {
      this.$emit('closeFilesPreviewer');
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.files-previewer-dialog {
  /deep/.el-dialog {
    margin-top: 10vh !important;
    .el-dialog__header {
      height: 56px;
      box-sizing: border-box;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 100;
    }
    .el-dialog__body {
      height: 60vh;
      padding: 10px;
      .iframe {
        width: 100%;
        height: 100%;
        background-color: lightblue;
      }
    }
    .el-dialog__footer {
      height: 56px;
      box-sizing: border-box;
      box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 100;
    }
  }
}
</style>
