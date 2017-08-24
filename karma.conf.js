var webpackConfig = require("./webpack.config.js");

module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: [
            "jasmine"
        ],
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-webpack")
        ],

        files: [
            "spec-finder.js"
        ],

        preprocessors: {
            "spec-finder.js": ["webpack"]
        },

        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },

        webpackMiddleware: {
            noInfo: true
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [
            "ChromeHeadless"
        ],
        singleRun: true
    })
}