import Joi from 'joi'
import validate from '../utils/validate'

class PlanValidator {
	async store(req, res, next) {
		const schema = Joi.object().keys({
			title: Joi.string().required(),
			price: Joi.number().required(),
			duration: Joi.number().integer().required(),
		})

		await validate(res, next, req.body, schema)
	}

	async update(req, res, next) {
		const schema = Joi.object().keys({
			title: Joi.string().required(),
			price: Joi.number().required(),
			duration: Joi.number().integer().required(),
		})

		await validate(res, next, req.body, schema)
	}
}

export default new PlanValidator()
