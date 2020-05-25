import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { AuthRequest } from '../types'
import UserRepository from '../models/User/UserRepository'
import errors from '../config/messages/errors'

class SessionController {
	public async store(req: Request, res: Response) {
		const { email, password } = req.body

		const userRepository = getCustomRepository(UserRepository)
		const user = await userRepository.findByEmail(email)

		if (!user) {
			return res.status(404).json({
				error: errors.users.notFound,
			})
		}

		if (!(await user.matchPassword(password))) {
			return res.status(401).json({
				error: errors.users.session.invalidCredentials,
			})
		}

		delete user.password

		return res.json({
			user,
			token: user.generateToken(),
		})
	}

	public async refresh(req: AuthRequest, res: Response) {
		const userRepository = getCustomRepository(UserRepository)
		const user = await userRepository.findOne(req.userId)

		if (!user) {
			return res.status(404).json({ error: errors.users.notFound })
		}

		return res.status(200).json(user)
	}
}

export default new SessionController()
