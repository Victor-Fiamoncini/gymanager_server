import { User } from '../models'
import errors from '../config/messages/errors'

class SessionController {
	async store(req, res) {
		const { email, password } = req.body

		const user = await User.findOne({ where: { email } })

		if (!user) {
			return res.status(404).json({
				error: errors.users.notFound,
			})
		}

		if (!(await user.matchPassword(password))) {
			return res.status(401).json({
				error: errors.sessions.invalidCredentials,
			})
		}

		user.password_hash = undefined
		user.password = undefined
		return res.status(200).json({
			user,
			token: user.generateToken(),
		})
	}

	async refresh(req, res) {
		const user = await User.findByPk(req.userId)

		if (!user) {
			return res.status(404).json({ error: errors.users.notFound })
		}

		user.password_hash = undefined
		return res.status(200).json(user)
	}
}

export default new SessionController()