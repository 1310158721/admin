<template>
  <div class="waiting-to-to-wrapper list-wrapper">
    <div class="conditions-wrapper mgb-20">
      <el-button class="mgr-20" type='primary' size='small' v-permission='"WAITINGTODOADD"' @click.native='handleAddItem'>{{ $t('WaitingTodo.新增事项') }}</el-button>
      <el-date-picker
        class="mgr-20 w-240"
        v-model="timeRange"
        type="daterange"
        :start-placeholder="$t('WaitingTodo.开始日期')"
        :end-placeholder="$t('WaitingTodo.结束日期')"
        size="small"
        @change="timePickerChange"
        :picker-options='pickerOptions'
      />
      <el-select class="mgr-20 w-140" size="small" clearable v-model="params.rank" @change='rankChange' :placeholder="$t('WaitingTodo.事件级别')">
        <el-option
          v-for="item in waitingListRank"
          :key="item.value"
          :label="$t('WaitingTodo.等级枚举.' + item.label)"
          :value="item.value"
        />
      </el-select>
      <el-select class="w-120" size="small" clearable v-model="params.isFinish" @change='isFinishChange' :placeholder="$t('WaitingTodo.是否完成')">
        <el-option
          v-for="item in waitingListIsFinish"
          :key="item.value"
          :label="$t('WaitingTodo.完成枚举.' + item.label)"
          :value="item.value"
        />
      </el-select>
      <span class="self-adaption"></span>
      <SearchBar
        class="search-bar w-240"
        :placeholder="$t('WaitingTodo.描述')"
        v-model="params.keyword"
        @sureKeyword="sureKeyword"
      />
    </div>
    <div class="table-wrapper" v-loading='isLoading'>
      <el-table
        :data="list"
        border
        height='100%'
        stripe
        :row-class-name="tableRowClassName"
      >
        <el-table-column :label="$t('WaitingTodo.Order')" width="80" align='center'>
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('WaitingTodo.CreatedTime')" align='center' width='180px'>
          <template slot-scope="scope">
            {{ scope.row.createdTime | createdTimeFilters }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="$t('WaitingTodo.Desc')" align='center' />
        <el-table-column prop="rankDesc" :label="$t('WaitingTodo.Rank')" align='center' width='80px' />
        <el-table-column :label="$t('WaitingTodo.isFinish')" align='center' width='80px'>
          <template slot-scope="scope">
            {{ scope.row.isFinish | isFinishFilter }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('WaitingTodo.Operation')" align='center' width='320px' v-if="$hasPermission('WAITINGTODOFINISH,WAITINGTODOSETFIRST,WAITINGTODODELETE')">
          <template slot-scope="scope">
            <el-button size='mini' v-if='scope.row.isFinish' @click.native='handleSwitchStatus(scope.row)' v-permission='"WAITINGTODOFINISH"'>{{ $t('WaitingTodo.切至未完') }}</el-button>
            <el-button size='mini' type='info' v-else @click.native='handleSwitchStatus(scope.row)' v-permission='"WAITINGTODOFINISH"'>{{ $t('WaitingTodo.切至已完') }}</el-button>
            <el-button size='mini' type='success' v-if='scope.row.isSetFirst' @click.native='handleSwitchIsFirst(scope.row)' v-permission='"WAITINGTODOSETFIRST"'>{{ $t('WaitingTodo.取消置顶') }}</el-button>
            <el-button size='mini' type='danger' v-else @click.native='handleSwitchIsFirst(scope.row)' v-permission='"WAITINGTODOSETFIRST"'>{{ $t('WaitingTodo.设为置顶') }}</el-button>
            <el-button size='mini' type='danger' @click.native='handleDelete(scope.row._id)' v-permission='"WAITINGTODODELETE"'>{{ $t('WaitingTodo.Delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper mgt-20">
      <el-pagination
        size='small'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[20, 30, 50]"
        :page-size="params.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
    <!-- 新增列表Item弹窗 -->
    <AddWaitingDialog 
      :addWaitingDialog='addWaitingDialog'
      @closeAddWaitingDialog='closeAddWaitingDialog'
    />
  </div>
</template>

<script>
import { $formDate } from '@/assets/js/utils';
import { waitingListRank } from '@/assets/js/enum';
import AddWaitingDialog from './Components/AddWaitingDialog';
import LISTMINXIN from '@/mixin/list-mixin';
export default {
  name: 'WaitingTodo',
  mixins: [LISTMINXIN],
  components: {
    AddWaitingDialog
  },
  props: {},
  data () {
    return {
      params: {
        size: 20,
        page: 1,
        startTime: null,
        endTime: null,
        keyword: null,
        isFinish: null,
        rank: null
      },
      theTimeRange: null,
      pickerOptions: {
        disabledDate (date) {
          return date > Date.now();
        }
      },
      isLoading: false,
      list: null,
      count: null,
      addWaitingDialog: false
    };
  },
  computed: {
    // 利用 timeRange 的 get/set属性来监听
    timeRange: {
      get () {
        return this.theTimeRange;
      },
      set (val) {
        if (!val) {
          this.params.startTime = null;
          this.params.ednTime = null;
          this.theTimeRange = null;
        } else {
          this.theTimeRange = val;
          this.params.startTime = $formDate(val[0], 'yyyy-MM-dd');
          this.params.endTime = $formDate(val[1], 'yyyy-MM-dd');
        }
      }
    },
    waitingListRank () {
      return waitingListRank;
    },
    waitingListIsFinish () {
      return [
        { label: '是', value: true },
        { label: '否', value: false }
      ];
    }
  },
  methods: {
    // 获取列表信息
    GETLIST () {
      return new Promise((resolve) => {
        this.isLoading = true;
        this.params.size = this.size;
        this.params.page = this.page;
        this.$axios.get('/getWaitingList', { params: this.params })
          .then((res) => {
            const { status, result } = res.data;
            if (status === 0) {
              const { list, count } = result;
              this.list = list;
              this.count = count;
              this.isLoading = false;
              resolve();
            }
          });
      });
    },
    // 删除列表Item
    async deleteWaitingListItem (params) {
      return await this.$axios.get('/deleteWaitingListItem', { params });
    },
    // 切换列表 isFinish 状态
    async switchWaitingListItemStatus (data) {
      return await this.$axios.post('/switchWaitingListItemStatus', data);
    },
    // 切换列表 isSetFirst 状态
    async switchWaitingListItemIsFirst (data) {
      return await this.$axios.post('/switchWaitingListItemIsFirst', data);
    },
    // 为列表item添加class
    tableRowClassName ({ row }) {
      return row.isSetFirst ? 'is-set-first' : '';
    },
    // 添加列表Item
    handleAddItem () {
      this.addWaitingDialog = true;
    },
    // 关键字搜索
    sureKeyword () {
      this.theTimeRange = null;
      this.params.startTime = null;
      this.params.endTime = null;
      this.params.rank = null;
      this.params.isFinish = null;
      this.GETLIST();
    },
    // 时间段搜索
    timePickerChange () {
      this.params.rank = null;
      this.params.isFinish = null;
      this.params.keyword = null;
      this.GETLIST();
    },
    // rank选择器搜索
    rankChange () {
      this.theTimeRange = null;
      this.params.startTime = null;
      this.params.endTime = null;
      this.params.isFinish = null;
      this.params.keyword = null;
      this.GETLIST();
    },
    // isFinish选择器搜索
    isFinishChange () {
      this.theTimeRange = null;
      this.params.startTime = null;
      this.params.endTime = null;
      this.params.rank = null;
      this.params.keyword = null;
      this.GETLIST();
    },
    // 关闭弹窗回调
    closeAddWaitingDialog (isSave) {
      if (isSave) {
        this.addWaitingDialog = false;
        this.GETLIST();
      } else {
        this.addWaitingDialog = false;
      }
    },
    // 删除列表Item
    handleDelete (_id) {
      this.$confirm(this.$t('WaitingTodo.Comfirm.Delete.Content'), this.$t('WaitingTodo.Comfirm.Delete.Tip'), {
          confirmButtonText: this.$t('WaitingTodo.Comfirm.Delete.确定'),
          cancelButtonText: this.$t('WaitingTodo.Comfirm.Delete.取消'),
          type: 'warning'
        }).then(() => {
          this.deleteWaitingListItem({ _id })
            .then((res) => {
              const { status } = res.data;
              if (status === 0) {
                this.GETLIST().then(() => {
                  this.$message.success(this.$t('WaitingTodo.刷新列表'));
                });
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('WaitingTodo.Comfirm.Delete.已取消删除')
          });          
        });
    },
    // 切换列表Item isFinish
    handleSwitchStatus ({ _id, isFinish }) {
      this.$confirm(this.$t('WaitingTodo.Comfirm.Delete.Content'), this.$t('WaitingTodo.Comfirm.Delete.Tip'), {
          confirmButtonText: this.$t('WaitingTodo.Comfirm.Delete.确定'),
          cancelButtonText: this.$t('WaitingTodo.Comfirm.Delete.取消'),
          type: 'warning'
        }).then(() => {
          this.switchWaitingListItemStatus({ _id, isFinish })
            .then((res) => {
              const { status } = res.data;
              if (status === 0) {
                this.GETLIST().then(() => {
                  this.$message.success(this.$t('WaitingTodo.刷新列表'));
                });
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('WaitingTodo.Comfirm.Delete.已取消删除')
          });          
        });
    },
    // 切换列表Item isSetFirst
    handleSwitchIsFirst ({ _id, isSetFirst }) {
      this.$confirm(this.$t('WaitingTodo.Comfirm.Delete.Content'), this.$t('WaitingTodo.Comfirm.Delete.Tip'), {
          confirmButtonText: this.$t('WaitingTodo.Comfirm.Delete.确定'),
          cancelButtonText: this.$t('WaitingTodo.Comfirm.Delete.取消'),
          type: 'warning'
        }).then(() => {
          this.switchWaitingListItemIsFirst({ _id, isSetFirst })
            .then((res) => {
              const { status } = res.data;
              if (status === 0) {
                this.GETLIST().then(() => {
                  this.$message.success(this.$t('WaitingTodo.刷新列表'));
                });
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('WaitingTodo.Comfirm.Delete.已取消删除')
          });          
        });
    }
  },
  filters: {
    isFinishFilter (boolean) {
      return boolean ? '是' : '否';
    }
  },
  created () {
    this.GETLIST();
  },
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped></style>
