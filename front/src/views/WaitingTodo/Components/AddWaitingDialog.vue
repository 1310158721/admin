<template>
  <el-dialog
    class="add-waiting-dialog"
    title="新增待办列表事项"
    :visible.sync="addWaitingDialog"
    width="600px"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    append-to-body
    modal-append-to-body
    :before-close="closeAddWaitingDialog"
    @opened='openedAddWaitingDialog'
  >
    <el-form :model="addWaitingModel" :rules="rules" ref="form" label-width="96px" class="add-waiting-list-form" label-position='left'>
      <el-form-item size='small' label="描述：" prop="desc">
        <el-input size='small' placeholder='请输入相关描述' ref='textarea' type="textarea" show-word-limit maxlength='100' :autosize="{ minRows: 4, maxRows: 6 }" v-model="addWaitingModel.desc"></el-input>
      </el-form-item>
      <el-form-item size='small' label="等级：">
        <el-select v-model="addWaitingModel.rank" placeholder="请选择">
          <el-option
            v-for="item in waitingListRank"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size='small' @click="closeAddWaitingDialog">取 消</el-button>
      <el-button size='small' type="primary" @click="$throttleHandleSave('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { waitingListRank } from '@/assets/js/enum';
import { $throttle } from '@/assets/js/utils';
export default {
  name: 'AddWaitingDialog',
  components: {},
  props: {
    addWaitingDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addWaitingModel: {
        desc: '',
        rank: waitingListRank[waitingListRank.length - 1].value
      },
      rules: {
        desc: [
          { required: true, message: '相关描述不能为空' }
        ]
      }
    };
  },
  computed: {
    waitingListRank () {
      return waitingListRank;
    },
    $throttleHandleSave () {
      return $throttle((ref) => this.handleSave(ref), 2000);
    }
  },
  methods: {
    async addWaitingListItem () {
      return await this.$axios.post('/addWaitingListItem', this.addWaitingModel);
    },
    closeAddWaitingDialog (isSave = false) {
      this.$emit('closeAddWaitingDialog', isSave);
      this.resetAddWaitingModel();
    },
    handleSave (ref) {
      this.$refs[ref].validate((valid) => {
          if (valid) {
            this.addWaitingListItem()
              .then((res) => {
                const { status } = res.data;
                if (status === 0) {
                  this.closeAddWaitingDialog(true);
                }
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    openedAddWaitingDialog () {
      this.$refs.textarea.focus();
    },
    resetAddWaitingModel () {
      this.addWaitingModel = {
        desc: '',
        rank: waitingListRank[waitingListRank.length - 1].value
      };
      this.$refs['form'].resetFields();
    }
  },
  created () {},
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.add-waiting-dialog {
  /deep/.el-dialog {
    .el-dialog__header {
      height: 56px;
      box-sizing: border-box;
      box-shadow: 0px 5px 5px rgba(0,0,0,.1);
      position: relative;
      z-index: 100;
    }
    .el-dialog__footer {
      height: 56px;
      box-sizing: border-box;
      box-shadow: 0px -5px 5px rgba(0,0,0,.1);
      position: relative;
      z-index: 100;
    }
  }
}
</style>
