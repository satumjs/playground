const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    port: 3001,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  }
})
