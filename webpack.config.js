const defaultsDeep = require('lodash.defaultsdeep');
const crypto = require('crypto');
const fs = require('fs');
var path = require('path');
var webpack = require('webpack');

// Plugins
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// PostCss
var autoprefixer = require('autoprefixer');
var postcssVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');

const createHash = crypto.createHash;
crypto.createHash = algorithm => createHash(algorithm === 'md4' ? 'sha256' : algorithm);

const loadDotEnv = () => {
    const envPath = path.resolve(__dirname, '.env');
    if (!fs.existsSync(envPath)) return;
    fs.readFileSync(envPath, 'utf8')
        .split(/\r?\n/)
        .forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            const separatorIndex = trimmed.indexOf('=');
            if (separatorIndex === -1) return;
            const key = trimmed.slice(0, separatorIndex).trim();
            const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
            if (key && typeof process.env[key] === 'undefined') {
                process.env[key] = value;
            }
        });
};

loadDotEnv();

const isTauriLightBuild = process.env.OPENBLOCK_TAURI_LIGHT === 'true';
const STATIC_PATH = process.env.STATIC_PATH || (isTauriLightBuild ? './static' : '/static');
const DOGOBLOCK_API_HOST = process.env.DOGOBLOCK_API_HOST || 'https://dogoblockapi.dogomaker.com';
const envDefinitions = {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.DEBUG': Boolean(process.env.DEBUG),
    'process.env.GA_ID': JSON.stringify(process.env.GA_ID || 'UA-000000-01'),
    'process.env.DOGOBLOCK_API_HOST': JSON.stringify(DOGOBLOCK_API_HOST),
    'process.env.OPENBLOCK_TAURI_LIGHT': JSON.stringify(process.env.OPENBLOCK_TAURI_LIGHT || 'false')
};
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
const workspaceRoot = path.resolve(__dirname, '..');
const localOpenBlockVMPath = process.env.OPENBLOCK_VM_PATH ?
    path.resolve(process.env.OPENBLOCK_VM_PATH) :
    path.resolve(__dirname, '..', 'openblock-vm');
const hasLocalOpenBlockVM = require('fs').existsSync(path.join(localOpenBlockVMPath, 'package.json'));
const openBlockVMPath = hasLocalOpenBlockVM ?
    localOpenBlockVMPath :
    path.resolve(__dirname, 'node_modules', 'openblock-vm');
const WATCH_IGNORED = [
    path.resolve(__dirname, 'build'),
    path.resolve(__dirname, 'dist'),
    path.resolve(__dirname, 'node_modules')
];

const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        port: process.env.PORT || 8601,
        watchOptions: {
            ignored: WATCH_IGNORED
        }
    },
    watchOptions: {
        ignored: WATCH_IGNORED
    },
    output: {
        library: 'GUI',
        filename: '[name].js',
        chunkFilename: 'chunks/[name].js',
        hashFunction: 'sha256'
    },
    resolve: {
        symlinks: false,
        alias: {
            ...(hasLocalOpenBlockVM ? {
                'openblock-vm': localOpenBlockVMPath
            } : {})
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src'),
                ...(hasLocalOpenBlockVM ? [path.join(localOpenBlockVMPath, 'src')] : []),
                /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                /node_modules[\\/]pify/,
                /node_modules[\\/]@vernier[\\/]godirect/
            ],
            options: {
                // Explicitly disable babelrc so we don't catch various config
                // in much lower dependencies.
                babelrc: false,
                plugins: [
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-transform-async-to-generator',
                    '@babel/plugin-proposal-object-rest-spread',
                    ['react-intl', {
                        messagesDir: './translations/messages/',
                        workspaceRoot
                    }]],
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        },
        {
            test: /\.css$/,
            exclude: MONACO_DIR,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    camelCase: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: function () {
                        return [
                            postcssImport,
                            postcssVars,
                            autoprefixer
                        ];
                    }
                }
            }]
        },
        {
            test: /\.css$/,
            include: MONACO_DIR,
            use: ['style-loader', 'css-loader']
        }]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/
            })
        ]
    },
    plugins: [
        new MonacoWebpackPlugin({
            languages: ['c', 'cpp', 'python', 'lua', 'javascript'],
            features: ['!gotoSymbol']
        })
    ]
};

if (!process.env.CI) {
    base.plugins.push(new webpack.ProgressPlugin());
}

module.exports = [
    // to run editor examples
    defaultsDeep({}, base, {
        entry: {
            'lib.min': ['react', 'react-dom'],
            'gui': './src/playground/index.jsx',
            'blocksonly': './src/playground/blocks-only.jsx',
            'compatibilitytesting': './src/playground/compatibility-testing.jsx',
            'player': './src/playground/player.jsx'
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js'
        },
        module: {
            rules: base.module.rules.concat([
                {
                    test: /\.(svg|png|wav|gif|jpg|ttf)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/assets/'
                    }
                }
            ])
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                name: 'lib.min'
            },
            runtimeChunk: {
                name: 'lib.min'
            }
        },
        plugins: base.plugins.concat([
            new webpack.DefinePlugin(envDefinitions),
            new HtmlWebpackPlugin({
                chunks: ['lib.min', 'gui'],
                template: 'src/playground/index.ejs',
                title: 'DoGoBlock',
                sentryConfig: process.env.SENTRY_CONFIG ? '"' + process.env.SENTRY_CONFIG + '"' : null
            }),
            new HtmlWebpackPlugin({
                chunks: ['lib.min', 'blocksonly'],
                template: 'src/playground/index.ejs',
                filename: 'blocks-only.html',
                title: 'DoGoBlock GUI: Blocks Only Example'
            }),
            new HtmlWebpackPlugin({
                chunks: ['lib.min', 'compatibilitytesting'],
                template: 'src/playground/index.ejs',
                filename: 'compatibility-testing.html',
                title: 'DoGoBlock GUI: Compatibility Testing'
            }),
            new HtmlWebpackPlugin({
                chunks: ['lib.min', 'player'],
                template: 'src/playground/index.ejs',
                filename: 'player.html',
                title: 'DoGoBlock GUI: Player Example'
            }),
            new CopyWebpackPlugin([{
                from: 'static',
                to: 'static'
            }]),
            new CopyWebpackPlugin([{
                from: 'node_modules/openblock-blocks/media',
                to: 'static/blocks-media'
            }]),
            new CopyWebpackPlugin([{
                from: 'extensions/**',
                to: 'static',
                context: 'src/examples'
            }]),
            new CopyWebpackPlugin([{
                from: 'extension-worker.{js,js.map}',
                context: path.join(openBlockVMPath, 'dist', 'web')
            }])
        ])
    })
].concat(
    process.env.NODE_ENV === 'production' || process.env.BUILD_MODE === 'dist' ? (
        // export as library
        defaultsDeep({}, base, {
            target: 'web',
            entry: {
                'openblock-gui': './src/index.js'
            },
            output: {
                libraryTarget: 'umd',
                path: path.resolve('dist'),
                publicPath: `${STATIC_PATH}/`
            },
            externals: {
                'react': 'react',
                'react-dom': 'react-dom'
            },
            module: {
                rules: base.module.rules.concat([
                    {
                        test: /\.(svg|png|wav|gif|jpg|ttf)$/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/assets/',
                            publicPath: `${STATIC_PATH}/assets/`
                        }
                    }
                ])
            },
            plugins: base.plugins.concat([
                new webpack.DefinePlugin(envDefinitions),
                new CopyWebpackPlugin([{
                    from: 'node_modules/openblock-blocks/media',
                    to: 'static/blocks-media'
                }]),
                new CopyWebpackPlugin([{
                    from: 'extension-worker.{js,js.map}',
                    context: path.join(openBlockVMPath, 'dist', 'web')
                }]),
                // Include library JSON files for scratch-desktop to use for downloading
                new CopyWebpackPlugin([{
                    from: 'src/lib/libraries/*.json',
                    to: 'libraries',
                    flatten: true
                }])
            ])
        })) : []
);
