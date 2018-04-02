module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js'
    },
    watch: true,
    devServer: {
        inline:true,
        port: 10000
    }
};
