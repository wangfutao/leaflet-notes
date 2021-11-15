module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(vert|frag|glsl|md)$/,
                    use: 'raw-loader'
                },
            ]
        }
    }
}
