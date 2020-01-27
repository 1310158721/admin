const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class USERINFOS {
  constructor() {
    this.app = global.APP;

    // 数据库连接状态
    this.db = mongoose.createConnection(
      `mongodb://127.0.0.1:${global.mongoPort}/allUser`,
      { useUnifiedTopology: true, useNewUrlParser: true }
    );

    // 用户数据结构 Schema
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

    // mongoose Model
    this.UserModel = this.db.model('user_list', this.UserSchema);
  }

  /**
   * 用户登录接口
   */
  Login() {
    this.app.get('/api/login', (req, res, next) => {
      const { account = '', password = '' } = req.query;
      if (!account || !password) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        })
      } else {
        const conditions = { account, password };
        this.UserModel.find(conditions)
          .then((doc) => {
            if (!doc.length) {
              res.send({
                result: null,
                status: 400,
                msg: '该用户不存在'
              })
            } else if (doc.length >= 2) {
              res.send({
                result: null,
                status: 400,
                msg: '存在重复的用户，请前往查看后台数据'
              })
            } else {
              const { token } = doc[0];
              // cookie 有效期 2h
              res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 2,
                signed: true
              });
              res.send({
                result: null,
                status: 0,
                msg: '登录成功'
              })
            }
          })
          .catch((err) => {
            res.send({
              reusult: null,
              status: 400,
              msg: '查询用户信息失败'
            })
          })
      }
    })
  }

  /**
   * 获取用户信息
   */
  GetUserInfos() {
    this.app.get('/api/getUserInfos', (req, res, next) => {
      const { token } = req.signedCookies;
      this.UserModel.find({ token }, { _id: 0 })
        .then((user) => {
          if (!user.length) {
            res.send({
              result: null,
              status: 400,
              msg: '无该用户信息'
            })
          } else if (user.length >= 2) {
            res.send({
              result: null,
              status: 400,
              msg: '存在重复的该用户信息'
            })
          } else {
            res.send({
              result: user[0],
              status: 0,
              msg: '查询用户信息成功'
            })
          }
        })
        .catch((err) => {
          res.send({
            result: err,
            status: 400,
            msg: '查询用户信息出错'
          })
        })
    })
  }

  /**
   * 指定要开启的接口
   */
  Start() {
    this.Login();
    this.GetUserInfos();
  }
}

const user_infos = new USERINFOS();
user_infos.Start();
