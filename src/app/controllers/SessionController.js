import { User } from '../models'

import message from '../utils/message'
import { sessions } from '../messages/errors'

class SessionController {
	async store(req, res) {
		const { email, password } = req.body

		const user = await User.findOne({ where: { email } })

		if (!user) {
			return res.status(404).json(message(sessions.invalidCredentials))
		}

		if (!(await user.matchPassword(password))) {
			return res.status(401).json(message(sessions.invalidCredentials))
		}

		user.password_hash = undefined
		user.password = undefined

		return res.status(200).json({
			user,
			token: user.generateJwtToken(),
		})
	}

	async refresh(req, res) {
		const { user } = req

		user.password_hash = undefined
		return res.status(200).json(user)
	}
}

export default new SessionController()
