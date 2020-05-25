import { NextFunction, Response } from 'express'
import Joi, { ObjectSchema } from 'joi'

export default async (
	res: Response,
	next: NextFunction,
	data: object,
	schema: ObjectSchema
) => {
	await Joi.validate(data, schema, (err) => {
		if (err) {
			return res.status(400).json({
				error: 'Validation fails',
				details: err.details,
			})
		}

		return next()
	})
}
