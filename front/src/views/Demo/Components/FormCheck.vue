<template>
  <div class="form_wapper">
    <span>
      <el-card class="box-card">
      <el-form
        :model="form"
        :inline="true"
        size="mini"
        :rules='rules'
      >
        <template v-for="(item,index) in form.renterList">
          <el-form-item
            :ref="index+'idCard'"
            :prop="'renterList.' + index +'.idCard'"
            :rules="item.rules"
            :key='item.id'
          >
            <el-input v-model="item.idCard" @input='inputRenterIdCard(item.idType, index)'>
              <el-select
                slot="prepend"
                :ref="index+'idType'"
                v-model="item.idType"
                @change="changeRenterIdType(item.idType,index)"
              >
                <template v-for="ways in idCardEnum">
                  <el-option
                    :key="ways.value"
                    :label="ways.label"
                    :value="ways.value"
                  ></el-option>
                </template>
              </el-select>
            </el-input>
          </el-form-item>
        </template>
      </el-form>
    </el-card>
    </span>
    <span v-if='this.content' v-highlight v-html='content'></span>
  </div>
</template>

<script>
/* 重复的校验规则:必填 */
const baseRule = [
  { required: true, message: '证件号不能为空' }
];

export default {
  name: 'FormCheck',
  data () {
    return {
      content: null,
      rules: {},
      form: {
        renterList: [{
          idType: 'IDCARD', // 联系方式：电话/手机
          idCard: '441521199207232222', // 具体的联系方式的值
          rules: baseRule// 基础校验规则:必填
        }]

      },
      inputRules: {
        IDCARD: { pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/, message: '身份证格式错误' },
        PASSPORT: { pattern: /^[a-zA-Z0-9]{5,17}$/, message: '护照格式错误' },
        HONG_KONG_AND_MACAO_PASS: { pattern: /^[a-zA-Z0-9]{6,10}$/, message: '港澳通行证格式错误' },
        TAIWAN_COMPATRIOTS_CERTIFICATES: { pattern: /^([0-9]{8}|[0-9]{10})$/, message: '台胞证格式错误' }
      },
      idCardEnum: [
        { label: '身份证', value: 'IDCARD' },
        { label: '护照', value: 'PASSPORT' },
        { label: '港澳通行证', value: 'HONG_KONG_AND_MACAO_PASS' },
        { label: '台胞证', value: 'TAIWAN_COMPATRIOTS_CERTIFICATES' }
      ]
    };
  },
  methods: {
    changeRenterIdType (data, index) {
      /* 将值清空 */
      this.form.renterList[index].idCard = '';
      /* 给表单加上新的校验 */
      this.form.renterList[index].rules = [this.inputRules[data]].concat(baseRule);
    },
    inputRenterIdCard (data, index) {
      this.form.renterList[index].rules = [this.inputRules[data]].concat(baseRule);
    }
  },
  created () {
    this.content = window.sessionStorage.getItem('demoContent');
  }
};
</script>

<style lang='scss' scope>
.form_wapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  & > span {
    flex: 1;
    height: 100%;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
  }
}
.new_btn {
  margin-bottom: 20px;
}
.el-input-group__append, .el-input-group__prepend {
  width: 80px!important;
}
</style>
