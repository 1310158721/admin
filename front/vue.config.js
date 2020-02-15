module.exports = {
  lintOnSave: false,
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
