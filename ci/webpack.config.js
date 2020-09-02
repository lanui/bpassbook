const webpack = require('webpack');
const ejs = require('ejs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');
const { VueLoaderPlugin } = require('vue-loader');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const env = require('../config/wrapper.env')
const { context, dist, src, manifest, R } = require('../config/paths')

const isProd = () => env.NODE_ENV === 'production'

const config = {
  mode: env.NODE_ENV,
  context: context,
  entry: {
    'background': R(src, './background.js'),
    'popup/popup': R(src, './popup/popup.js'),
    'options/options': R(src, './options/options.js'),
    'app/app':R(src,'./app/app.js')
  },
  output: {
    path: dist,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@':src,
      '@app':R(src,'app'),
      '@popup': R(src,'popup'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader','css-loader',
          {
            loader: 'sass-loader',
            options:{
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
                indentedSyntax: true
              },
              // prependData: "@import '@/styles/variables.scss'"
              additionalData: "@import '@/styles/variables.scss'"
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader','css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require("sass"),
            sassOptions: {
              fiber: require("fibers"),
              indentedSyntax: true
            },
            additionalData: "@import '@/styles/variables.scss';"
          }
        }
        ],
      },
      // {
      //   test: /\.sass$/,
      //   use: [
      //     MiniCssExtractPlugin.loader, 'css-loader',
      //     {
      //       loader:'sass-loader',
      //       options: {
      //         implementation: require("sass"),
      //         sassOptions: {
      //           fiber: require("fibers"),
      //           indentedSyntax: true
      //         },
      //         prependData: "@import '@/styles/variables.scss'"
      //       }
      //     }
      //   ],
      // },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: '/images/',
          emitFile: true,
          esModule: false,
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: '/fonts/',
          emitFile: true,
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      global: 'window',
    }),
    webpack.IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\/src$/),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new CopyPlugin({
      patterns: [
        { from: R(src, 'icons'), to: R(dist, 'icons'), globOptions: { ignore: ['**/icon.xcf'] } },
        { from: R(src, 'app/app.html'), to: R(dist, 'app/app.html'), transform: transformHtml },
        { from: R(src, 'popup/popup.html'), to: R(dist, 'popup/popup.html'), transform: transformHtml },
        { from: R(src, 'options/options.html'), to: (dist, 'options/options.html'), transform: transformHtml },
        {
          from: manifest,
          to: R(dist, 'manifest.json'),
          transform: (content) => {
            const jsonContent = JSON.parse(content);
            jsonContent.name = env.APP_NAME
            jsonContent.version = env.APP_VERSION;

            if (jsonContent.browser_action) {
              jsonContent.browser_action["default_title"] = env.APP_NAME
            }

            if (!isProd) {
              jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
            }

            return JSON.stringify(jsonContent, null, 2);
          },
        },
      ]
    }),
    new VuetifyLoaderPlugin({
      match(originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith('core-')) {
          return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
        }
      }
    })
  ],
};

if (config.mode === 'production') {
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ]);
}else {
  config.devtool ="cheap-module-source-map"
}

if (process.env.HMR === 'true') {
  config.plugins = (config.plugins || []).concat([
    new ExtensionReloader({
      manifest: manifest,
    }),
  ]);
}

function transformHtml(content) {
  return ejs.render(content.toString(), Object.assign({}, { ...process.env }, env));
}

module.exports = config;
