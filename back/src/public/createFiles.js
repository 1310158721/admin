const officegen = require('officegen');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class LOADFILES {
  constructor() {
    this.app = global.APP;
  }

  // 生成word文档模版
  DocxTemplate(docx) {
    var pObj = docx.createP({ align: 'center' }); // 创建行 设置居中
      pObj.addText('血液透析（滤过）治疗知情同意书', {
        bold: true,
        font_face: 'Arial',
        font_size: 18
      }); // 添加文字 设置字体样式 加粗 大小

      var pObj = docx.createP();
      pObj.addText('姓名');
      pObj.addText(' with color', { color: '000088' }); // 设置字体颜色
      pObj.addText('性别');
      pObj.addText('', { color: '00ffff', back: '000088' });
      pObj.addText('年龄');
      pObj.addText('岁', { color: '000088' });

      var pObj = docx.createP();
      pObj.addText('门诊（住院）号');
      pObj.addText(' with color', { color: '000088' });
      pObj.addText('诊断');
      pObj.addText('', { color: '000088' });

      var pObj = docx.createP();
      pObj.addText(
        '一、血液透析（滤过）能有效清除身体内过多的水分合霉素，是治疗急性和慢性肾衰竭等疾病的有效方法。'
      );
      var pObj = docx.createP();
      pObj.addText(
        '二、血液透析（滤过）治疗时，首先需要将患者血液引到体外，然后通过透析或滤过等方法清除水分和霉素，经受理后的血液再回到患者体外。'
      );
      var pObj = docx.createP();
      pObj.addText(
        '三、为了有效引出血液，治疗前需要建立血管通路（动静脉内痿或深静脉插管）。'
      );
      var pObj = docx.createP();
      pObj.addText(
        '四、为防止血液在体外管路和透析器发生凝固，一般需要在透析前和透析过程中注射肝素等抗凝药物。'
      );
      var pObj = docx.createP();
      pObj.addText(
        '五、血透过程中和治疗期间存在下列医疗风险，可能造成严重后果，甚至危及生命：'
      );
      var pObj = docx.createP();
      pObj.addText('1.低血压，心力衰竭，心肌梗塞，心律失常，脑血管意外；');
      var pObj = docx.createP();
      pObj.addText('2.空气球栓塞；');
      var pObj = docx.createP();
      pObj.addText('3.过敏反应；');
  }

  // 生成Excel文件模版
  ExcelTemplate(xlsx) {
    var sheet = xlsx.makeNewSheet()
    sheet.name = 'Excel Test'

    // The direct option - two-dimensional array:
    sheet.data[0] = []
    sheet.data[0][0] = 'URL';
    sheet.data[0][1] = '描述';
    sheet.data[0][2] = '请求方式';
    sheet.data[0][3] = 'etx';
    sheet.data[1] = []
    sheet.data[1][0] = '/api/createExcelFile';
    sheet.data[1][1] = '接口方式请求生成Excel文件';
    sheet.data[1][2] = 'POST';
    sheet.data[1][3] = '.xlsx';

    // Using setCell:
    // sheet.setCell('E7', 340)
    // sheet.setCell('I1', -3)
    // sheet.setCell('I2', 31.12)
    // sheet.setCell('G102', 'Hello World!')
  }

  // 生成word文件
  CreateWordFile() {
    const docx = officegen('docx');
    this.app.post('/api/createWordFile', (req, res, next) => {
      // 生成word文件的内容
      this.DocxTemplate(docx);

      // 设置请求头
      res.writeHead(200, {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8',
        'Content-disposition': 'attachment filename=out.docx'
      });

      // 输出给客户端
      docx.generate(res);

      // 清空之前生成的内容，防止生成的word文件内容多次重复
      docx.data = [];
    });
  }

  // 生成 Excel 文档
  CreatedExcelFile() {
    const xlsx = officegen('xlsx');
    this.app.post('/api/createExcelFile', (req, res, next) => {
      this.ExcelTemplate(xlsx);

      // 设置请求头
      res.writeHead(200, {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
        'Content-disposition': 'attachment filename=out.xlsx'
      });

      // 输出给客户端
      xlsx.generate(res);

      xlsx.data = [];
    })
  }

  CreatePdfFile() {
    this.app.post('/api/sendFile', (req, res, next) => {
      res.sendFile(path.join(__dirname, '../../test.pdf'), function () {
        console.log('删除该文件');
      })
    })
  }
  
  Start() {
    this.CreateWordFile();
    this.CreatedExcelFile();
    this.CreatePdfFile();
  }
}

const loadFiles = new LOADFILES();
loadFiles.Start();
