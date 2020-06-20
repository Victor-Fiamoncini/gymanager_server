/**
 * @description That custom message object follow the Joi validator responses format
 */
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
