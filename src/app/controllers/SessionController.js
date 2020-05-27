import errors from '../config/messages/errors'

class SessionController {
	async store(req, res) {
		// const { email, password } = req.body

		// const userRepository = getCustomRepository(UserRepository)
		// const user = await userRepository.findByEmail(email)

		// if (!user) {
		// 	return res.status(404).json({
		// 		error: errors.users.notFound,
		// 	})
		// }

		// if (!(await user.matchPassword(password))) {
		// 	return res.status(401).json({
		// 		error: errors.users.session.invalidCredentials,
		// 	})
		// }

		// delete user.password

		return res.json({
			user: 1,
			// token: user.generateToken(),
		})
	}

	async refresh(req, res) {
		// const userRepository = getCustomRepository(UserRepository)
		// const user = await userRepository.findOne(req.userId)

		// if (!user) {
		// 	return res.status(404).json({ error: errors.users.notFound })
		// }

		return res.status(200).json('user')
	}
}

export default new SessionController()
