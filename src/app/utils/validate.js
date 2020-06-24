export default async (res, next, data, schema) => {
	try {
		await schema.validate(data)

		return next()
	} catch (err) {
		return res.status(400).json({
			error: 'Validation fails',
			details: err.details,
		})
	}
}
