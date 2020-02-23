const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class DEMO {
  constructor() {
    this.app = global.APP;
    /**
     * 数据库连接的状态
     */
    this.db = mongoose.createConnection(
      `mongodb://127.0.0.1:${global.mongoPort}/adminDemo`,
      { useUnifiedTopology: true, useNewUrlParser: true }
    );

    /**
     * 数据结构 Schema
     */
    this.DemoSchema = new Schema({
      createdTime: Number,
      desc: String,
      path: String,
      content: String
    });
  }

  /* 获取Demo列表 */
  GetDemoList() {
    this.app.get('/api/getDemoList', (req, res, next) => {
      const { page = 1, size = 20, keyword = '' } = req.query;
      const { token } = req.signedCookies;
      const DemoModel = this.db.model(token + '_demo', this.DemoSchema);
      const $and = [
        {
          $or: [
            { desc: { $regex: keyword, $options: '$i' } },
            { path: { $regex: keyword, $options: '$i' } },
            { content: { $regex: keyword, $options: '$i' } }
          ]
        }
      ];

      DemoModel.find()
        .and($and)
        .countDocuments()
        .then(count => {
          DemoModel.find()
            .and($and)
            .limit(Number.parseInt(size))
            .skip(Number.parseInt(page - 1) * size)
            // 将分页后的 待办列表事项按 字段createdTime 逆排序
            .sort({ createdTime: -1 })
            .then(list => {
              res.send({
                result: {
                  list,
                  count
                },
                status: 0,
                msg: '查看demo列表数据成功'
              });
            })
            .catch(err => {
              res.send({
                result: err,
                status: 400,
                msg: '查看demo列表数据失败'
              });
            });
        });
    });
  }

  /* 新增Demo列表Item */
  AddDemoListItem() {
    this.app.post('/api/addDemoListItem', (req, res, next) => {
      const { desc = '', path = '', content = '' } = req.body;
      if (!desc || !path || !content) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const { token } = req.signedCookies;
        const DemoModel = this.db.model(token + '_demo', this.DemoSchema);
        const DemoData = new DemoModel({
          desc,
          path,
          createdTime: Date.now(),
          content
        });

        DemoData.save()
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '新增demo列表Item成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 400,
              msg: '新增demo列表Item失败'
            });
          });
      }
    });
  }

  /* 删除Demo列表Item */
  DeleteDemoListItem() {
    this.app.get('/api/deleteDemoListItem', (req, res, next) => {
      const { _id } = req.query;
      if (!_id) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const { token } = req.signedCookies;
        const DemoModel = this.db.model(token + '_demo', this.DemoSchema);
        DemoModel.findByIdAndDelete(_id)
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '删除demo列表Item成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 400,
              msg: '删除demo列表Item失败'
            });
          });
      }
    });
  }

  /* 更新Demo列表Item */
  UpdateDemoListItem() {
    this.app.post('/api/updateDemoListItem', (req, res, next) => {
      const { _id = '', desc = '', path = '', content = '' } = req.body;
      if (!_id || !desc || !path || !content) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const { token } = req.signedCookies;
        const DemoModel = this.db.model(token + '_demo', this.DemoSchema);
        DemoModel.findByIdAndUpdate(_id, { desc, path, content })
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '更新Demo列表Item成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 400,
              msg: '更新Demo列表Item失败'
            });
          });
      }
    });
  }

  /* 查询单条列表数据 */
  GetListItemById() {
    this.app.get('/api/getListItemById', (req, res, next) => {
      const { _id } = req.query;
      if (!_id) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const { token } = req.signedCookies;
        const DemoModel = this.db.model(token + '_demo', this.DemoSchema);
        DemoModel.findById(_id, { __v: 0, createdTime: 0, _id: 0 })
          .then(list => {
            res.send({
              result: list,
              status: 0,
              msg: '查询Demo列表单条数据成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 400,
              msg: '查询Demo列表单条数据失败'
            });
          });
      }
    });
  }

  Start() {
    this.GetDemoList();
    this.AddDemoListItem();
    this.DeleteDemoListItem();
    this.UpdateDemoListItem();
    this.GetListItemById();
  }
}

const demo = new DEMO();
demo.Start();
