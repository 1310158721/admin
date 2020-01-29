class ENUM {
  constructor() {
    this.roleEnum = [
      { value: 'COMMON', label: '普通用户' },
      { value: 'ADMIN', label: '管理员' },
      { value: 'SUPERADMIN', label: '超级管理员' }
    ]
  }

  GetRoleEnum() {
    return this.roleEnum;
  }
}

const constantEnum = new ENUM;

module.exports = constantEnum;
