import User from '../models/User'

import errorMessages from '../config/messages/errors'

class UserController {
	async store(req, res) {
		const { name, email, password } = req.body

		if (await User.findOne({ where: { email } })) {
			return res.status(400).json({ error: errorMessages.users.alreadyExists })
		}

		const user = await User.create({ name, email, password })

		user.password = undefined
		return res.status(201).json(user)
	}
}

export default new UserController()
