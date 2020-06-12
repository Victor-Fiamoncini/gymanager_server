module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	plugins: ['jest'],
	extends: ['eslint:recommended', 'plugin:jest/recommended'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		process: true,
		module: true,
		export: true,
		__dirname: true,
		require: true,
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
	},
}
