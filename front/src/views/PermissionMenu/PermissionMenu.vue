<template>
  <div class="permission-menu-wrapper list-wrapper">
    <div class="conditions-wrapper mgb-20">
      <el-button
        class="mgr-20"
        type="primary"
        size="small"
        v-permission="'PERMISSIONMENUADD'"
        @click="permissionAdd"
        >{{ $t('menuList.新增用户') }}</el-button
      >
      <el-date-picker
        class="mgr-20 w-240"
        v-model="timeRange"
        type="daterange"
        :start-placeholder="$t('PermissionMenu.开始日期')"
        :end-placeholder="$t('PermissionMenu.结束日期')"
        size="small"
        @change="timePickerChange"
        :picker-options="pickerOptions"
      />
      <el-select
        v-if="$store.state.userInfo.role === 'SUPERADMIN'"
        class="w-180"
        size="small"
        clearable
        v-model="params.role"
        @change="roleChange"
        :placeholder="$t('PermissionMenu.权限级别')"
      >
        <el-option
          v-for="item in roleEnum"
          :key="item.value"
          :label="$t('PermissionMenu.RoleRankEnum.' + item.label)"
          :value="item.value"
        />
      </el-select>
      <span class="self-adaption"></span>
      <SearchBar
        class="search-bar w-240"
        :placeholder="$t('PermissionMenu.搜素关键词')"
        v-model="params.keyword"
        @sureKeyword="sureKeyword"
      />
    </div>
    <div class="table-wrapper" v-loading='isLoading'>
      <el-table
        :data="list"
        border
        height="100%"
        stripe
        :row-class-name="tableRowClassName"
      >
        <el-table-column :label="$t('PermissionMenu.Order')" width="80" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('PermissionMenu.CreatedTime')" align="center">
          <template slot-scope="scope">
            {{ scope.row.createdTime | createdTimeFilters }}
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('PermissionMenu.Name')" align="center" />
        <el-table-column prop="roleDesc" :label="$t('PermissionMenu.Role')" align="center" />
        <el-table-column prop="mobile" :label="$t('PermissionMenu.Mobile')" align="center" />
        <el-table-column
          :label="$t('PermissionMenu.Operation')"
          align="center"
          v-if="$hasPermission('PERMISSIONMENUEDIT,PERMISSIONMENUDELETE')"
          width='240px'
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-permission="'PERMISSIONMENUEDIT'"
              type="primary"
              @click.native="permissionEdit(scope.row)"
              >{{ $t('menuList.Edit') }}</el-button
            >
            <el-button
              size="mini"
              v-permission="'PERMISSIONMENUDELETE'"
              :disabled="scope.row.isSelf"
              type="danger"
              @click.native="permissionDelete(scope.row._id)"
              >{{ $t('menuList.Delete') }}</el-button
            >
            <el-button
              size="mini"
              :disabled="scope.row.isSelf"
              type="info"
              @click.native="permissionLogin(scope.row)"
              >{{ $t('PermissionMenu.登录') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrapper mgt-20">
      <el-pagination
        size="small"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[20, 30, 50]"
        :page-size="params.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { $formDate } from '@/assets/js/utils';
import { roleEnum } from '@/assets/js/enum';
import LISTMINXIN from '@/mixin/list-mixin';
import { mapMutations } from 'vuex';
import jsCookie from 'js-cookie';
export default {
  name: 'PermissionMenu',
  mixins: [LISTMINXIN],
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
      count: 0,
      isLoading: false
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
    ...mapMutations(['SETMENULIST', 'SETUSERINFOS']),
    GETLIST () {
      this.isLoading = true;
      this.count = 0;
      this.params.size = this.size;
      this.params.page = this.page;
      this.$axios.get('/getAllUserInfos', { params: this.params }).then(res => {
        const { status, result } = res.data;
        if (status === 0) {
          const { list, count } = result;
          this.list = list;
          this.count = count;
          this.isLoading = false;
        }
      });
    },
    async deleteUser (params) {
      return await this.$axios.get('/deleteUser', { params });
    },
    handleSizeChange (val) {
      this.params.size = val;
      this.GETLIST();
    },
    handleCurrentChange (val) {
      this.params.page = val;
      this.GETLIST();
    },
    sureKeyword () {
      this.theTimeRange = null;
      this.params.startTime = null;
      this.params.endTime = null;
      this.params.role = null;
      this.GETLIST();
    },
    timePickerChange () {
      this.params.keyword = null;
      this.params.role = null;
      this.GETLIST();
    },
    roleChange (val) {
      this.params.startTime = null;
      this.params.endTime = null;
      this.theTimeRange = null;
      this.params.keyword = null;
      if (!val) {
        this.params.role = null;
      }
      this.GETLIST();
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
      })
        .then(() => {
          this.deleteUser({ _id }).then(res => {
            const { status } = res.data;
            if (status === 0) {
              this.GETLIST();
            }
          });
        })
        .catch(() => {
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
    tableRowClassName ({ row }) {
      if (row.isSelf) {
        return 'is-master';
      }
    },
    permissionLogin ({ account, password }) {
      this.$confirm(this.$t('PermissionMenu.Comfirm.Content'), this.$t('PermissionMenu.Comfirm.Tip'), {
        confirmButtonText: this.$t('PermissionMenu.Comfirm.确定'),
        cancelButtonText: this.$t('PermissionMenu.Comfirm.取消'),
        type: 'warning'
      })
        .then(() => {
          jsCookie.remove('cacheRoutes');
          jsCookie.remove('token');
          this.SETMENULIST(null);
          this.$router.push({
            path: '/Login',
            query: {
              account, password
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('PermissionMenu.Comfirm.已取消删除')
          });
        });
    }
  },
  created () {
    this.GETLIST();
  },
  watch: {},
  mounted () {
    const { isShouldRefresh = false } = this.$route.params;
    if (isShouldRefresh) {
      this.$nextTick(() => {
        this.$message.warning(this.$t('PermissionMenu.刷新'));
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
