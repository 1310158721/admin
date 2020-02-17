<template>
  <div id='routes-search' class="route-search-wrapper">
    <i class="iconfont icon-sousuo icon" @click.self="showSearchInput"></i>
    <transition name='selector'>
      <el-select
      size='small'
      v-if="isShowInput"
      v-model="value"
      ref="search"
      filterable
      placeholder="Search"
      @change='selectChange'
      @blur="selectBlur"
    >
      <el-option
        size='small'
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled='item.value === $route.path'
      >
      </el-option>
    </el-select>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'RouteSearch',
  components: {},
  props: {},
  data () {
    return {
      isShowInput: false,
      searchword: '',
      options: [],
      value: '',
      list: null
    };
  },
  computed: {},
  methods: {
    showSearchInput () {
      if (!this.isShowInput) {
        this.value = '';
        this.isShowInput = true;
        this.$nextTick(() => {
          this.$refs.search.focus();
        });
      }
    },
    loop (list, parentTitle = '') {
      list.map(i => {
        i.title = (parentTitle ? parentTitle + ' -> ' : '') + this.$t('menuList.' + i.title);
        if (i.children && i.children.length) {
          this.loop(i.children, i.title);
        }
      });
    },
    getRoutes (list) {
      list.map(i => {
        if (i.children && i.children.length) {
          this.getRoutes(i.children);
        } else {
          this.options.push({ label: i.title, value: i.path });
        }
      });
    },
    selectChange (val) {
      this.isShowInput = false;
      this.$router.push({
        path: val
      });
    },
    formatData () {
      let list = JSON.parse(JSON.stringify(this.$store.state.menuList));
      this.loop(list);
      this.getRoutes(list);
    },
    selectBlur () {
      // 缓冲时间
      setTimeout(() => {
        this.isShowInput = false;
      }, 100);
    }
  },
  created () {
    this.formatData();
  },
  mounted () {},
  watch: {
    '$i18n.locale' () {
      this.options = [];
      this.formatData();
    }
  }
};
</script>

<style lang="scss" scoped>
.selector-enter-active {
  animation: selector .1s;
}
.selector-leave-active {
  animation: selector .1s reverse;
}
@keyframes selector {
  0% {
    width: 0px;
  }
  100% {
    width: 170px;
  }
}

.route-search-wrapper {
  height: 32px;
  line-height: 32px;
  margin: 10px 0;
  .icon {
    font-size: 32px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    color: rgba(0, 0, 0, 0.65);
    &:hover {
      color: #409EFF;
    }
  }
  /deep/.el-select {
    width: 170px;
    height: 32px;
    background: lightgreen;
    border-bottom: 1px solid #d9d9d9;
    .el-input__inner {
      border: 0;
      outline: none;
      border-radius: 0;
    }
    .el-input__suffix {
      display: none;
    }
  }
}
</style>
