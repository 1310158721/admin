<template>
  <el-dialog
    class="add-waiting-dialog"
    :title="$t('WaitingTodo.Dialog.Title')"
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
      <el-form-item size='small' :label="$t('WaitingTodo.Dialog.描述') + ':'" prop="desc">
        <el-input size='small' :placeholder='$t("WaitingTodo.Dialog.描述占位符")' ref='textarea' type="textarea" show-word-limit maxlength='100' :autosize="{ minRows: 4, maxRows: 6 }" v-model="addWaitingModel.desc"></el-input>
      </el-form-item>
      <el-form-item size='small' :label="$t('WaitingTodo.Dialog.等级') + ':'">
        <el-select v-model="addWaitingModel.rank">
          <el-option
            v-for="item in waitingListRank"
            :key="item.value"
            :label="$t('WaitingTodo.等级枚举.' + item.label)"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size='small' @click="closeAddWaitingDialog(false)">{{ $t('WaitingTodo.Dialog.取消') }}</el-button>
      <el-button size='small' type="primary" @click="$throttleHandleSave('form')">{{ $t('WaitingTodo.Dialog.确定') }}</el-button>
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
          { required: true, message: this.$t('WaitingTodo.Dialog.描述提示') }
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
    },
    // 放在data上，不会更新 desc 的 message
    // rules () {
    //   return {
    //     desc: [
    //       { required: true, message: this.$t('WaitingTodo.Dialog.描述提示') }
    //     ]
    //   };
    // }
  },
  methods: {
    async addWaitingListItem () {
      return await this.$axios.post('/addWaitingListItem', this.addWaitingModel);
    },
    closeAddWaitingDialog (isSave = false) {
      if (typeof isSave === 'function' || (typeof isSave === 'boolean' && !isSave)){
        this.$emit('closeAddWaitingDialog', false);
      } else {
        this.$emit('closeAddWaitingDialog', true);
      }
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
  watch: {
    // 监听改变rules里面的数据
    '$i18n.locale' () {
      this.rules.desc[0].message = this.$t('WaitingTodo.Dialog.描述提示');
    }
  }
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
