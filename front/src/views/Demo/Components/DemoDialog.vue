<template>
  <el-dialog
    :title="dialogTitle"
    class="demo-add-dialog"
    :visible.sync="demoDialog"
    width="800px"
    :before-close="closeDemoDialog"
    @open="handleOpenDemoDialog"
  >
    <el-form
      :model="model"
      :rules="rules"
      ref="form"
      label-width="96px"
      class="form"
      label-position="left"
    >
      <el-form-item size="small" :label="$t('Demo.Dialog.描述') + ':'" prop="desc">
        <el-input
          size="small"
          v-model="model.desc"
          :placeholder="$t('Demo.Dialog.描述Placeholder')"
        />
      </el-form-item>
      <el-form-item size="small" :label="$t('Demo.Dialog.路径') + ':'" prop="path">
        <el-input
          size="small"
          v-model="model.path"
          :placeholder="$t('Demo.Dialog.路径Placeholder')"
        />
      </el-form-item>
      <el-form-item size="small" :label="$t('Demo.Dialog.内容') + ':'" prop="contentText">
        <Editor
            id="editor"
            ref="editor"
            @editorChange="editorChange"
          />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDemoDialog(false)">{{ $t('Demo.Dialog.取消') }}</el-button>
      <el-button size="small" type="primary" @click="handleSave('form')"
        >{{ $t('Demo.Dialog.确定') }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import Editor from '@/components/parts/Editor/Editor';
export default {
  name: 'demoDialog',
  components: {
    Editor
  },
  props: {
    demoDialog: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    const checkContentText = (rule, value, callback) => {
        if (!this.model.contentText) {
          return callback(new Error('内容不能为空'));
        } else {
          callback();
        }
      };
    return {
      model: {
        desc: '',
        path: '',
        content: '',
        contentText: ''
      },
      rules: {
        desc: [{ required: true, message: 'Demo相关desc不能为空' }],
        path: [{ required: true, message: 'Demo相关path不能为空' }],
        contentText: [{ required: true, validator: checkContentText }]
      }
    };
  },
  computed: {
    dialogTitle () {
      return this.id ? this.$t('Demo.Dialog.Edit.Title') : this.$t('Demo.Dialog.Add.Title');
    }
  },
  methods: {
    async addDemoListItem () {
      return await this.$axios.post('/addDemoListItem', this.model);
    },
    async getListItemById () {
      return await this.$axios.get('/getListItemById', {
        params: { _id: this.id }
      });
    },
    async updateDemoListItem () {
      return await this.$axios.post(
        '/updateDemoListItem',
        Object.assign({}, this.model, { _id: this.id })
      );
    },
    closeDemoDialog (boolean = false) {
      if (typeof boolean === 'function' || (typeof boolean === 'boolean' && !boolean)) {
        this.$emit('closeDemoDialog', false);
      } else {
        this.$emit('closeDemoDialog', true);
      }      
    },
    handleSave (ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          if (!this.id) {
            this.addDemoListItem().then(res => {
              const { status } = res.data;
              if (status === 0) {
                this.closeDemoDialog(true);
              }
            });
          } else {
            this.updateDemoListItem().then(res => {
              const { status } = res.data;
              if (status === 0) {
                this.closeDemoDialog(true);
              }
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleOpenDemoDialog () {
      if (this.id) {
        this.getListItemById().then(res => {
          const { status, result } = res.data;
          if (status === 0) {
            this.model = result;
            this.$refs.editor.editor.txt.html(result.content);
            this.model.contentText = this.$refs.editor.editor.txt.text();
          }
        });
      } else {
        this.model = {
          desc: '',
          path: '',
          content: '',
          contentText: ''
        };
        this.$nextTick(() => {
          this.$refs['form'].resetFields();
          this.$refs.editor.editor.txt.html(this.model.content);
          this.model.contentText = this.$refs.editor.editor.txt.text();
        });
      }
    },
    editorChange (editor) {
      this.$nextTick(() => {
        this.model.contentText = editor.txt.text();
        this.model.content = editor.txt.html();
      });
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.demo-add-dialog {
  /deep/.el-dialog {
    margin-top: 10vh !important;
    .el-dialog__header {
      height: 56px;
      box-sizing: border-box;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 100;
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
