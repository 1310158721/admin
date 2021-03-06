const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class PERMISSIONMENU {
  constructor() {
    this.app = global.APP;
    /**
     * 数据库连接的状态
     */
    this.db = mongoose.createConnection(
      `mongodb://127.0.0.1:${global.mongoPort}/allUser`,
      { useUnifiedTopology: true, useNewUrlParser: true }
    );

    /**
     * 导航菜单数据结构 Schema
     */
    this.MenuListSchema = new Schema({
      title: String,
      disabled: Boolean,
      children: Array,
      icon: String,
      permission: String
    });

    /**
     * 导航菜单数据 Model
     */
    this.MenuListModel = this.db.model('menu_list', this.MenuListSchema);

    /**
     * 用户数据结构 Schema
     */
    this.UserSchema = new Schema({
      account: String,
      password: String,
      mobile: String,
      avatar: String,
      permission: String,
      desc: String,
      token: String,
      role: String,
      name: String,
      roleDesc: String,
      createdTime: Number
    });

    /**
     * 用户数据 Model(表的名称不能大写)
     */
    this.UserModel = this.db.model('user_list', this.UserSchema);
  }

  /**
   * 删除没有权限值的导航菜单
   * @param {已有的权限} hasPermission
   * @param {权限列表} list
   */
  loopMatchList(hasPermission, list) {
    for (let i = list.length - 1; i >= 0; i--) {
      if (!list[i].children) {
        if (!hasPermission.includes(list[i].permission)) {
          list.splice(i, 1);
        }
      } else {
        this.loopMatchList(hasPermission, list[i].children);
      }
    }
  }

  /**
   * 多次遍历删除空数组，方便前端导航菜单的渲染
   * @param {权限列表} list
   */
  delEmptyArray(list) {
    for (let t = 0; t < 3; t++) {
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].children !== null) {
          if (!list[i].children.length) {
            list.splice(i, 1);
          } else {
            this.delEmptyArray(list[i].children);
          }
        }
      }
    }
  }

  /**
   * 获取用户权限菜单接口
   */
  GetPermissionMenu() {
    this.app.get('/api/getUserPsermissionMenu', (req, res, next) => {
      const { token } = req.signedCookies;

      this.UserModel.find({ token })
        .then((user) => {
          if (!user.length) {
            res.send({
              result: null,
              status: 400,
              msg: '该用户不存在'
            })
          } else if (user.length >= 2) {
            res.send({
              result: null,
              status: 400,
              msg: '存在重复的用户，请前往查看后台数据'
            })
          } else {
            const hasPermission = user[0].permission.split(',');
            this.MenuListModel.find({}, { _id: 0 })
              .then((list) => {
                this.loopMatchList(hasPermission, list);
                this.delEmptyArray(list);
                res.send({
                  result: list,
                  status: 0,
                  msg: '获取权限菜单成功'
                })
              })
              .catch((err) => {
                res.send({
                  result: err,
                  status: 400,
                  msg: '获取权限菜单失败'
                })
              })
          }
        })
        .catch((err) => {
          res.send({
            result: err,
            status: 400,
            msg: '获取权限菜单时，查询用户信息失败'
          })
        })
    })
  }

  Start() {
    this.GetPermissionMenu();
  }
}

const permissionMenu = new PERMISSIONMENU();
permissionMenu.Start();
