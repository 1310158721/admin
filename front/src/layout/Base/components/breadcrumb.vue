<template>
  <div class="my-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name='breadcrumb'>
        <template>
          <el-breadcrumb-item v-for='(i, index) in breadcrumb' :key='index'>
            <a @click.prevent='handleLink(i)' :class='{"is-link": i.path}'>{{ i.title }}</a>
          </el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'MyBreadcrumb',
  components: {},
  props: {},
  data () {
    return {
      breadcrumb: []
    };
  },
  computed: {},
  methods: {
    // 获取面包屑数据
    getBreadcrumbData () {
      const matched = this.$route.matched;
      const breadcrumbList = matched.filter((i) => i.meta && !i.meta.isLayout)
        .map((i, index, array) => ({
          path: index !== array.length - 1 ? ((i.meta && i.meta.redirect) || i.path) : '',
          title: i.meta && i.meta.title 
        }));
      if (!breadcrumbList.filter((i) => i.title === 'Dashboard').length) {
        breadcrumbList.unshift({
          path: '/Dashboard',
          title: 'Dashboard'
        });
      }
      this.breadcrumb = breadcrumbList;
    },
    // 面包屑 item 点击事件
    handleLink (item) {
      if (!item.path || item.path === this.$route.path) {
        return false;
      }
      this.$router.push({ path: item.path });
    }
  },
  created () {
    this.getBreadcrumbData();
  },
  watch: {
    '$route' () {
      this.getBreadcrumbData();
    }
  }
};
</script>

<style lang="scss" scoped> 
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .1s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .1s;
}

.breadcrumb-leave-active {
  position: absolute;
}

.my-breadcrumb {
  .el-breadcrumb {
    line-height: 50px;
    /deep/.el-breadcrumb__inner a {
      color: #97a8be;
      &.is-link {
        color: #303133;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
