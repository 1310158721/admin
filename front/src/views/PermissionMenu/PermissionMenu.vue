<template>
  <div class="permission-menu-wrapper">
    <div class="conditions-wrapper mgb-20">
      <el-button class="mgr-20" type='primary' size='small' @click='permissionAdd'>新增用户</el-button>
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
      <el-select v-if='$store.state.userInfo.role === "SUPERADMIN"' size="small" clearable v-model="params.role" @change='roleChange' placeholder="请选择用户权限级别">
        <el-option
          v-for="item in roleEnum"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span class='self-adaption'></span>
      <SearchBar
        class="search-bar"
        placeholder="Name/Mobile"
        v-model="params.keyword"
        @sureKeyword="sureKeyword"
      />
    </div>
    <div class="tables-wrapper">
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
        <el-table-column label="CreatedTime" align='center'>
          <template slot-scope="scope">
            {{ scope.row.createdTime | createdTimeFilters }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" align='center' />
        <el-table-column prop="roleDesc" label="Role" align='center' />
        <el-table-column prop="mobile" label="Mobile" align='center' />
        <el-table-column label="Operation" align='center' v-if='$hasPermission("PERMISSIONMENUEDIT,PERMISSIONMENUDELETE")'>
          <template slot-scope="scope">
            <el-button size='mini' v-permission='"PERMISSIONMENUEDIT"' type='primary' @click.native='permissionEdit(scope.row)'>Edit</el-button>
            <el-button size='mini' v-permission='"PERMISSIONMENUDELETE"' :disabled='scope.row.isSelf' type='danger' @click.native='permissionDelete(scope.row._id)'>Delete</el-button>
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
  </div>
</template>

<script>
import { $formDate } from '@/assets/js/utils';
import { roleEnum } from '@/assets/js/enum';
export default {
  name: 'PermissionMenu',
  components: {},
  props: {},
  data () {
    return {
      params: {
        page: 1,
        size: 20,
        startTime: null,
        endTime: null,
        keyword: null,
        role: null
      },
      theTimeRange: null,
      pickerOptions: {
        disabledDate (date) {
          return date > Date.now();
        }
      },
      list: null,
      count: 0
    };
  },
  computed: {
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
    roleEnum () {
      return roleEnum;
    }
  },
  methods: {
    getAllUserInfos () {
      this.list = null;
      this.count = 0;
      this.$axios.get('/getAllUserInfos', { params: this.params })
        .then((res) => {
          const { status, result } = res.data;
          if (status === 0) {
            const { list, count } = result;
            this.list = list;
            this.count = count;
          }
        });
    },
    async deleteUser (params) {
      return await this.$axios.get('/deleteUser', { params });
    },
    handleSizeChange (val) {
      this.params.size = val;
      this.getAllUserInfos();
    },
    handleCurrentChange (val) {
      this.params.page = val;
      this.getAllUserInfos();
    },
    sureKeyword () {
      this.params.startTime = null;
      this.params.endTime = null;
      this.theTimeRange = null;
      this.params.role = null;
      this.getAllUserInfos();
    },
    timePickerChange () {
      this.params.keyword = null;
      this.params.role = null;
      this.getAllUserInfos();
    },
    roleChange (val) {
      this.params.startTime = null;
      this.params.endTime = null;
      this.theTimeRange = null;
      this.params.keyword = null;
      if (!val) {
        this.params.role = null;
      }
      this.getAllUserInfos();
    },
    permissionEdit (row) {
      this.$router.push({
        path: '/PermissionEditPage',
        query: {
          _id: row._id
        }
      });
    },
    permissionDelete (_id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteUser({ _id })
            .then((res) => {
              const { status } = res.data;
              if (status === 0) {
                this.getAllUserInfos();
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    permissionAdd () {
      this.$router.push({
        path: '/PermissionAddPage'
      });
    },
    tableRowClassName ({row}) {
      if (row.isSelf) {
        return 'is-master';
      }
    }
  },
  filters: {
    createdTimeFilters (date) {
      return $formDate(new Date(date), 'yyyy-MM-dd hh:mm:ss');
    }
  },
  created () {
    this.getAllUserInfos();
  },
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.permission-menu-wrapper {
  height: 100%;
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
  .tables-wrapper {
    flex: 1;
    height: 100%;
    /deep/.el-table {
      .is-master {
        background-color: rgba(#42B983, .5);
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
