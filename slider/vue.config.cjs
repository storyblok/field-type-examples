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

module.exports = {
    pages,
    configureWebpack: {
        entry: entry,
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
        // Using secure tunnel
        public: publicUrl,
        disableHostCheck: true,
    },
}