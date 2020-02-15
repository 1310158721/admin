<template>
  <el-table
    :data="list"
    stripe
    style="width: 100%">
    <el-table-column prop="type" label="Type" width="180"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'FilesUpload',
  components: {},
  props: {},
  data () {
    return {
      list: [
        {
          type: 'word文件',
          desc: '阿里云文件连接形式下载',
          url: ''
        }
      ]
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
