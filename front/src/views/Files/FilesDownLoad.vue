<template>
  <el-table :data="list" stripe border height="100%">
    <el-table-column
      prop="type"
      label="Type"
      width="100"
      align="center"
    ></el-table-column>
    <el-table-column prop="desc" label="Desc" align="center"></el-table-column>
    <el-table-column prop="url" label="Url" align="center"></el-table-column>
    <el-table-column label="Operation" align="center" width="100px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click.native="handleLoad(scope.row)"
          >下载</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment';
export default {
  name: 'FilesDownLoad',
  components: {},
  props: {},
  data () {
    return {
      list: [
        {
          type: 'word文件',
          desc: '阿里云文件连接形式下载',
          method: '',
          ext: 'docx',
          url:
            'https://tanglihe-admin-prod.oss-cn-beijing.aliyuncs.com/files/%E6%B5%8B%E8%AF%95%E6%96%87%E4%BB%B6.docx'
        },
        {
          type: 'word文件',
          desc: '接口形式下载文件',
          method: 'post',
          ext: 'docx',
          url: '/createWordFile'
        },
        {
          type: 'excel文件',
          desc: '接口形式下载文件',
          method: 'post',
          ext: 'xlsx',
          url: '/createExcelFile'
        },
        {
          type: 'sendFile',
          desc: 'sendFile接口形式下载文件',
          method: 'post',
          ext: 'sendFile',
          url: '/sendFile'
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleLoad ({ url, method, ext }) {
      if (!method) {
        window.open(url, 'slef');
      } else {
        this.$axios({
          url,
          method,
          responseType: 'blob'
        }).then(res => {
          let blob = null;
          switch (ext) {
            case 'docx':
              blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'});
              this.downloadFile(blob,'word','docx');
              return;
            case 'xlsx':
              blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
              this.downloadFile(blob,'excel','xlsx');
              return;
            case 'sendFile':
              // PDF 文件
              blob = new Blob([res.data], {type: 'application/pdf;charset=utf-8'});
              this.downloadFile(blob,'test','pdf');
              return;
            default:
              return;
          }
        });
      }
    },
    downloadFile (blob,tagFileName,fileType) {
     var downloadElement = document.createElement('a');
     var href = window.URL.createObjectURL(blob); //创建下载的链接
     downloadElement.href = href;
     downloadElement.download = tagFileName+moment(new Date().getTime()).format('YYYYMMDDhhmmss')+'.'+fileType; //下载后文件名
     document.body.appendChild(downloadElement);
     downloadElement.click(); //点击下载
     document.body.removeChild(downloadElement); //下载完成移除元素
     window.URL.revokeObjectURL(href); //释放掉blob对象
   }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped></style>
