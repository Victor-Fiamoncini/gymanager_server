import { Request, Response } from 'express'
import { validate } from 'class-validator'
import { User } from '../models/User'

/**
 * @class UserController
 */
class UserController {
	public async store(req: Request, res: Response): Promise<Response> {
		const { name, email, password, photo } = req.body
		try {
			const user = new User()
			user.name = name
			user.email = email
			user.password = password
			user.photo = photo

			const errors = await validate(user)

			if (errors.length > 0)
				return res.status(400).json(errors)

			await user.save()

			return res.status(201).json(user)
		} catch (err) {
			return res.status(400).json(err)
		}
	}
}

export default new UserController()
