import generateConfig from '../../config/rollup.lib.config';

const setting = {
    libraryName: "NetBrain.Core",
    input: "src/index.js",
    output: ['esm', 'umd'],
    globals: {
        /*
         * 'prop-types': 'PropTypes',
         * 'axios': 'axios'
         */
    }
}
const config = generateConfig(setting)

export default config
