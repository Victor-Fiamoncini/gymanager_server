import { Request, Response } from 'express'
import { validate } from 'class-validator'
import User from '../models/User'

export default class UserController {
	private user: User

	public constructor(user: User) {
		this.user = user
	}

	public async store(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body

		this.user.name = name
		this.user.email = email
		this.user.password = password
		this.user.photo = req.file ? req.file.filename : ''

		const errors = await validate(this.user)

		if (errors.length > 0)
			return res.status(400).json(errors)

		await this.user.save()

		return res.status(201).json(this.user)
	}
}
