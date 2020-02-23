module.exports = {
  lintOnSave: false,
  // 避免生产环境会有 .map 结尾的文件生成，造成体积过大
  productionSourceMap: false,
  // 存放静态文件目录
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:10000/api',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
