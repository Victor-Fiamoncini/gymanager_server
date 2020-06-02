import Joi from 'joi'
import validate from '../utils/validate'

class StudentValidator {
	async store(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required(),
			email: Joi.string().email().required(),
			age: Joi.number().required(),
			weight: Joi.number().required(),
			height: Joi.number().required(),
		})

		await validate(res, next, req.body, schema)
	}

	async update(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required(),
			email: Joi.string().email().required(),
			age: Joi.number().required(),
			weight: Joi.number().required(),
			height: Joi.number().required(),
		})

		await validate(res, next, req.body, schema)
	}
}

export default new StudentValidator()
