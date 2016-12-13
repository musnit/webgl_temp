module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            },
            { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
            { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ },
            { test: /\.json$/, loader: 'json', exclude: /node_modules/ }
        ]
    }
};
