const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/index.tsx'),
	mode: 'development',
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].[chunkhash].js',
	},
	module: {
		rules: [
			{
				// Use babel-loader for all ts, js, tsx, and jsx files
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				// Use style-loader and css-loader for all css files
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				// Asset/resource for images
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				// Asset/inline for fonts and svgs
				test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
				type: 'asset/inline',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
		}),
		// Other plugins can be added here
	],
};
