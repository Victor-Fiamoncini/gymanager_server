import Joi from 'joi'
import validate from '../utils/validate'

import { users } from '../messages/errors'

class UserValidator {
	async store(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required().label(users.name.invalid),
			email: Joi.string().email().required().label(users.email.isEmail),
			password: Joi.string().min(6).required().label(users.password.invalid),
		})

		await validate(res, next, req.body, schema)
	}

	async update(req, res, next) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required().label(users.name.invalid),
			email: Joi.string().email().required().label(users.email.isEmail),
			password: Joi.string().min(6).required().label(users.password.invalid),
			confirmPassword: Joi.string()
				.min(6)
				.valid(Joi.ref('password'))
				.label(users.password.invalid),
		})

		await validate(res, next, req.body, schema)
	}
}

export default new UserValidator()
