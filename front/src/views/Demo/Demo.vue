<template>
  <div class="demo-wrapper list-wrapper">
    <div class="conditions-wrapper mgb-20">
      <el-button
        class="mgr-20"
        type="primary"
        size="small"
        @click.native="handleAddDemo"
        v-permission="'DEMOADD'"
        >{{ $t('menuList.新增Demo') }}</el-button
      >
      <span class="self-adaption"></span>
      <SearchBar
        class="search-bar w-240"
        :placeholder="$t('Demo.placeholder')"
        v-model="params.keyword"
        @sureKeyword="sureKeyword"
      />
    </div>
    <div class="table-wrapper" v-loading="isLoading">
      <el-table :data="list" border stripe height="100%">
        <el-table-column :label="$t('Demo.Order')" width="60" align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('Demo.Order')" width="170" align="center">
          <template slot-scope="scope">
            {{ scope.row.createdTime | createdTimeFilters }}
          </template>
        </el-table-column>
        <el-table-column prop="desc" :label="$t('Demo.Desc')" align="center" />
        <el-table-column prop="path" :label="$t('Demo.Path')" align="center" />
        <el-table-column
          :label="$t('Demo.Operation')"
          width="250"
          align="center"
          v-if="$hasPermission('DEMOADD, DEMOEDIT, DEMODELETE')"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click.native="handleCheckItem(scope.row)"
              v-permission="'DEMOCHECK'"
              >{{ $t('menuList.查看') }}</el-button
            >
            <el-button
              type="info"
              size="mini"
              @click.native="handleEditItem(scope.row._id)"
              v-permission="'DEMOEDIT'"
              >{{ $t('menuList.Edit') }}</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click.native="handleDeleteItem(scope.row._id)"
              v-permission="'DEMODELETE'"
              >{{ $t('menuList.Delete') }}</el-button
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
    <demoDialog
      :id="id"
      :demoDialog="demoDialog"
      @closeDemoDialog="closeDemoDialog"
    />
  </div>
</template>

<script>
import demoDialog from './Components/DemoDialog';
import LISTMINXIN from '@/mixin/list-mixin';
export default {
  name: 'Demo',
  mixins: [LISTMINXIN],
  components: {
    demoDialog
  },
  props: {},
  data () {
    return {
      list: null,
      count: 0,
      demoDialog: false,
      id: '',
      isLoading: false,
      params: {
        keyword: null
      }
    };
  },
  computed: {},
  methods: {
    GETLIST () {
      return new Promise(resolve => {
        this.isLoading = true;
        this.params.size = this.size;
        this.params.page = this.page;
        this.$axios.get('/getDemoList', { params: this.params }).then(res => {
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
    async deleteDemoListItem (params) {
      return await this.$axios.get('/deleteDemoListItem', { params });
    },
    handleAddDemo () {
      this.id = '';
      this.demoDialog = true;
    },
    closeDemoDialog (boolean) {
      this.demoDialog = false;
      if (boolean) {
        this.params.keyword = null;
        this.GETLIST().then(() => {
          this.$message.success(this.$t('Demo.刷新列表'));
        });
      }
    },
    handleDeleteItem (_id) {
      this.$confirm(
        this.$t('Demo.Comfirm.Delete.Content'),
        this.$t('Demo.Comfirm.Delete.Tip'),
        {
          confirmButtonText: this.$t('Demo.Comfirm.Delete.确定'),
          cancelButtonText: this.$t('Demo.Comfirm.Delete.取消'),
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteDemoListItem({ _id }).then(res => {
            const { status } = res.data;
            if (status === 0) {
              this.GETLIST().then(() => {
                this.$message.success(this.$t('Demo.刷新列表'));
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('Demo.Comfirm.Delete.已取消删除')
          });
        });
    },
    handleEditItem (_id) {
      this.id = _id;
      this.demoDialog = true;
    },
    handleCheckItem ({ _id, path, content }) {
      window.sessionStorage.setItem('demoContent', content);
      this.$router.push({
        path: '/' + path,
        query: {
          id: _id
        }
      });
    },
    sureKeyword () {
      this.GETLIST();
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
