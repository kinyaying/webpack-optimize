const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const path = require('path')
const glob = require('glob')
const PATHS = {
  src: path.join(__dirname, './src'),
}
module.exports = smp.wrap({
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
  },
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,

    minimizer: [
      // new TerserPlugin({
      //   cache: true,
      //   // parallel: 1, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
      // }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
    ],
    // splitChunks: {
    //   chunks: 'all', //默认作用于异步chunk，值为all/initial/async
    //   minSize: 0, //默认值是30kb,代码块的最小尺寸
    //   minChunks: 1, //被多少模块共享,在分割之前模块的被引用次数
    //   maxAsyncRequests: 3, //限制异步模块内部的并行最大请求数的，说白了你可以理解为是每个import()它里面的最大并行请求数量
    //   maxInitialRequests: 5, //限制入口的拆分数量
    //   name: false, //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
    //   automaticNameDelimiter: '~', //默认webpack将会使用入口名和代码块的名称生成命名,比如 'vendors~main.js'
    //   cacheGroups: {
    //     vendor: {
    //       //第三方依赖
    //       priority: 1, //设置优先级，首先抽离第三方模块
    //       name: 'vendor',
    //       test: /node_modules/,
    //       chunks: 'initial',
    //       minSize: 0,
    //       minChunks: 1, //最少引入了1次
    //     },
    //     //缓存组
    //     common: {
    //       //公共模块
    //       chunks: 'initial',
    //       name: 'common',
    //       minSize: 100, //大小超过100个字节
    //       minChunks: 2, //最少引入了3次
    //     },

    //     // //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
    //     // vendors: {
    //     //   name: 'vendor',
    //     //   chunks: 'all',
    //     //   test: /node_modules/, //条件
    //     //   priority: -10, ///优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中,为了能够让自定义缓存组有更高的优先级(默认0),默认缓存组的priority属性为负值.
    //     // },
    //     default: {
    //       chunks: 'all',
    //       minSize: 0, //最小提取字节数
    //       minChunks: 2, //最少被几个chunk引用
    //       priority: -20,
    //       reuseExistingChunk: false,
    //     },
    //   },
    // },
  },
  resolve: {
    alias: {
      react: path.resolve(
        __dirname,
        './node_modules/react/umd/react.production.min.js'
      ),
      'react-dom': path.resolve(
        __dirname,
        './node_modules/react-dom/umd/react-dom.production.min.js'
      ),
      moment: path.resolve(__dirname, './node_modules/moment/dist/moment.js'),
    },
    modules: [
      path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3, // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // 压缩 jpeg 的配置
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // 使用 imagemin**-optipng 压缩 png，enable: false 为关闭
              optipng: {
                enabled: false,
              },
              // 使用 imagemin-pngquant 压缩 png
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              // 压缩 gif 的配置
              gifsicle: {
                interlaced: false,
              },
              // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new HardSourceWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 8090, // 指定端口号
      openAnalyzer: false,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ],
})
