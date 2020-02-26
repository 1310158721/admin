<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      class="memorandum-dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      modal-append-to-body
      append-to-body
      :visible.sync="memorandumAddDialog"
      width="800px"
      :before-close="closeDialog"
      @open="openDialog"
    >
      <el-form
        :model="model"
        :rules="rules"
        ref="form"
        label-width="96px"
        class="form"
        label-position="left"
      >
        <el-form-item
          size="small"
          :label="$t('Memerandum.Dialog.事件描述') + ':'"
          prop="desc"
        >
          <el-input
            size="small"
            v-model="model.desc"
            placeholder="事件描述"
          ></el-input>
        </el-form-item>
        <el-form-item
          size="small"
          :label="$t('Memerandum.Dialog.事件Tags') + ':'"
          prop="tag"
        >
          <el-tag
            :key="tag"
            v-for="(tag, index) in model.tag"
            :type="tagType(index)"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            :disabled="model.tag.length >= 3"
            class="button-new-tag"
            size="small"
            @click="showInput"
            >{{
              model.tag.length >= 3 ? this.$t('Memerandum.Dialog.最大标签数') : this.$t('Memerandum.Dialog.新增标签')
            }}</el-button
          >
        </el-form-item>
        <el-form-item
          size="small"
          :label="$t('Memerandum.Dialog.事件内容') + ':'"
          prop="contentText"
        >
          <Editor
            id="editor"
            :params="{
              directory: 'record'
            }"
            :menus="menus"
            ref="editor"
            @editorChange="editorChange"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          type="info"
          @click.native="handlePreview"
          v-if="model.contentText"
          >{{ $t('Memerandum.Dialog.预览') }}</el-button
        >
        <el-button size="small" @click="closeDialog(false)">{{
          $t('Memerandum.Dialog.取消')
        }}</el-button>
        <el-button size="small" type="primary" @click="handleSave('form')">{{
          $t('Memerandum.Dialog.确定')
        }}</el-button>
      </span>
    </el-dialog>
    <MemorandumPreviewDrawer
      :memorandumPreviewDrawer="memorandumPreviewDrawer"
      :editorContent="editorContent"
      @closeMemorandumPreview="closeMemorandumPreview"
    />
  </div>
</template>

<script>
import Editor from '@/components/parts/Editor/Editor';
import MemorandumPreviewDrawer from './MemorandumPreviewDrawer';
export default {
  name: 'memorandumAddDialog',
  components: {
    Editor,
    MemorandumPreviewDrawer
  },
  props: {
    memorandumAddDialog: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      menus: ['image'],
      model: {
        desc: '',
        tag: [],
        content: '',
        // 编辑器HTML模式默认会带有标签，内容不会为空，新增该参数可以用于form表单校验
        contentText: ''
      },
      inputVisible: false,
      inputValue: '',
      rules: {
        desc: [{ required: true, message: '事件描述不能为空' }],
        tag: [{ required: true, message: '事件Tag不能为空', trigger: 'blur' }],
        contentText: [{ required: true, message: '事件内容不能为空' }]
      },
      memorandumPreviewDrawer: false,
      editorContent: null
    };
  },
  computed: {
    dialogTitle () {
      return this.id
        ? this.$t('Memerandum.Dialog.Edit.Title')
        : this.$t('Memerandum.Dialog.Add.Title');
    }
  },
  methods: {
    async addMemorandumListItem (data) {
      return await this.$axios.post('/addMemorandumListItem', data);
    },
    async getMemorandumListItemById (params) {
      return await this.$axios.get('/getMemorandumListItemById', { params });
    },
    async updateMemorandumListItemById (data) {
      return await this.$axios.post('/updateMemorandumListItemById', data);
    },
    openDialog () {
      if (this.id) {
        this.getMemorandumListItemById({ _id: this.id }).then(res => {
          const { status, result } = res.data;
          if (status === 0) {
            const { content, tag, desc } = result;
            this.model = {
              content,
              tag: tag.split(','),
              desc
            };
            this.$refs.editor.editor.txt.html(content);
            this.model.contentText = this.$refs.editor.editor.txt.text();
          }
        });
      } else {
        this.resetModel();
      }
    },
    closeDialog (boolean = false) {
      if (
        typeof boolean === 'function' ||
        (typeof boolean === 'boolean' && !boolean)
      ) {
        this.$emit('closeDialog', false);
      } else {
        this.$emit('closeDialog', true);
      }
      this.resetModel();
    },
    handleClose (tag) {
      this.model.tag.splice(this.model.tag.indexOf(tag), 1);
    },
    showInput () {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm () {
      // keyup 事件后会触发blur事件，造成以下事件代码执行两次，且第二次会造成 this.inputValue 为空，弹出 toast
      if (!this.inputVisible) {
        return false;
      }
      const inputValue = this.inputValue;
      if (!inputValue) {
        this.$message.warning('tag 描述不能为空');
      } else if (this.model.tag.includes(inputValue)) {
        this.$message.error('tag 描述不能重复');
      } else {
        this.model.tag.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handlePreview () {
      this.editorContent = this.$refs.editor.editor.txt.html();
      this.memorandumPreviewDrawer = true;
    },
    closeMemorandumPreview () {
      this.memorandumPreviewDrawer = false;
    },
    editorChange (editor) {
      this.model.contentText = editor.txt.text();
      this.model.content = editor.txt.html();
    },
    formatModel () {
      const { desc, tag, content } = this.model;
      return Object.assign({}, { desc, tag: tag.join(','), content });
    },
    resetModel () {
      this.$nextTick(() => {
        this.model = {
          desc: '',
          tag: [],
          content: '',
          contentText: ''
        };
        this.$refs['form'].resetFields();
        this.$refs.editor.editor.txt.html(this.model.content);
        this.model.contentText = this.$refs.editor.editor.txt.text();
      });
    },
    handleSave (ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          if (!this.id) {
            this.addMemorandumListItem(this.formatModel()).then(res => {
              const { status } = res.data;
              if (status === 0) {
                this.closeDialog(true);
              }
            });
          } else {
            this.updateMemorandumListItemById(
              Object.assign({}, this.formatModel(), { _id: this.id })
            ).then(res => {
              const { status } = res.data;
              if (status === 0) {
                this.closeDialog(true);
              }
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    tagType (index) {
      switch (index) {
        case 0:
          return 'success';
        case 1:
          return '';
        case 2:
          return 'danger';
        default:
          '';
      }
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.memorandum-dialog {
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
      .el-tag {
        margin-right: 10px;
      }
      .button-new-tag {
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-right: 10px;
        vertical-align: bottom;
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
