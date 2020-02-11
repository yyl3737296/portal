/* eslint-disable no-sync */
import clear from 'rollup-plugin-clear'
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { eslint } from 'rollup-plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import visualizer from 'rollup-plugin-visualizer';

const fs = require('fs')
const path = require('path')

// import replace from '@rollup/plugin-replace'

const NODE_ENV = process.env.NODE_ENV;
const IS_PROD = NODE_ENV === 'production'
const IS_WATCH = process.env.ROLLUP_WATCH === 'true'

const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'));
const parentPkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '../../package.json'), 'utf-8'));
const peerDependencies = Object.keys(pkg.peerDependencies || {}).concat(Object.keys(parentPkg.peerDependencies || {}))

const getShortName = (libraryName) => libraryName.toLowerCase().split('.').pop()
const isBroswerBundle = (format) => ['umd', 'iife'].includes(format.toLowerCase())

const createOutputs = (setting) => {
    return setting.output.reduce((array, format) => {
        array.push({
            exports: 'named',
            name: setting.libraryName,
            file: `dist/${getShortName(setting.libraryName)}.${format}.js`,
            format,
            broswerBundle: isBroswerBundle(format),
            globals: setting.globals
        });

        if (IS_PROD === true) {
            array.push({
                exports: 'named',
                name: setting.libraryName,
                file: `dist/${getShortName(setting.libraryName)}.${format}.min.js`,
                format,
                broswerBundle: isBroswerBundle(format),
                globals: setting.globals,
                sourcemap: true,
                minify: true
            });
        }

        return array;
    }, []);
}

const generateConfig = (setting) => {

    const outputs = createOutputs(setting)

    return outputs.map((output, i) => {

        return {
            // external,
            input: setting.input,
            output,
            /*
             * name: 'my-library',
             * 是否开启代码分割
             * experimentalCodeSplitting: true,
             */
            plugins: [
                !IS_WATCH && clear({
                    // required, point out which directories should be clear.
                    targets: ['./dist', './build'],
                    // optional, whether clear the directores when rollup recompile on --watch mode.
                    watch: false // default: false
                }),
                eslint({
                    include: ['src/**/*.js', 'src/**/*.jsx'], // 需要检查的部分
                    useEslintrc: true
                }),
                json(),

                /*
                 * replace({
                 *   include: 'src/maths.js', // 指定可以使用变量的文件路径
                 *   exclude: 'node_modules/**',
                 *   ENV: JSON.stringify(NODE_ENV || 'development'), //在 src/maths.js文件中即可使用 ENV HOST
                 *   HOST: JSON.stringify('http://111/111')
                 * }),
                 */
                postcss({
                    extensions: ['.sass', '.scss', '.less', '.css'],
                    extract: `dist/${getShortName(setting.libraryName)}.min.css`, // 输出路径
                    plugins: [autoprefixer, cssnano]
                }),
                resolve({
                    browser: true,
                    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.sass', '.scss', '.less', '.css'],
                    mainFields: [`module`, `main`]
                }),
                commonjs({
                    include: /\/node_modules\//
                }),
                babel({
                    exclude: /\/node_modules\//,
                    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
                    rootMode: "upward",
                    runtimeHelpers: false

                }),
                (output.minify === true && terser({
                    include: [/^.+\.min\.js$/]
                })),
                (IS_PROD === false && visualizer({ filename: './dist/stats.html', title: pkg.name }))
            ],
            external: id => {
                if (output.broswerBundle === true) {
                    return Object.keys(setting.globals || {}).includes(id)
                }

                return peerDependencies.includes(id)
            },
            preserveSymlinks: false,
            watch: {}
        }
    })
}

export default generateConfig
