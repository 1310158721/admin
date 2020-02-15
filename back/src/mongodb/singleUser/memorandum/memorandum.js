const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MYOSS = require('../../../oss/oss');
const myOss = new MYOSS();

class MEMORANDUM {
  constructor() {
    this.app = global.APP;
    /**
     * 数据库连接的状态
     */
    this.db = mongoose.createConnection(
      `mongodb://127.0.0.1:${global.mongoPort}/memorandum`,
      { useUnifiedTopology: true, useNewUrlParser: true }
    );

    /**
     * 数据结构 Schema
     */
    this.MemorandumSchema = new Schema({
      content: String,
      tag: String,
      createdTime: Number,
      desc: String,
      isSetFirst: Boolean,
      isSetFirstTime: Number
    });
  }

  /**
   * 获取备忘录列表
   */
  GetMemorandumList() {
    this.app.get('/api/getMemorandumList', (req, res, next) => {
      const {
        page = 1,
        size = 20,
        keyword = '',
        startTime = '',
        endTime = null,
        tag = ''
      } = req.query;
      const { token } = req.signedCookies;
      const MemorandumModel = this.db.model(
        token + '_memorandum',
        this.MemorandumSchema
      );

      const $and = [
        // 关键字模糊搜索
        {
          $or: [
            { desc: { $regex: keyword, $options: '$i' } },
            { content: { $regex: keyword, $options: '$i' } }
          ]
        },
        // tag 模糊搜索
        {
          $or: [{ tag: { $regex: tag, $options: '$i' } }]
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
          : {}
      ];

      MemorandumModel.find()
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
              count: list.length
            },
            status: 0,
            msg: '查询备忘录列表成功'
          });
        })
        .catch(err => {
          res.send({
            result: err,
            status: 400,
            msg: '查询备忘录列表失败'
          });
        });
    });
  }

  /**
   * 备忘录事件录入
   */
  AddMemorandumListItem() {
    this.app.post('/api/addMemorandumListItem', (req, res, next) => {
      const { content = '', tag = '', desc = '' } = req.body;
      if (!content || !tag || !desc) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const createdTime = Date.now();
        const isSetFirst = false;
        const isSetFirstTime = 0;
        const { token } = req.signedCookies;
        const MemorandumModel = this.db.model(
          token + '_memorandum',
          this.MemorandumSchema
        );
        const addData = new MemorandumModel({
          content,
          tag,
          desc,
          createdTime,
          isSetFirst,
          isSetFirstTime
        });
        addData
          .save()
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '备忘录录入数据成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 400,
              msg: '备忘录录入数据失败'
            });
          });
      }
    });
  }

  /**
   * 备忘录事件修改
   */
  UpdateMemorandumListItemById() {
    this.app.post('/api/updateMemorandumListItemById', (req, res, next) => {
      const { content = '', tag = '', desc = '', _id = '' } = req.body;
      if (!content || !tag || !desc || !_id) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const { token } = req.signedCookies;
        const MemorandumModel = this.db.model(
          token + '_memorandum',
          this.MemorandumSchema
        );
        MemorandumModel.findByIdAndUpdate(_id, { content, desc, tag })
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '更新备忘录事件数据成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 400,
              msg: '更新备忘录事件数据失败'
            });
          });
      }
    });
  }

  /**
   * 根据 id 查询列表item
   */
  GetMemorandumListItemById() {
    this.app.get('/api/getMemorandumListItemById', (req, res, next) => {
      const { _id } = req.query;
      if (!_id) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const { token } = req.signedCookies;
        const MemorandumModel = this.db.model(
          token + '_memorandum',
          this.MemorandumSchema
        );
        MemorandumModel.findById(_id, { _id: 0 })
          .then(doc => {
            res.send({
              result: doc,
              status: 0,
              msg: '查询备忘录列表单条数据成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 400,
              msg: '查询备忘录列表单条数据失败'
            });
          });
      }
    });
  }

  /**
   * 根据 id 删除列表item
   */
  DeleteMemorandumListItemById() {
    this.app.get('/api/deleteMemorandumListItemById', (req, res, next) => {
      const { _id } = req.query;
      if (!_id) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        });
      } else {
        const { token } = req.signedCookies;
        const MemorandumModel = this.db.model(
          token + '_memorandum',
          this.MemorandumSchema
        );
        MemorandumModel.findByIdAndDelete(_id)
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '删除备忘录列表单条数据成功'
            });
          })
          .catch(err => {
            res.send({
              result: err,
              status: 0,
              msg: '删除备忘录列表单条数据失败'
            });
          });
      }
    });
  }

  formatTags(list) {
    let result = [];
    list.map(i => {
      result = result.concat(i.tag.split(','));
    });
    return [...new Set(result)];
  }

  /**
   * 获取所有的Tag
   */
  GetAllTags() {
    this.app.get('/api/getAllTags', (req, res, next) => {
      const { token } = req.signedCookies;
      const MemorandumModel = this.db.model(
        token + '_memorandum',
        this.MemorandumSchema
      );
      MemorandumModel.find()
        .then(list => {
          const formatList = this.formatTags(list);
          res.send({
            result: formatList,
            status: 0,
            msg: '获取用户的所有Tag成功'
          });
        })
        .catch(err => {
          res.send({
            result: err,
            status: 400,
            msg: '获取用户的所有Tag失败'
          });
        });
    });
  }

  /**
   * 切换置顶状态
   */
  SwitchMemorandumListItemIsSetFirst() {
    this.app.post('/api/switchMemorandumListItemIsSetFirst', (req, res, next) => {
      const { isSetFirst, _id } = req.body;
      if (!_id) {
        res.send({
          result: null,
          status: 400,
          msg: '参数不能为空'
        })
      } else {
        const isSetFirstTime = isSetFirst ? 0 : Date.now();
        const { token } = req.signedCookies;
        const MemorandumModel = this.db.model(
          token + '_memorandum',
          this.MemorandumSchema
        );
        MemorandumModel.findByIdAndUpdate(_id, { isSetFirst: !isSetFirst, isSetFirstTime })
          .then(() => {
            res.send({
              result: null,
              status: 0,
              msg: '更新备忘录数据置顶状态成功'
            })
          })
          .catch((err) => {
            res.send({
              result: err,
              status: 400,
              msg: '更新备忘录数据置顶状态失败'
            })
          })
      }
    })
  }

  /**
   * 定时删除阿里云OSS对象上的多余图片文件（avatar 文件夹）
   */
  GetDbAllCollections() {
    const _this = this;
    this.db.on("connected",function(){
      const collections = [];
      this.db.collections()
        .then((data) => {
          if (data.length) {
            data.map((i) => {
              collections.push(i.s.namespace.collection.replace(/s$/g, ''));
            })

            let len = collections.length;
            let start = 0;
            loop(start);
            let content = [];
            function loop(start) {
              if (start >= len) {
                let timer = setInterval(() => {
                  console.log(
                    'Memorandum 阿里云OSS checking____________________________________________'
                  );
  
                  let mongodbPhotos = '';
                  content.map((i) => {
                    if (i.content) {
                      mongodbPhotos += i.content;
                    }
                  });
  
                  myOss.setBuckName(global.buckName).then(() => {
                    /**
                     * 搜索 oss global.buckName（bucket） 是否存在 record 文件夹
                     */
                    myOss.listDir('record/').then(result => {
                      /**
                       * oss 当前存在的图片
                       */
                      const OssHasPhotos = [];
                      if (result.objects && result.objects.length) {
                        /**
                         * 获取所有 oss 当前存在的 图片
                         */
                        result.objects.forEach(obj => {
                          OssHasPhotos.push(obj.name);
                        });
                        
                        /**
                         * 根据 oss 当前存在的 图片 与 对应数据库当前存在的所有图片 匹配，找出 oss 当前不被需要的图片
                         */
                        const unExist = OssHasPhotos.filter(
                          item => !mongodbPhotos.includes(item)
                        );
                        /**
                         * Oss 删除当前不被需要的图片
                         */
                        myOss.deleteMulti(unExist).then(() => {
                          console.log('Memorandum 相关的多余图片已删除');
                        });
                      }
                    });
                  });
                }, global.deleteOssPhotoTime)

                return false;
              }
              const MemorandumModel = _this.db.model(
                collections[start],
                _this.MemorandumSchema
              );
  
              MemorandumModel.find()
                .then((doc) => {
                  content = [...content, ...doc]
                  start += 1;
                  loop(start);
                })
            }
          }
        })
    })
  }

  Start() {
    this.GetMemorandumList();
    this.AddMemorandumListItem();
    this.GetMemorandumListItemById();
    this.DeleteMemorandumListItemById();
    this.UpdateMemorandumListItemById();
    this.GetAllTags();
    this.SwitchMemorandumListItemIsSetFirst();
    this.GetDbAllCollections();
  }
}

const memorandum = new MEMORANDUM();
memorandum.Start();
