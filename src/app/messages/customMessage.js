export default (message, field = '') => ({
	error: 'Validation fails',
	details: [
		{
			message,
			path: [field],
			context: {
				key: field,
				label: message,
			},
		},
	],
})
