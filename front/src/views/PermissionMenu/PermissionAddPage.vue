<template>
  <div class="permission-add-page-wrapper">
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
          <el-form-item size="small" :label="$t('AddUserPage.账号') + ':'" prop="account">
            <el-input size="small" v-model="userInfos.account" />
          </el-form-item>
          <el-form-item size="small" :label="$t('AddUserPage.密码') + ':'" prop="password">
            <el-input size="small" v-model="userInfos.password" />
          </el-form-item>
          <el-form-item size="small" :label="$t('AddUserPage.名称') + ':'" prop="name">
            <el-input size="small" v-model="userInfos.name" />
          </el-form-item>
          <el-form-item size="small" :label="$t('AddUserPage.号码') + ':'" prop="mobile">
            <el-input size="small" maxlength='11' v-model="userInfos.mobile" />
          </el-form-item>
          <el-form-item size="small" :label="$t('AddUserPage.头像') + ':'" prop="avatar">
            <UploadFiles
              action="/api/upload"
              :data="{
                directory: 'avatar'
              }"
              @removeCallBack="removeCallBack"
              @successCallback="successCallback"
            />
          </el-form-item>
          <el-form-item size="small" :label="$t('AddUserPage.级别') + ':'">
            <el-select
              v-model="userInfos.role"
              placeholder="请选择"
            >
              <el-option
                v-for="item in roleEnum"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item size="small" :label="$t('AddUserPage.描述') + ':'" prop="desc">
            <el-input
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
          <el-form-item size="small" :label="$t('AddUserPage.权限菜单') + ':'">
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
          @click.native="$throttleHandleAdd('form')"
          >{{ $t('AddUserPage.添加') }}</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { $throttle } from '@/assets/js/utils';
import { roleEnum } from '@/assets/js/enum';
import { RegExp } from '@/assets/js/constant';
export default {
  name: 'PermissionAddPage',
  components: {},
  props: {},
  data () {
    return {
      menuList: null,
      hasPermission: ['DASHBOARD'],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      userInfos: {
        account: '',
        password: '',
        name: '',
        mobile: '',
        role: 'COMMON',
        avatar: '',
        desc: '',
        permission: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户账号' },
          { pattern: RegExp.ACCOUNT, message: '账号格式不正确，4～10个的字母' }
        ],
        password: [
          { required: true, message: '请输入用户密码' },
          {
            pattern: RegExp.PASSWORD,
            message: '密码格式不正确，4～10个的字母或数字组合'
          }
        ],
        name: [
          { required: true, message: '请输入用户名称' },
          {
            pattern: RegExp.USERNAME,
            message: '名称格式不正确，4～10个的字母或中文组合'
          }
        ],
        mobile: [
          { required: true, message: '请输入用户号码' },
          { pattern: RegExp.MOBILE, message: '号码格式不正确' }
        ],
        avatar: [{ required: true, message: '请上传头像' }],
        desc: [
          { required: true, message: '请输入用户相关的描述' }
        ]
      }
    };
  },
  computed: {
    roleEnum () {
      if (this.$store.state.userInfo.isSelf) {
        return roleEnum;
      } else {
        return roleEnum.filter(i => i.value !== 'SUPERADMIN');
      }
    },
    $throttleHandleAdd () {
      return $throttle(ref => this.handleAdd(ref), 2000);
    }
  },
  methods: {
    async getAllPermissionMenu () {
      return await this.$axios.get('/getAllPermissionMenu');
    },
    async registerUser (data) {
      return await this.$axios.post('/registerUser', data);
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
    handleAdd (ref) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.userInfos.permission = this.$refs.tree.getCheckedKeys().join(',');
          this.registerUser(this.userInfos)
            .then((res) => {
              const { status, msg } = res.data;
              if (status === 0) {
                this.$message.success(msg);
                this.$router.back();
              }
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    removeCallBack () {
      this.userInfos.avatar = '';
    },
    successCallback (response) {
      const { result } = response;
      const { url } = result;
      this.userInfos.avatar = url;
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
    this.getAllPermissionMenu().then(res => {
      const { status, result } = res.data;
      if (status === 0) {
        this.menuList = result;
        this.loop(this.menuList);
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.hasPermission);
        });
      }
    });
  },
  mounted () {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.permission-add-page-wrapper {
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
