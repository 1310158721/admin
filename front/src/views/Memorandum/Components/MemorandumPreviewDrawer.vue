<template>
  <el-drawer
    append-to-body
    class="memorandum-previewer"
    :close-on-press-escape='false'
    :modal-append-to-body='false'
    :visible.sync="memorandumPreviewDrawer"
    direction="rtl"
    :before-close="closeMemorandumPreview"
    size='800px'
    :withHeader='false'
    destroy-on-close
    @opened='openMemorandumPreview'
  >
    <div v-if='memorandumPreviewDrawer' v-loading='isLoaded' class="preview-content" ref='previewer' v-viewer.static="{inline: false}"></div>
  </el-drawer>
</template>

<script>
export default {
  name: 'MemorandumPreviewDrawer',
  components: {},
  props: {
    memorandumPreviewDrawer: {
      type: Boolean,
      default: false
    },
    editorContent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isLoaded: true
    };
  },
  computed: {},
  methods: {
    openMemorandumPreview () {
      this.isLoaded = false;
      this.$refs.previewer.innerHTML = this.editorContent;
      this.$highlight(this.$refs.previewer, () => {
        this.isLoaded = true;
      });
    },
    closeMemorandumPreview () {
      this.$emit('closeMemorandumPreview');
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.memorandum-previewer {
  /deep/.el-drawer {
    outline: none;
    .el-drawer__body {
      height: 100%;
      overflow: auto;
      .preview-content {
        min-width: 100%;
        min-height: 100%;
      }
      img {
        display: block;
        width: 300px;
        padding: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
