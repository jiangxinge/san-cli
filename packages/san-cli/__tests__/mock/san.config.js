/**
 * @file san config file mock
 */

const path = require('path');
const outputDir = 'output';

module.exports = {
    outputDir,
    // baseUrl: '/',
    // 不复制 publicDir
    copyPublicDir: false,
    // output 路径
    // 这个是 template在 output 的路径
    templateDir: 'template',
    // 下面是 loader 配置，可以配置 babel 和 postcss 插件等
    loaderOptions: {},
    // 这是多页面配置
    pages: {
        index: {
            entry: './src/pages/index/index.js',
            template: './pages.template.ejs',
            filename: 'index/index.html'
        }
    },
    // enableMatrix: false,
    /**
     * 支持的全部标识，可以按需添加
     * main：百度App主版
     * lite：百度App lite版
     * kdd：看多多
     * other：非以上
     * **/
    // matrixEnvList: ['main', 'lite', 'kdd', 'other'],
    // dev-server 配置
    devServer: {
        contentBase: outputDir,
        // 如果是 contentBase = outputDir 谨慎watchContentBase打开，打开后 template 每次文件都会重写，从而导致 hmr 失效，每次都 reload 页面
        port: 9003
    },
    // dev-server 中间件
    devServerMiddlewares: [
        ()=>{}
    ],
    // 生产环境配置，内部配置跟config 一级配置一样，会覆盖默认的一级同名配置
    build: {
        // 推荐使用 s.bdstatic.com CDN域名
        baseUrl: 'https://gss0.bdstatic.com/5bd1bjqh_Q23odCf/',
        assetsDir: 'static/estar',
        templateDir: 'template/webpage/estar'
    },
    chainWebpack: config => {
        // 这里可以用来扩展 webpack 的配置，使用的是 webpack-chain 语法
        config.resolve.alias
            .set('@', resolve('src'))
    },
    // 是否生成 sourcemap，目前不需要
    sourceMap: false
};