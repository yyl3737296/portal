module.exports = {

    babelrcRoots: [
        '.',
        './packages/*'
    ],
    env: {
        "test": {
            "presets": [
                ["@babel/preset-env"], "@babel/preset-react"
            ]
        }
    },
    plugins: [
        // ['@babel/plugin-transform-runtime', { corejs: 3, helpers: true, "useESModules": false }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
        /*
         * ["import", {
         *   "libraryName": "antd",
         *   "libraryDirectory": "es",
         *   "style": true
         * }]
         */
    ],
    presets: [
        ["@babel/preset-env", {
            // "corejs": "3.6.1",
            // "debug": true,
            "modules": false,
            "targets": {
                // https://browserl.ist
                "browsers": [
                    "chrome >= 51",
                    "firefox >= 57",
                    "safari >= 10",
                    "edge >= 18"
                ]
            },
            "useBuiltIns": false
        }],

        "@babel/preset-react"
    ]
    // include: /node_modules\/\@netbrain/
}
