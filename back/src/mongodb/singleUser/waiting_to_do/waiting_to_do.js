const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const waitingListRank = require('../../../utils/enum').GetWaitingListRank();

class WAITINGTODO {
  constructor() {
    this.app = global.APP;
    /**
     * 数据库连接的状态
     */
    this.db = mongoose.createConnection(
      `mongodb://127.0.0.1:${global.mongoPort}/waitingTodo`,
      { useUnifiedTopology: true, useNewUrlParser: true }
    );

    /**
     * 数据结构 Schema
     */
    this.WaitingTodoSchema = new Schema({
      desc: String,
      createdTime: Number,
      rank: Number,
      rankDesc: String,
      isFinish: Boolean,
      isSetFirst: Boolean,
      isSetFirstTime: Number
    });
  }

  /**
   * 获取待办列表数据
   */
  GetWaitingList() {
    this.app.get('/api/getWaitingList', (req, res, next) => {
      const { token } = req.signedCookies;
      const {
        page = 1,
        size = 20,
        isFinish = '',
        keyword = '',
        startTime = '',
        endTime = '',
        rank = ''
      } = req.query;
      const WaitingTodoModel = this.db.model(
        token + '_waiting_list',
        this.WaitingTodoSchema
      );

      // 多添件搜索
      const $and = [
        {
          // 关键字模糊搜索
          $or: [{ desc: { $regex: keyword, $options: '$i' } }]
        },
        // 时间段搜索
        startTime && endTime
          ? {
              createdTime: {
                // 时间段临界值处理
                $gte: new Date(startTime + ' 00:00:00'),
                $lte: new Date(endTime + ' 23:59:59')
              }
            }
          : {},
        // 事项等级搜索
        rank
          ? {
              rank
            }
          : {},
        // 事项是否完成搜索
        isFinish
          ? {
              isFinish
            }
          : {}
      ];

      WaitingTodoModel.find()
        .countDocuments()
        .and($and)
        .then(count => {
          WaitingTodoModel.find({}, { __v: 0 })
            // 将数据库所有的待办列表事项按 字段isSetFirstTime 逆排序
            .sort({ isSetFirstTime: -1 })
            .and($and)
            // 分页搜索（limit/skip）
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
                msg: '待办列表查询成功'
              });
            })
            .catch(err => {
              res.send({
                result: err,
                status: 400,
                msg: '待办列表查询失败'
              });
            });
        })
        .catch(err => {
          res.send({
            result: err,
            status: 400,
            msg: '查询待办列表总条数失败'
          });
        });
    });
  }

  /**
   * 新增待办列表
   */
  AddWaitingListItem() {
    this.app.post('/api/addWaitingListItem', (req, res, next) => {
      const { token } = req.signedCookies;
      const { desc = '', rank = '' } = req.body;
      if (!desc || !rank) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const rankDesc = waitingListRank.filter(i => i.value == rank)[0].label;
        const createdTime = Date.now();
        const isFinish = false;
        const isSetFirst = false;
        const isSetFirstTime = 0;
        const WaitingTodoModel = this.db.model(
          token + '_waiting_list',
          this.WaitingTodoSchema
        );
        const addData = new WaitingTodoModel({
          desc,
          rank,
          rankDesc,
          createdTime,
          isFinish,
          isSetFirst,
          isSetFirstTime
        });
        addData
          .save()
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '新增待办列表事项成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 400,
              msg: '新增待办列表事项失败'
            });
          });
      }
    });
  }

  /**
   * 删除待办列表事项
   */
  DeleteWaitingListItem() {
    this.app.get('/api/deleteWaitingListItem', (req, res, next) => {
      const { token } = req.signedCookies;
      const { _id } = req.query;
      const WaitingTodoModel = this.db.model(
        token + '_waiting_list',
        this.WaitingTodoSchema
      );
      WaitingTodoModel.findByIdAndDelete(_id)
        .then(() => {
          res.send({
            result: null,
            status: 0,
            msg: '删除待办列表事项成功'
          });
        })
        .catch(err => {
          res.send({
            result: err,
            status: 400,
            msg: '删除待办列表事项失败'
          });
        });
    });
  }

  /**
   * 切换待办列表事项完成状态
   */
  SwitchWaitingListItemStatus() {
    this.app.post('/api/switchWaitingListItemStatus', (req, res, next) => {
      const { token } = req.signedCookies;
      const { _id, isFinish = false } = req.body;
      if (!_id) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const WaitingTodoModel = this.db.model(
          token + '_waiting_list',
          this.WaitingTodoSchema
        );
        WaitingTodoModel.findByIdAndUpdate(_id, { isFinish: !isFinish })
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '修改待办列表事项状态成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 400,
              msg: '修改待办列表事项状态失败'
            });
          });
      }
    });
  }

  /**
   * 切换待办列表事项置顶状态
   */
  SwitchWaitingListItemIsFirst() {
    this.app.post('/api/switchWaitingListItemIsFirst', (req, res, next) => {
      const { token } = req.signedCookies;
      const { _id, isSetFirst = false } = req.body;
      if (!_id) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const isSetFirstTime = !isSetFirst ? Date.now() : 0;
        const WaitingTodoModel = this.db.model(
          token + '_waiting_list',
          this.WaitingTodoSchema
        );
        WaitingTodoModel.findByIdAndUpdate(_id, {
          isSetFirst: !isSetFirst,
          isSetFirstTime
        })
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '修改待办列表事项置顶状态成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 0,
              msg: '修改待办列表事项置顶状态失败'
            });
          });
      }
    });
  }

  Start() {
    this.GetWaitingList();
    this.AddWaitingListItem();
    this.DeleteWaitingListItem();
    this.SwitchWaitingListItemStatus();
    this.SwitchWaitingListItemIsFirst();
  }
}

const waiting = new WAITINGTODO();
waiting.Start();
