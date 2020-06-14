import Joi from 'joi'
import validate from '../utils/validate'

import { students } from '../messages/errors'

class StudentValidator {
	async store(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required().label(students.name.invalid),
			email: Joi.string().email().required().label(students.email.isEmail),
			age: Joi.number().required().label(students.age.invalid),
			weight: Joi.number().required().label(students.weight.invalid),
			height: Joi.number().required().label(students.height.invalid),
		})

		await validate(res, next, req.body, schema)
	}

	async update(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required().label(students.name.invalid),
			email: Joi.string().email().required().label(students.email.isEmail),
			age: Joi.number().required().label(students.age.invalid),
			weight: Joi.number().required().label(students.weight.invalid),
			height: Joi.number().required().label(students.height.invalid),
		})

		await validate(res, next, req.body, schema)
	}
}

export default new StudentValidator()
