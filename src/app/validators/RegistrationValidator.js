import Joi from 'joi'
import validate from '../utils/validate'

import { registrations } from '../messages/errors'

class RegistrationValidator {
	async store(req, res, next) {
		const schema = Joi.object().keys({
			student_id: Joi.number()
				.required()
				.label(registrations.student_id.invalid),
			plan_id: Joi.number().required().label(registrations.plan_id.invalid),
			start_date: Joi.date().required().label(registrations.start_date.invalid),
			end_date: Joi.date().required().label(registrations.end_date.invalid),
			price: Joi.number().required().label(registrations.price.invalid),
		})

		await validate(res, next, req.body, schema)
	}

	async update(req, res, next) {
		const schema = Joi.object().keys({
			plan_id: Joi.number().required().label(registrations.plan_id.invalid),
			start_date: Joi.date().required().label(registrations.start_date.invalid),
			end_date: Joi.date().required().label(registrations.end_date.invalid),
			price: Joi.number().required().label(registrations.price.invalid),
		})

		await validate(res, next, req.body, schema)
	}
}

export default new RegistrationValidator()
