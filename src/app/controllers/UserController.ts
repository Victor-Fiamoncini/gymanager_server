import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/User'

class UserController {
	public async index(req: Request, res: Response): Promise<Response> {
		const users = await getRepository(User).find()

		return res.json(users)
	}

	public async store(req: Request, res: Response): Promise<Response> {
		try {
			const { name, email, birthdate } = req.body

			const user = await getRepository(User).insert({
				name,
				email,
				birthdate,
			})

			return res.status(201).json({ user: user.identifiers[0] })
		} catch (err) {
			return res.status(400).json(err)
		}
	}
}

export default new UserController()
