import generateConfig from '../../config/rollup.lib.config';

const setting = {
    libraryName: "NetBrain.Component",
    input: "src/index.jsx",
    output: ['esm', 'umd'],
    globals: {
        'prop-types': 'PropTypes',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'axios': 'axios'
    }
}
const config = generateConfig(setting)

export default config
