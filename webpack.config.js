const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const JavascriptRules = {
	test: /\.m?js$/,
	exclude: /(node_modules|bower_components)/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-react', '@babel/preset-env'],
		},
	},
};

const SassRules = {
	test: /\.s[ac]ss$/i,
	use: [
		'style-loader',
		'css-loader',
		{
			loader: 'sass-loader',
			options: {
				implementation: require('sass'),
			},
		},
	],
};

const ProductionPlugins = [new CompressionPlugin()];
const DevelopmentPlugins = [];

module.exports = (env, {mode}) => ({
	entry: './src/index.js',
	output: {
		filename: 'main.[contentHash].js',
	},
	module: {
		rules: [JavascriptRules, SassRules],
	},
	plugins: [
		...(mode === 'production' ? ProductionPlugins : DevelopmentPlugins),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
	].filter(Boolean),
});
