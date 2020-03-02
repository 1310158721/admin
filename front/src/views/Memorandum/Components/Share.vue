<template>
  <div class="share-wrapper">
    <div
      v-loading="isLoaded"
      class="preview-content"
      ref="previewer"
      v-viewer
    ></div>
  </div>
</template>

<script>
export default {
  name: 'MemorandumShare',
  components: {},
  props: {},
  data () {
    return {
      isLoaded: true
    };
  },
  computed: {},
  methods: {
    getData (query) {
      const { uid = '', u = '', _id = '' } = query;
      this.$axios.get(u, { params: { itemId: _id, userId: uid } }).then(res => {
        const { result, status } = res.data;
        if (status === 0) {
          const { content } = result;
          this.$refs.previewer.innerHTML = content;
          this.$highlight(this.$refs.previewer, () => {
            this.isLoaded = true;
          });
        }
      });
    }
  },
  mounted () {
    const query = this.$route.query;
    this.getData(query);
  },
  watch: {},
  // 监听路由参数改变时
  beforeRouteUpdate (to, from, next) {
    const query = to.query;
    this.getData(query);
    next();
  }
};
</script>

<style lang="scss" scoped>
.share-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  color: #cccccc;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-y: auto;
  .preview-content {
    min-width: 100%;
    min-height: 100%;
    /deep/table tr th {
      background-color: rgba(0, 0, 0, 0.3);
      border: 1px solid #cccccc;
      text-align: center;
      vertical-align: middle;
    }
    /deep/table tr td {
      min-width: 100px;
      text-align: center;
      vertical-align: middle;
      border: 1px solid #cccccc;
      padding: 5px;
    }
  }
}
</style>
