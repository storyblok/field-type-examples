const fs = require('fs')
const path = require('path');

const entriesDir = './src/entries'
const entry = fs
  .readdirSync(entriesDir)
  .reduce(
    (entry, filename) => {
        const name = path.basename(filename, '.ts')
        entry[name] = `${entriesDir}/${filename}`
        return entry
    },
    {}
  )

const pages = process.env.NODE_ENV === 'production' ? (
  entry
) : undefined

const publicUrl = 'http://localhost:8080'

if (typeof publicUrl === 'undefined') {
    console.warn('WARNING',
      `To enable Hot Module Replacement (HMR), please specify the environmental variable PUBLIC_URL in .env.local.
     You can use a local HTTPS proxy server or a secure tunnel, for example ngrok.`
    )
}
const useLocalSslProxy = publicUrl?.startsWith('https://localhost')

module.exports = {
    pages,
    configureWebpack: {
        entry: entry,
        // output: {
        //     path: __dirname + './features/communityDirectory',
        //     publicPath: '/',
        //     filename: 'bundle.[name].js'
        // },
        output: {
            filename: '[name].js'
        },
        optimization: {
            splitChunks: false
        },
        plugins: [
            new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: 'reports/bundle-size.html'
            })
        ],
    },
    filenameHashing: false,
    runtimeCompiler: true,
    productionSourceMap: false,
    css: {
        extract: false
    },
    devServer: {
        // Using a local https server
        https: useLocalSslProxy ? {
            key: fs.readFileSync('./certificates/localhost-key.pem'),
            cert: fs.readFileSync('./certificates/localhost.pem'),
        } : undefined,

        // Using secure tunnel
        public: publicUrl,
        disableHostCheck: true,
    },
}