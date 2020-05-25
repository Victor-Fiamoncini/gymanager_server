import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import UserRepository from '../models/User/UserRepository'
import errorMessages from '../config/messages/errors'

class UserController {
	public async store(req: Request, res: Response) {
		const { name, email, password } = req.body

		const userRepository = getCustomRepository(UserRepository)

		let user = await userRepository.findByEmail(email)

		if (user) {
			return res.status(400).json({ error: errorMessages.users.alreadyExists })
		}

		user = userRepository.create({
			name,
			email,
			password,
		})

		await user.save()
		delete user.password

		return res.status(201).json(user)
	}

	public async update(req: Request, res: Response) {
		// const { id } = req.params
		// const user = await User.findOne(id)
		// if (!user) {
		// 	return res.status(400).json({ error: errorMessages.users.notFound })
		// }
		// return res.status(200).json(user)
	}
}

export default new UserController()
