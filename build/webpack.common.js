const path    = require('path');
const webpack = require('webpack');

const root       = path.resolve(`${ __dirname }/..`);
const srcRoot    = `${ root }/src`;
const libRoot    = `${ root }/lib`;
const production = (process.env.NODE_ENV === 'production');

module.exports = {
    entry:   `${ srcRoot }/index.ts`,
    output:  {
        path:          `${ root }/dist`,
        filename:      'index.js',
        library:       'Sig',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module:  {
        rules: [{
            enforce: 'pre',
            test:    /\.ts$/,
            include: [srcRoot, libRoot],
            use:     [{
                loader:  'eslint-loader',
                options: {
                    failOnWarning: production
                }
            }]
        }, {
            test:    /\.ts$/,
            include: [srcRoot, libRoot],
            use:     [
                {
                    loader:  'babel-loader',
                    options: {
                        compact: false,
                        presets: [
                            '@babel/preset-typescript',
                            ['@babel/preset-env', {
                                targets: {
                                    chrome:  '73',
                                    ie:      '11',
                                    firefox: '66',
                                    safari:  '12'
                                }
                            }]
                        ]
                    }
                }
            ]
        }]
    },
    plugins: [
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/wordlists\//,
            contextRegExp:  /\/node_modules\/bip39\/src$/
        })
    ]
};
