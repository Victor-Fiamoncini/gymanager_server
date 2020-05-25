import { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { AuthRequest } from '../types'
import User from '../models/User'
import errors from '../config/messages/errors'

class SessionController {
	public async store(req: Request, res: Response) {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })

		if (!user) {
			return res.status(404).json({
				message: errors.users.auth.notFound,
			})
		}

		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(404).json({
				message: errors.users.auth.notFound,
			})
		}

		delete user.password

		const secret: Secret = process.env.JWT_AUTH_SECRET!

		return res.json({
			user,
			token: jwt.sign({ id: user.id }, secret, { expiresIn: 86400 }),
		})
	}

	public async refresh(req: AuthRequest, res: Response) {
		const user = await User.findOne(req.userId)

		if (!user) {
			return res.status(200).json({ error: errors.users.notFound })
		}

		return res.status(200).json(user)
	}
}

export default new SessionController()
