<!-- 边筛选边过滤 -->
<template>
  <div class="select-and-filter-wrapper">
    <span>
      <div style="width: 300px;">
        <el-button
          type="primary"
          size="small"
          style="margin-bottom: 10px;"
          @click="handleAdd"
          >add</el-button
        >
        <template v-for="(i, index) in dataList">
          <el-input
            style="margin-bottom: 10px;"
            :key="index"
            size="small"
            placeholder="请输入内容"
            v-model="i.value"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-remove-outline"
              @click="handleDel(index)"
            />
            <el-select
              style="width: 100px;"
              size="small"
              v-model="i.id"
              slot="prepend"
              placeholder="请选择"
            >
              <template v-for="item in myEnum">
                <!-- 使用 v-show, 使用 v-if 不能显示出已选的 title -->
                <el-option
                  size="small"
                  :key="item.id"
                  v-show="!isSelect.includes(item.id)"
                  :label="item.category"
                  :value="item.id"
                />
              </template>
            </el-select>
          </el-input>
        </template>
      </div>
    </span>
    <span v-if="this.content" v-highlight v-html="content"></span>
  </div>
</template>

<script>
export default {
  name: 'SelectAndFilter',
  components: {},
  props: {},
  data () {
    return {
      content: null,
      myEnum: [
        { id: '1', category: '网络费' },
        { id: '2', category: '保洁费' },
        { id: '3', category: '服务费' },
        { id: '4', category: '管理费' },
        { id: '5', category: '物业费' },
        { id: '6', category: '维修费' },
        { id: '7', category: '违约费' },
        { id: '8', category: '赔偿费' },
        { id: '9', category: '其他' }
      ],
      dataList: [{ id: '1', value: '123' }]
    };
  },
  computed: {
    /* 已选item的ID数组 */
    isSelect () {
      return this.dataList.map(i => i.id);
    }
  },
  methods: {
    /* 添加 */
    handleAdd () {
      if (this.dataList.length === this.myEnum.length) return false;
      this.dataList.push({ id: '', value: '' });
    },
    /* 删除 */
    handleDel (i) {
      this.dataList.splice(i, 1);
    }
  },
  created () {
    this.content = window.sessionStorage.getItem('demoContent');
  }
};
</script>

<style lang="scss" scoped>
.select-and-filter-wrapper {
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
</style>
