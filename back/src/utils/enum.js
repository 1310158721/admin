class ENUM {
  constructor() {}

  // 用户权限等级枚举
  GetRoleEnum() {
    return [
      { value: 'COMMON', label: '普通用户' },
      { value: 'ADMIN', label: '管理员' },
      { value: 'SUPERADMIN', label: '超级管理员' }
    ];
  }
  // 待办列表事项重要等级
  GetWaitingListRank() {
    return [
      { label: '非常重要', value: 1 },
      { label: '重要', value: 2 },
      { label: '一般', value: 3 }
    ]
  }
}

const constantEnum = new ENUM;

module.exports = constantEnum;
