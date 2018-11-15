const path = require('path');

module.exports = {
	entry : './src/Loader.js',
	output: {
		path         : path.resolve(__dirname, 'dist'),
		filename     : 'any-loader.bundle.js',
		library      : 'AnyLoader',
		libraryTarget: 'umd',
		sourceMapFilename: 'any-loader.bundle.js.map'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test   : /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use    : {
					loader : 'babel-loader?cacheDirectory=true',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-transform-block-scoping',
							'@babel/plugin-transform-computed-properties',
							'@babel/plugin-proposal-object-rest-spread',
							// '@babel/plugin-transform-async-to-generator',
							// '@babel/plugin-transform-regenerator'
						]
					}
				}
			}
		]
	}
};