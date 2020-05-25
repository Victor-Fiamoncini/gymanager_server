import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import validate from '../utils/validate'

class UserValidator {
	async store(req: Request, res: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required(),
		})

		await validate(res, next, req.body, schema)
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required(),
			confirmPassword: Joi.string().min(6).valid(Joi.ref('password')),
		})

		await validate(res, next, req.body, schema)
	}
}

export default new UserValidator()
