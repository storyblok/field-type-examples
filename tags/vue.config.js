module.exports = {
    configureWebpack: {
        output: {
            filename: 'export.js'
        },
        optimization: {
            splitChunks: false
        },
    },
    filenameHashing: false,
    runtimeCompiler: true,
    productionSourceMap: false,
    css: {
        extract: false
    }
}