const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { override, removeModuleScopePlugin, addWebpackPlugin, addWebpackResolve, addWebpackExternals } = require("customize-cra");
const path = require('path')
console.log(path.resolve(__dirname, "../../node_modules/"))
module.exports = override(
    // enable legacy decorators babel plugin
    removeModuleScopePlugin(),
    process.env.NODE_ENV !== 'production' && addWebpackPlugin(new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: './stats.html', openAnalyzer: false })),
    addWebpackResolve({
        modules: [path.resolve(__dirname, "../../node_modules/")]
    }),

    addWebpackExternals({
        // "react": "React",
        // "react-dom": "ReactDom",
        // "axios": "axios"
    })
);
