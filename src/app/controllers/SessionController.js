import { User } from '../models'
import errorMessages from '../config/messages/errors'

class SessionController {
	async store(req, res) {
		const { email, password } = req.body

		const user = await User.findOne({ where: { email } })

		if (!user) {
			return res.status(404).json({
				error: errorMessages.users.notFound,
			})
		}

		if (!(await user.matchPassword(password))) {
			return res.status(401).json({
				error: errorMessages.users.session.invalidCredentials,
			})
		}

		user.password = undefined
		return res.status(200).json({
			user,
			token: user.generateToken(),
		})
	}

	async refresh(req, res) {
		const user = await User.findByPk(req.userId)

		if (!user) {
			return res.status(404).json({ error: errorMessages.users.notFound })
		}

		return res.status(200).json(user)
	}
}

export default new SessionController()
