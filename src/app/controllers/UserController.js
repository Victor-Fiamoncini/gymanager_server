import errorMessages from '../config/messages/errors'
import successMessages from '../config/messages/success'

class UserController {
	async store(req, res) {
		// const { name, email, password } = req.body
		// const userRepository = getCustomRepository(UserRepository)

		// if (await userRepository.findByEmail(email)) {
		// 	return res.status(400).json({ error: errorMessages.users.alreadyExists })
		// }

		// const user = await userRepository.store({
		// 	name,
		// 	email,
		// 	password,
		// })

		// delete user.password
		return res.status(201).json('user')
	}

	async update(req, res) {
		// if (Number(req.params.id) !== req.userId) {
		// 	return res
		// 		.status(401)
		// 		.json({ error: errorMessages.users.session.unauthorized })
		// }

		// const userRepository = getCustomRepository(UserRepository)
		// const user = await userRepository.findOne(req.userId)

		// if (!user) {
		// 	return res.status(404).json({ error: errorMessages.users.notFound })
		// }

		// delete req.body.confirmPassword
		// await userRepository.updateById(req.userId, ...user, req.body)

		return res.status(200).json({ message: successMessages.users.updated })
	}
}

export default new UserController()
