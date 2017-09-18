module.exports = {
    entry: "./src/main.tsx",

    output: {
        filename: "bundle.js",
        path: __dirname + "/wwwroot",
    },

    resolve: {
        extensions: [".tsx", ".js"]
    },

    module: {
        loaders: [
          {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              loaders: ["ts-loader"]
          }
        ]
    }
};