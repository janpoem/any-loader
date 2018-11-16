import babel from 'rollup-plugin-babel';

export default [
	{
		input:   'Loader.mjs',
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
	}
];