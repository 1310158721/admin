<template>
  <div class="personal-page-wrapper" v-loading="isLoading">
    <el-form
      v-if="userInfos"
      :model="userInfos"
      :rules="rules"
      ref="form"
      label-width="96px"
      class="permission-form"
      label-position="left"
    >
      <el-row :gutter="20" class="form-content-wrapper">
        <el-col :span="12">
          <el-form-item size="small" label="账号：" prop='account'>
            <el-input size="small" v-model="userInfos.account" />
          </el-form-item>
          <el-form-item size="small" label="密码：" prop='password'>
            <el-input size="small" v-model="userInfos.password" />
          </el-form-item>
          <el-form-item size="small" label="名称：" prop='name'>
            <el-input size="small" v-model="userInfos.name" />
          </el-form-item>
          <el-form-item size="small" label="号码：" prop='mobile'>
            <el-input size="small" maxlength='11' v-model="userInfos.mobile" />
          </el-form-item>
          <el-form-item size="small" label="创建时间：">
            <el-input size="small" disabled v-model="userInfos.createdTime" />
          </el-form-item>
          <el-form-item size="small" label="头像：" prop='avatar'>
            <div
              class="avatar-wrapper"
            >
              <UploadFiles
                action="/api/upload"
                :data="{
                  directory: 'avatar'
                }"
                :defaultPics="defaultPics"
                @removeCallBack="removeCallBack"
                @successCallback="successCallback"
              />
            </div>
          </el-form-item>
          <el-form-item size="small" label="级别：">
            <el-select
              :disabled="userInfos.role === 'SUPERADMIN'"
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
          <el-form-item size="small" label="描述：" prop="desc">
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
          <el-form-item size="small" label="权限菜单：">
            <el-tree
              disable
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
          @click.native="$throttleHandleSave('form')"
          >保 存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { $formDate, $throttle } from '@/assets/js/utils';
import { roleEnum } from '@/assets/js/enum';
import { RegExp } from '@/assets/js/constant';
import { mapMutations } from 'vuex';
export default {
  name: 'Personal',
  components: {},
  props: {},
  data () {
    return {
      userInfos: null,
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
      },
      isLoading: false,
      menuList: null,
      hasPermission: null,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      defaultPics: null
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
      return $throttle((ref) => this.handleSave(ref), 2000);
    }
  },
  methods: {
    ...mapMutations(['SETMENULIST']),
    async getUserInfo () {
      return await this.$axios.get('/getUserInfos');
    },
    async getAllPermissionMenu () {
      return await this.$axios.get('/getAllPermissionMenu');
    },
    async updateUserPersonalInfos (data) {
      return await this.$axios.post('/updateUserPersonalInfos', data);
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
    disabledMenuList (list) {
      for (let i = 0, len = list.length; i < len; i++) {
        list[i].disabled = true;
        if (list[i].children && list[i].children.length) {
          this.disabledMenuList(list[i].children);
        }
      }
    },
    removeCallBack () {
      this.userInfos.avatar = '';
    },
    successCallback (response) {
      const { result } = response;
      const { url } = result;
      this.userInfos.avatar = url;
    },
    handleSave (ref) {
      this.$refs[ref].validate((valid) => {
          if (valid) {
            const { account, password, name, mobile, avatar, desc } = this.userInfos;
            const postData = {
              account, password, name, mobile, avatar, desc
            };
            this.updateUserPersonalInfos(postData)
              .then((res) => {
                const { status, msg } = res.data;
                if (status === 0) {
                  this.$message.success(msg);
                  this.SETMENULIST(null);
                  this.$router.back();
                }
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  },
  created () {
    this.isLoading = true;
    this.$axios.all([this.getUserInfo(), this.getAllPermissionMenu()]).then(
      this.$axios.spread((user, menu) => {
        const menuStatus = menu.data.status;
        if (menuStatus === 0) {
          this.disabledMenuList(menu.data.result);
          this.menuList = menu.data.result;
        }

        const userStatus = user.data.status;
        if (userStatus === 0) {
          this.userInfos = user.data.result;
          this.defaultPics = [
            {
              name: 'avatar',
              url: user.data.result.avatar
            }
          ];
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
.personal-page-wrapper {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .permission-form {
    height: 100%;
    display: flex;
    flex-direction: column;
    .avatar-wrapper {
      height: 144px;
      width: 144px;
      overflow: hidden;
    }
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
