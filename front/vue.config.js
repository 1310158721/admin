module.exports = {
  // 代码编译时错误提示
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 避免生产环境会有 .map 结尾的文件生成，造成体积过大
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // 存放静态文件目录
  assetsDir: 'static',
  // 多页面设置
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Admin',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  // 接口代理设置
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
