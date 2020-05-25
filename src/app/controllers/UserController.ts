import { Request, Response } from 'express'

import User from '../models/User'
import errorMessages from '../config/messages/errors'

class UserController {
	public async store(req: Request, res: Response) {
		const { name, email, password } = req.body

		const user = new User()

		user.name = name
		user.email = email
		user.password = password
		user.photo = req.file ? req.file.filename : ''

		await user.save()

		delete user.password

		return res.status(201).json(user)
	}

	public async update(req: Request, res: Response) {
		const { id } = req.params

		const user = await User.findOne(id)

		if (!user) {
			return res.status(400).json({ error: errorMessages.users.notFound })
		}

		return res.status(200).json(user)
	}
}

export default new UserController()
