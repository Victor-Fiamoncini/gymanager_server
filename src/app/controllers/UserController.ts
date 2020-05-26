import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import UserRepository from '../models/User/UserRepository'
import errorMessages from '../config/messages/errors'
import { AuthRequest } from '../types'

class UserController {
	public async store(req: Request, res: Response) {
		const { name, email, password } = req.body
		const userRepository = getCustomRepository(UserRepository)

		if (await userRepository.findByEmail(email)) {
			return res.status(400).json({ error: errorMessages.users.alreadyExists })
		}

		const user = await userRepository.store({
			name,
			email,
			password,
		})

		delete user.password
		return res.status(201).json(user)
	}

	public async update(req: AuthRequest, res: Response) {
		const { id } = req.params

		if (id !== req.userId) {
			return res
				.status(401)
				.json({ error: errorMessages.users.session.unauthorized })
		}

		const userRepository = getCustomRepository(UserRepository)
		const user = await userRepository.findOne(id)

		if (!user) {
			return res.status(404).json({ error: errorMessages.users.notFound })
		}

		return res.status(200).json(user)
	}
}

export default new UserController()
