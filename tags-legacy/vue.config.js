const fs = require('fs')

const publicUrl = process.env.PUBLIC_URL

if (typeof publicUrl === 'undefined') {
  console.warn(
    'WARNING',
    `To enable Hot Module Replacement (HMR), please specify the environmental variable PUBLIC_URL in .env.local.
     You can use a local HTTPS proxy server or a secure tunnel, for example ngrok.`,
  )
}
const useLocalSslProxy = publicUrl?.startsWith('https://localhost')

module.exports = {
  configureWebpack: {
    output: {
      filename: 'export.js',
    },
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'reports/bundle-size.html',
      }),
    ],
  },
  filenameHashing: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    extract: false,
  },
  devServer: {
    // Using a local https server
    https: useLocalSslProxy
      ? {
          key: fs.readFileSync('./certificates/localhost-key.pem'),
          cert: fs.readFileSync('./certificates/localhost.pem'),
        }
      : undefined,

    // Using secure tunnel
    public: publicUrl,
    disableHostCheck: true,
  },
}
