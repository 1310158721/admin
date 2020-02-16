<template>
  <div class="permission-edit-page-wrapper" v-loading="isLoading">
    <el-form
      :model="userInfos"
      :rules="rules"
      ref="form"
      label-width="96px"
      class="permission-form"
      label-position="left"
    >
      <el-row :gutter="20" class="form-content-wrapper">
        <el-col :span="12">
          <el-form-item size="small" :label="$t('EditUserPage.账号') + ':'">
            <el-input size="small" disabled v-model="userInfos.account" />
          </el-form-item>
          <el-form-item size="small" :label="$t('EditUserPage.密码') + ':'">
            <el-input size="small" disabled v-model="userInfos.password" />
          </el-form-item>
          <el-form-item size="small" :label="$t('EditUserPage.名称') + ':'">
            <el-input size="small" disabled v-model="userInfos.name" />
          </el-form-item>
          <el-form-item size="small" :label="$t('EditUserPage.号码') + ':'">
            <el-input size="small" disabled v-model="userInfos.mobile" />
          </el-form-item>
          <el-form-item size="small" :label="$t('EditUserPage.创建时间') + ':'">
            <el-input size="small" disabled v-model="userInfos.createdTime" />
          </el-form-item>
          <el-form-item size="small" :label="$t('EditUserPage.头像') + ':'">
            <div class="images" v-viewer.static="{inline: false}">
              <img :src="userInfos.avatar" width="144" height="144" />
            </div>
          </el-form-item>
          <el-form-item size="small" :label="$t('EditUserPage.级别') + ':'">
            <el-select
              :disabled="userInfos.role === 'SUPERADMIN'"
              v-model="userInfos.role"
            >
              <el-option
                v-for="item in roleEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item size="small" :label="$t('EditUserPage.描述') + ':'" prop="desc">
            <el-input
              disabled
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              show-word-limit
              maxlength='100'
              placeholder="请输入内容"
              v-model="userInfos.desc">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item size="small" :label="$t('EditUserPage.权限菜单') + ':'">
            <el-tree
              v-if="menuList"
              :data="menuList"
              show-checkbox
              default-expand-all
              node-key="permission"
              ref="tree"
              highlight-current
              check-strictly
              :props="defaultProps"
              @check="checkChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="button-wrapper mgt-20">
        <el-button
          type="primary"
          size="small"
          @click.native="$throttleHandleSave"
          >保 存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { $formDate, $throttle } from '@/assets/js/utils';
import { roleEnum } from '@/assets/js/enum';
import { mapMutations } from 'vuex';
export default {
  name: 'PermissionEditPage',
  components: {},
  props: {},
  data () {
    return {
      isLoading: false,
      id: null,
      userInfos: {},
      rules: {},
      menuList: null,
      hasPermission: null,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    };
  },
  computed: {
    roleEnum () {
      if (this.userInfos.role === 'SUPERADMIN') {
        return roleEnum;
      } else {
        return roleEnum.filter(i => i.value !== 'SUPERADMIN');
      }
    },
    $throttleHandleSave () {
      return $throttle(() => this.handleSave(), 2000);
    }
  },
  methods: {
    ...mapMutations(['SETUSERINFOS', 'SETMENULIST']),
    async getUserInfo (params) {
      return await this.$axios.get('/getUserInfos', { params });
    },
    async getAllPermissionMenu () {
      return await this.$axios.get('/getAllPermissionMenu');
    },
    async updateUserPermissionInfos (data) {
      this.isLoading = true;
      return await this.$axios.post('/updateUserPermissionInfos', data);
    },
    checkChange (data, options) {
      const currentClickKey = data.permission;
      const currentCheckKeys = options.checkedKeys;
      const isCheck = currentCheckKeys.includes(currentClickKey);

      const childKeyArray = [];
      this.getAllChildKeys([data], childKeyArray);
      const hasCheckKeys = this.$refs.tree.getCheckedKeys();

      let hasCheckKeysAfterSet = null;
      if (isCheck) {
        const { parent } = this.$refs.tree.getNode(currentClickKey);
        const parentKeysArray = [];
        this.getAllParentKeys(parent, parentKeysArray);
        hasCheckKeysAfterSet = [
          ...new Set([...childKeyArray, ...hasCheckKeys, ...parentKeysArray])
        ];
      } else {
        hasCheckKeysAfterSet = hasCheckKeys.filter(
          i => !childKeyArray.includes(i)
        );
      }
      this.$refs.tree.setCheckedKeys(hasCheckKeysAfterSet);
    },
    getAllChildKeys (parent, childKeyArray = []) {
      parent.map(i => {
        childKeyArray.push(i.permission);
        if (i.children) {
          this.getAllChildKeys(i.children, childKeyArray);
        }
      });
    },
    getAllParentKeys (parent, parentKeysArray = []) {
      if (!Array.isArray(parent.data)) {
        parentKeysArray.push(parent.data.permission);
      }
      if (parent.parent) {
        this.getAllParentKeys(parent.parent, parentKeysArray);
      }
    },
    handleSave () {
      const hasCheckedKeys = this.$refs.tree.getCheckedKeys().join(',');
      const role = this.userInfos.role;
      this.updateUserPermissionInfos({
        permission: hasCheckedKeys,
        role,
        _id: this.id
      }).then(res => {
        const { status, msg } = res.data;
        if (status === 0) {
          // 更新自己数据时，面刷新页面处理
          if (
            this.userInfos.account === this.$store.state.userInfo.account &&
            this.userInfos.password === this.$store.state.userInfo.password
          ) {
            this.isLoading = false;
            this.$message.success(msg);
            if (this.userInfos.isSelf) {
              /**
               * 当前修改操作是主人对自身数据进行修改时，则跳转路由后要刷新页面
               * 有可能主人开启了某些权限菜单，但这时还没有添加菜单对应的路由组件
               * 此时跳转则会直接重定向到404页面
               */
              this.$router.push({
                name: 'PermissionMenu',
                params: {
                  isShouldRefresh: true
                }
              });
            } else {
              this.$router.back();
            }
          } else {
            this.isLoading = false;
            this.$message.success(msg);
            this.$router.back();
          }
        }
      });
    },
    loop (list) {
      list.map((i) => {
        i.title = this.$t('menuList.' + i.title);
        if (i.children && i.children.length) {
          this.loop(i.children);
        }
      });
    }
  },
  created () {
    const { _id } = this.$route.query;
    this.id = _id;

    this.isLoading = true;
    this.$axios
      .all([this.getUserInfo({ _id }), this.getAllPermissionMenu()])
      .then(
        this.$axios.spread((user, menu) => {
          const menuStatus = menu.data.status;
          if (menuStatus === 0) {
            this.menuList = menu.data.result;
            this.loop(this.menuList);
          }

          const userStatus = user.data.status;
          if (userStatus === 0) {
            this.userInfos = user.data.result;
            this.userInfos.createdTime = $formDate(
              new Date(this.userInfos.createdTime),
              'yyyy-MM-dd hh:mm:ss'
            );
            const { permission = '' } = this.userInfos;
            this.hasPermission = permission.split(',');
            this.$nextTick(() => {
              this.$refs.tree.setCheckedKeys(permission.split(','));
            });
          }

          this.isLoading = false;
        })
      );
  },
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.permission-edit-page-wrapper {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .permission-form {
    height: 100%;
    display: flex;
    flex-direction: column;
    .form-content-wrapper {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      display: flex;
      flex-direction: row;
      .el-col {
        flex: 1;
        height: 100%;
        overflow-y: auto;
      }
      .images {
        img {
          cursor: pointer;
        }
      }
    }
    .button-wrapper {
      text-align: center;
      .el-button {
        width: 200px;
      }
    }
  }
}
</style>
