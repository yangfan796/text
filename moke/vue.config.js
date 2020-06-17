const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  publicPath: "./",
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: ["./src/styles/variable.scss"]
        })
        .end();
    });
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            // 配置使用 autoprefixer
            overrideBrowserslist: ["last 15 versions"]
          }),
          require("postcss-pxtorem")({
            rootValue: 75, // 换算的基数
            // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
            //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
            selectorBlackList: ["ig"],
            propList: ["*"],
            exclude: /node_modules/
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://www.fastmock.site/mock/381f2f34a1e6979e6390855ed86653ff/yangfan",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/api": ""
        }
      },
    }
  }
};