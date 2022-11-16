const path = require('path');
const { merge } = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV == 'production';

const common = {
	mode: 'development',
	entry: {
		index: ['./src/scripts/app.js'],
	},
	output: {
		filename: 'scripts/[name].[chunkhash].js',
		chunkFilename: 'scripts/[name].[chunkhash].js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'esbuild-loader',
				options: {
					target: 'es2015'
				}
			},
			{
				test: /\.(glsl|frag|vert)$/,
				use: [
					{ loader: 'glslify-import-loader' },
					{ loader: 'raw-loader', options: { esModule: false } },
					{ loader: 'glslify-loader' }
				]
			},
			{
				test: /\.scss$/i,
				use: [
					isProd ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'assets/fonts/[name].[ext]',
						esModule: false,
						publicPath: isProd ? '../' : '/'
					}
				}
			},
		]
	},
	resolve: {
		extensions: ['.js', '.scss']
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: path.resolve(__dirname, 'static'), }
			]
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[chunkhash].css',
		}),
	]
};

const dev = {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
		host: '0.0.0.0',
		hot: false
	}
};

const prod = {
	mode: 'production'
};

module.exports = merge(common, (isProd ? prod : dev));