const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },

        configure: (webpackConfig) => {
            let cdn = {
                js: []
            }
            // 当前是否是生产环境，只有生产环境才需要 CDN
            whenProd(() => {
                // key: 不参与打包的包(由dependencies依赖项中的key决定)
                // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
                webpackConfig.externals = {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
                // 配置现成的cdn资源地址
                // 实际开发的时候 用公司自己花钱买的cdn服务器
                cdn = {
                    js: [
                        'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
                    ]
                }
            })

            // 通过 htmlWebpackPlugin 插件 在 public/index.html 注入 cdn 资源 url
            const { isFound, match } = getPlugin(
                webpackConfig,
                pluginByName('HtmlWebpackPlugin')
            )

            if (isFound) {
                // 找到了 HtmlWebpackPlugin 的插件
                match.options.files = cdn
            }

            return webpackConfig
        }

    }
}