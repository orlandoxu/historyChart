const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    // vendor: ['katex', 'mermaid'],
    // 定义了入口点叫做main
    // 这样打包出来就叫做main.js入口
    main: ['./js/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // clean: true
  },
  devServer: {
    hot: false
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  })],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        // presets: ['@babel/preset-react'],
        plugins: [['@babel/plugin-transform-react-jsx', {
          pragma: 'makeElement',
          pragmaFrag: 'makeFrag'
        }]]

        // plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-syntax-jsx']
        // presets: [['@babel/preset-env', {modules: false, loose: true}], '@babel/preset-react'],
        // plugins: ['@babel/plugin-transform-async-to-generator', '@babel/plugin-transform-runtime', '@babel/plugin-transform-arrow-functions', '@babel/plugin-transform-modules-commonjs']
      }
    }]
  },
  // output: {
  //
  // },
  // 无需加minimize，production是默认开启的
  // 用的Uglify，会做tree-shaking
  // optimization: { minimize: true, splitChunks: { cacheGroups: { katex: { name: 'katex', filename: '[name].js', minChunks: 1, chunks: 'all' }, } } },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx'],   // 如果import的不带后缀，那就先找.js，然后.jsx
    mainFields: [   // 没找到干啥的～～
      'webpack',
      'browser',
      'web',
      'browserify',
      ['jam', 'main'],
      'main'
    ],
    // alias: {
    //   lib: path.join(__dirname, 'lib'),
    //   render: path.join(__dirname, 'render'),
    //   res: path.join(__dirname, 'resources')
    // }
  },
  // externals: [
  //   'electron',
  // ],
}
