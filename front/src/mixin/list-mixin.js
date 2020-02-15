const LISTMINXIN = {
  data () {
    return {
      size: 20,
      page: 1
    };
  },
  methods: {
    handleSizeChange (val) {
      this.size = val;
      this.GETLIST();
    },
    handleCurrentChange (val) {
      this.page = val;
      this.GETLIST();
    }
  }
};

export default LISTMINXIN;
