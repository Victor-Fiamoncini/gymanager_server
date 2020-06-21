import Joi from 'joi'
import validate from '../utils/validate'

import { users, forgotPassword } from '../messages/errors'

class ForgotPasswordValidator {
	async reset(req, res, next) {
		const schema = Joi.object().keys({
			resetToken: Joi.string()
				.min(32)
				.required()
				.label(forgotPassword.invalidToken),
			password: Joi.string().min(6).required().label(users.password.invalid),
			confirmPassword: Joi.string()
				.min(6)
				.valid(Joi.ref('password'))
				.label(users.password.dontMatch),
		})

		await validate(res, next, req.body, schema)
	}
}

export default new ForgotPasswordValidator()
