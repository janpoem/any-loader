import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const umdModuleName = 'AnyLoader';

export default [
	{
		input:   'src/Loader.mjs',
		output:  [
			{file: 'index.js', format: 'cjs', sourcemap: true},
		],
		plugins: [
			babel({
				presets: [
					[
						'@babel/preset-env',
						{
							useBuiltIns: false
						}
					]
				],
				exclude: 'node_modules/**'
			})
		]
	},
	{
		input:   'src/Loader.mjs',
		output:  [
			{file: 'dist/any-loader.bundle.js', format: 'cjs', sourcemap: true},
			{file: 'dist/any-loader.bundle.umd.js', format: 'umd', sourcemap: true, name: umdModuleName},
		],
		plugins: [
			resolve({}),
			commonjs(),
			babel({
				presets: [
					[
						'@babel/preset-env',
						{
							useBuiltIns: false
						}
					]
				],
				exclude: 'node_modules/**'
			})
		]
	},
	{
		input:   'src/Loader.mjs',
		output:  [
			{file: 'dist/any-loader.without-bluebird.js', format: 'cjs', sourcemap: true},
			{file: 'dist/any-loader.without-bluebird.umd.js', format: 'umd', sourcemap: true, name: umdModuleName},
		],
		plugins: [
			resolve({
				only: [ 'deepmerge' ], // Default: null
			}),
			commonjs(),
			babel({
				presets: [
					[
						'@babel/preset-env',
						{
							useBuiltIns: false
						}
					]
				],
				exclude: 'node_modules/**'
			})
		]
	},
];