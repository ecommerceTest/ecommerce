var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'fisiere/aplicatie/aplicatie.js'),
	output: {
		path: path.resolve(__dirname, 'mapa'),
		filename: 'continut.js'
	},
	module: {
		loaders: [{ 
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015'],
				compact: false
			}
		}]
	}
};