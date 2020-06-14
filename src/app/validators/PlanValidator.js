import Joi from 'joi'
import validate from '../utils/validate'

import { plans } from '../messages/errors'

class PlanValidator {
	async store(req, res, next) {
		const schema = Joi.object().keys({
			title: Joi.string().required().label(plans.title.invalid),
			price: Joi.number().required().label(plans.price.invalid),
			duration: Joi.number().integer().required().label(plans.duration.invalid),
		})

		await validate(res, next, req.body, schema)
	}

	async update(req, res, next) {
		const schema = Joi.object().keys({
			title: Joi.string().required().label(plans.title.invalid),
			price: Joi.number().required().label(plans.price.invalid),
			duration: Joi.number().integer().required().label(plans.duration.invalid),
		})

		await validate(res, next, req.body, schema)
	}
}

export default new PlanValidator()
