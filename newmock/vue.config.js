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
                    require("postcss-px-to-viewport")({
                        unitToConvert: "px",
                        viewportWidth: 750,
                        // viewportHeight: 1334,
                        unitPrecision: 3,
                        propList: [
                            "*"
                        ],
                        viewportUnit: "vw",
                        fontViewportUnit: "vw",
                        selectorBlackList: [".ignore",".hairlines"],
                        minPixelValue: 1,
                        mediaQuery: false,
                        replace: true,
                        exclude: /(\/|\\)(node_modules)(\/|\\)/,
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