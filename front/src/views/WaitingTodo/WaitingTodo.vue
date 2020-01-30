<template>
  <div class="waiting-to-to-wrapper">
    <div class="conditions-wrapper mgb-20">
      <el-button class="mgr-20" type='primary' size='small' @click.native='handleAddItem'>新增事项</el-button>
      <el-date-picker
        class="mgr-20"
        v-model="timeRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
        @change="timePickerChange"
        :picker-options='pickerOptions'
      />
      <el-select class="mgr-20" size="small" clearable v-model="params.rank" @change='rankChange' placeholder="请选择事项级别">
        <el-option
          v-for="item in waitingListRank"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select size="small" clearable v-model="params.isFinish" @change='isFinishChange' placeholder="请选择事项是否完成">
        <el-option
          v-for="item in waitingListIsFinish"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span class="self-adaption"></span>
      <SearchBar
        class="search-bar"
        placeholder="Name/Mobile"
        v-model="params.keyword"
        @sureKeyword="sureKeyword"
      />
    </div>
    <div class="table-wrapper">
      <el-table
        :data="list"
        v-loading='!list'
        border
        height='100%'
        stripe
        :row-class-name="tableRowClassName"
      >
        <el-table-column label="Order" width="80" align='center'>
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="CreatedTime" align='center' width='180px'>
          <template slot-scope="scope">
            {{ scope.row.createdTime | createdTimeFilters }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="Desc" align='center' />
        <el-table-column prop="rankDesc" label="Rank" align='center' width='80px' />
        <el-table-column label="isFinish" align='center' width='80px'>
          <template slot-scope="scope">
            {{ scope.row.isFinish | isFinishFilter }}
          </template>
        </el-table-column>
        <el-table-column label="Operation" align='center' width='300px'>
          <template slot-scope="scope">
            <el-button size='mini' v-if='scope.row.isFinish' @click.native='handleSwitchStatus(scope.row)'>切至未完</el-button>
            <el-button size='mini' type='info' v-else @click.native='handleSwitchStatus(scope.row)'>切至已完</el-button>
            <el-button size='mini' type='success' v-if='scope.row.isSetFirst' @click.native='handleSwitchIsFirst(scope.row)'>取消置顶</el-button>
            <el-button size='mini' type='danger' v-else @click.native='handleSwitchIsFirst(scope.row)'>设为置顶</el-button>
            <el-button size='mini' type='danger' @click.native='handleDelete(scope.row._id)'>Delete</el-button>
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
export default {
  name: 'WaitingTodo',
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
    getWaitingList () {
      this.$axios.get('/getWaitingList', { params: this.params })
        .then((res) => {
          const { status, result } = res.data;
          if (status === 0) {
            const { list, count } = result;
            this.list = list;
            this.count = count;
          }
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
    // 改变分页器size
    handleSizeChange (val) {
      this.params.size = val;
      this.getWaitingList();
    },
    // 改变分页器page
    handleCurrentChange (val) {
      this.params.page = val;
      this.getWaitingList();
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
      this.getWaitingList();
    },
    // 时间段搜索
    timePickerChange () {
      this.params.rank = null;
      this.params.isFinish = null;
      this.params.keyword = null;
      this.getWaitingList();
    },
    // rank选择器搜索
    rankChange () {
      this.theTimeRange = null;
      this.params.startTime = null;
      this.params.endTime = null;
      this.params.isFinish = null;
      this.params.keyword = null;
      this.getWaitingList();
    },
    // isFinish选择器搜索
    isFinishChange () {
      this.theTimeRange = null;
      this.params.startTime = null;
      this.params.endTime = null;
      this.params.rank = null;
      this.params.keyword = null;
      this.getWaitingList();
    },
    // 关闭弹窗回调
    closeAddWaitingDialog (isSave) {
      if (isSave) {
        this.addWaitingDialog = false;
        this.getWaitingList();
      } else {
        this.addWaitingDialog = false;
      }
    },
    // 删除列表Item
    handleDelete (_id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteWaitingListItem({ _id })
            .then((res) => {
              const { status } = res.data;
              if (status === 0) {
                this.getWaitingList();
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 切换列表Item isFinish
    handleSwitchStatus ({ _id, isFinish }) {
      this.$confirm('此操作将永久修改该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.switchWaitingListItemStatus({ _id, isFinish })
            .then((res) => {
              const { status } = res.data;
              if (status === 0) {
                this.getWaitingList();
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 切换列表Item isSetFirst
    handleSwitchIsFirst ({ _id, isSetFirst }) {
      this.$confirm('此操作将永久修改该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.switchWaitingListItemIsFirst({ _id, isSetFirst })
            .then((res) => {
              const { status } = res.data;
              if (status === 0) {
                this.getWaitingList();
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  filters: {
    createdTimeFilters (date) {
      return $formDate(new Date(date), 'yyyy-MM-dd hh:mm:ss');
    },
    isFinishFilter (boolean) {
      return boolean ? '是' : '否';
    }
  },
  created () {
    this.getWaitingList();
  },
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.waiting-to-to-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  .conditions-wrapper {
    height: 32px;
    display: flex;
    flex-direction: row;
    .self-adaption {
      flex: 1;
    }
  }
  .table-wrapper {
    flex: 1;
    height: 100%;
    /deep/.el-table {
      .is-set-first td {
        background-color: rgba(0,0,0,.3)!important;
      }
    }
  }
  .pagination-wrapper {
    height: 32px;
    .el-pagination {
      float: right;
    }
  }
}
</style>
