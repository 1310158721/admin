import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList: null, // 权限菜单
    userInfo: null,
    isFixedSystemHeader: true,
    isShowSystemTabView: true,
    isFixedSystemAside: false,
    isShowSystemLogo: false,
    isOpenMultilingual: true,
    layoutConfigDrawer: false
  },
  mutations: {
    SETMENULIST (state, list) {
      state.menuList = list;
    },
    // 重置 vuex 中的 layoutConfigDrawer(系统布局抽屉)
    SETLAYOUTCONFIGDRAWER (state, boolean) {
      state.layoutConfigDrawer = boolean;
    },
    SETUSERINFOS (state, data) {
      state.userInfo = data;
    }
  },
  actions: {},
  modules: {}
});
