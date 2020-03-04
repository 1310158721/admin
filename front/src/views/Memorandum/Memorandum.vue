<template>
  <div class="memorandum-wrapper list-wrapper">
    <div class="conditions-wrapper mgb-20">
      <el-button
        class="mgr-20"
        type="primary"
        size="small"
        @click.native="handleAddItem"
        v-permission="'MEMORANDUMADD'"
        >{{ $t('menuList.新增事件') }}</el-button
      >
      <el-date-picker
        class="w-240 mgr-20"
        v-model="timeRange"
        type="daterange"
        :start-placeholder="$t('Memerandum.开始日期')"
        :end-placeholder="$t('Memerandum.结束日期')"
        size="small"
        @change="timePickerChange"
        :picker-options="pickerOptions"
      />
      <el-select
        v-if="tagEnum.length"
        class="w-120"
        v-model="params.tag"
        size="small"
        filterable
        clearable
        :placeholder="$t('Memerandum.请选择')"
        @change="tagChange"
      >
        <el-option
          size="small"
          v-for="item in tagEnum"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <span class="self-adaption"></span>
      <SearchBar
        class="search-bar w-240"
        placeholder="Desc"
        v-model="params.keyword"
        @sureKeyword="sureKeyword"
      />
    </div>
    <div class="table-wrapper" v-loading="isLoading">
      <el-table
        :data="list"
        border
        stripe
        height="100%"
        :row-class-name="tableRowClassName"
        @row-click='rowClick'
      >
        <el-table-column
          :label="$t('Memerandum.Order')"
          width="60"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('Memerandum.CreatedTime')"
          width="170"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.createdTime | createdTimeFilters }}
          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          :label="$t('Memerandum.Desc')"
          align="center"
        />
        <el-table-column
          :label="$t('Memerandum.Tags')"
          width="240"
          align="center"
        >
          <template slot-scope="scope">
            <span v-for="(i, index) in scope.row.tag" :key="i.id">
              <el-tag
                class="tags"
                effect="dark"
                size="small"
                :type="tagType(index)"
                >{{ i }}</el-tag
              >
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('Memerandum.Operation')"
          width="150"
          align="center"
          v-if="
            $hasPermission(
              'MEMORANDUMEDIT,MEMORANDUMDELETE,MEMORANDUMSETFIRST,MEMORANDUMSHARE'
            )
          "
        >
          <template slot-scope="scope">
            <el-dropdown class="operation-dropdown" trigger='click'>
              <span class="el-dropdown-link">
                {{ $t('menuList.更多') }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item @click.native='hanldeCheck(scope.row.content)' v-permission="'MEMORANDUMCHECK'">{{ $t('menuList.查看') }}</el-dropdown-item> -->
                <el-dropdown-item @click.native='hanldeEdit(scope.row._id)' v-permission="'MEMORANDUMEDIT'">{{ $t('menuList.Edit') }}</el-dropdown-item>
                <el-dropdown-item @click.native='hanldeDelete(scope.row._id)' v-permission="'MEMORANDUMDELETE'">{{ $t('menuList.Delete') }}</el-dropdown-item>
                <el-dropdown-item @click.native='handleSwitchSetFirst(scope.row)' v-if="scope.row.isSetFirst" v-permission="'MEMORANDUMSETFIRST'">{{ $t('Memerandum.取消置顶') }}</el-dropdown-item>
                <el-dropdown-item @click.native='handleSwitchSetFirst(scope.row)' v-else v-permission="'MEMORANDUMSETFIRST'">{{ $t('Memerandum.设为置顶') }}</el-dropdown-item>
                <el-dropdown-item @click.native='handleShare(scope.row)' ref='clipboard' v-clipboard='clipboardData' v-permission="'MEMORANDUMSHARE'">{{ $t('menuList.分享') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
    <memorandumAddDialog
      :memorandumAddDialog="memorandumAddDialog"
      :id="id"
      @closeDialog="closeDialog"
    />
    <MemorandumPreviewDrawer
      :memorandumPreviewDrawer="memorandumPreviewDrawer"
      :editorContent="editorContent"
      @closeMemorandumPreview="closeMemorandumPreview"
    />
  </div>
</template>

<script>
import { $formDate } from '@/assets/js/utils';
import memorandumAddDialog from './Components/MemorandumAddDialog';
import LISTMINXIN from '@/mixin/list-mixin';
import MemorandumPreviewDrawer from './Components/MemorandumPreviewDrawer';
import { mapMutations } from 'vuex';
export default {
  name: 'Memorandum',
  mixins: [LISTMINXIN],
  components: {
    memorandumAddDialog,
    MemorandumPreviewDrawer
  },
  props: {},
  data () {
    return {
      isLoading: false,
      list: null,
      count: 0,
      theTimeRange: null,
      pickerOptions: {
        disabledDate (date) {
          return date > Date.now();
        }
      },
      params: {
        keyword: null,
        tag: null,
        startTime: null,
        endTime: null
      },
      tagEnum: [],
      memorandumAddDialog: false,
      id: null,
      memorandumPreviewDrawer: false,
      editorContent: null,
      clipboardData: null
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
    }
  },
  methods: {
    ...mapMutations(['SETMENULIST']),
    async getMemorandumList () {
      return await this.$axios.get('/getMemorandumList', {
        params: this.params
      });
    },
    async getAllTags () {
      return await this.$axios.get('/getAllTags');
    },
    async deleteMemorandumListItemById (params) {
      return await this.$axios.get('/deleteMemorandumListItemById', { params });
    },
    async switchMemorandumListItemIsSetFirst (data) {
      return await this.$axios.post(
        '/switchMemorandumListItemIsSetFirst',
        data
      );
    },
    GETLIST () {
      return new Promise(resolve => {
        this.isLoading = true;
        this.params.size = this.size;
        this.params.page = this.page;
        this.$axios.all([this.getMemorandumList(), this.getAllTags()]).then(
          this.$axios.spread((list, tag) => {
            const listStatus = list.data.status;
            const listResult = list.data.result;
            if (listStatus === 0) {
              const { list, count } = listResult;
              this.list = list;
              this.count = count;
              this.formatListTag(this.list);
            }

            const tagStatus = tag.data.status;
            const tagResult = tag.data.result;
            if (tagStatus === 0) {
              this.tagEnum = tagResult;
            }
            this.isLoading = false;
            resolve();
          })
        );
      });
    },
    formatListTag (list) {
      list.map(i => {
        i.tag = i.tag.split(',');
        return i;
      });
    },
    handleAddItem () {
      this.id = '';
      this.memorandumAddDialog = true;
    },
    closeDialog (boolean) {
      this.memorandumAddDialog = false;
      if (boolean) {
        this.formatParams();
        this.GETLIST().then(() => {
          this.$message.success(this.$t('Memerandum.刷新列表'));
        });
      }
    },
    hanldeCheck (content) {
      this.editorContent = content;
      this.memorandumPreviewDrawer = true;
    },
    closeMemorandumPreview () {
      this.editorContent = null;
      this.memorandumPreviewDrawer = false;
    },
    hanldeDelete (_id) {
      this.$confirm(
        this.$t('Memerandum.Comfirm.Delete.Content'),
        this.$t('Memerandum.Comfirm.Delete.Tip'),
        {
          confirmButtonText: this.$t('Memerandum.Comfirm.Delete.确定'),
          cancelButtonText: this.$t('Memerandum.Comfirm.Delete.取消'),
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteMemorandumListItemById({ _id }).then(res => {
            const { status } = res.data;
            if (status === 0) {
              this.GETLIST().then(() => {
                this.$message.success(this.$t('Memerandum.刷新列表'));
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('Memerandum.Comfirm.Delete.已取消删除')
          });
        });
    },
    hanldeEdit (_id) {
      this.id = _id;
      this.memorandumAddDialog = true;
    },
    sureKeyword () {
      this.theTimeRange = null;
      this.params.startTime = null;
      this.params.endTime = null;
      this.params.tag = null;
      this.GETLIST();
    },
    timePickerChange () {
      this.params.keyword = null;
      this.params.tag = null;
      this.GETLIST();
    },
    tagChange (val) {
      this.params.startTime = null;
      this.params.ednTime = null;
      this.theTimeRange = null;
      this.params.keyword = null;
      if (!val) {
        this.params.tag = null;
      }
      this.GETLIST();
    },
    // 为列表item添加class
    tableRowClassName ({ row }) {
      return [row.isSetFirst ? 'is-set-first' : '', this.$hasPermission('MEMORANDUMCHECK') ? 'can-check' : ''];
    },
    handleSwitchSetFirst ({ _id, isSetFirst }) {
      this.$confirm(
        this.$t('Memerandum.Comfirm.Top.Content'),
        this.$t('Memerandum.Comfirm.Top.Tip'),
        {
          confirmButtonText: this.$t('Memerandum.Comfirm.Top.确定'),
          cancelButtonText: this.$t('Memerandum.Comfirm.Top.取消'),
          type: 'warning'
        }
      )
        .then(() => {
          this.switchMemorandumListItemIsSetFirst({ _id, isSetFirst }).then(
            res => {
              const { status } = res.data;
              if (status === 0) {
                this.GETLIST().then(() => {
                  this.$message.success(this.$t('Memerandum.刷新列表'));
                });
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('Memerandum.Comfirm.Top.已取消删除')
          });
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
    },
    formatParams () {
      this.theTimeRange = null;
      this.params = {
        keyword: null,
        tag: null,
        startTime: null,
        endTime: null
      };
    },
    handleShare (row) {
      // 复制链接
      const url = window.origin + '/#/MemorandumShare?uid=' + this.$store.state.userInfo._id + '&u=/getShareItemInfo' + '&_id=' + row._id;
      this.clipboardData = url;
    },
    rowClick (row, column, event) {
      const dom = event.target;
      console.log(dom);
      if (!(dom.getAttribute('class').includes( 'el-icon--right') || dom.getAttribute('class').includes( 'el-dropdown-link')) && this.$hasPermission('MEMORANDUMCHECK')) {
        this.hanldeCheck(row.content);
      }
    }
  },
  created () {
    this.GETLIST();
  },
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.tags {
  margin: 0 2px;
}
.operation-dropdown {
  width: 96px;
  cursor: pointer;
}
.el-dropdown-link {
  color: #909399;
  font-weight: bold;
  &:hover {
    color: #409EFF;
  }
  user-select: none;
}
</style>
