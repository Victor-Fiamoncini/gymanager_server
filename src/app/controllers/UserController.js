import { User } from '../models'

import customMessage from '../config/messages/customMessage'
import { sessions, users as usersErrors } from '../config/messages/errors'
import { users as usersSuccess } from '../config/messages/success'

class UserController {
	async show(req, res) {
		if (req.params.id !== req.userId) {
			return res.status(401).json(customMessage(sessions.unauthorized))
		}

		const user = await User.findOne({ where: { id: req.params.id } })
		if (!user) {
			return res.status(404).json(customMessage(usersErrors.notFound, 'email'))
		}

		const { id, name, email, photo_url } = user
		return res.status(200).json({ id, name, email, photo_url })
	}

	async store(req, res) {
		if (await User.findOne({ where: { email: req.body.email } })) {
			return res
				.status(400)
				.json(customMessage(usersErrors.alreadyExists, 'email'))
		}

		const { id, name, email, photo_url } = await User.create(req.body)

		return res.status(201).json({ id, name, email, photo_url })
	}

	async update(req, res) {
		if (req.params.id !== req.userId) {
			return res.status(401).json(customMessage(sessions.unauthorized))
		}

		const userById = await User.findOne({ where: { id: req.params.id } })
		if (!userById) {
			return res.status(404).json(customMessage(usersErrors.notFound, 'email'))
		}

		const userByEmail = await User.findOne({ where: { email: req.body.email } })
		if (userByEmail && userByEmail.email !== userById.email) {
			return res
				.status(404)
				.json(customMessage(usersErrors.alreadyExists, 'email'))
		}

		const { id, name, email, photo_url } = await userById.update(req.body, {
			where: { id: req.params.id },
		})

		return res.status(200).json({ id, name, email, photo_url })
	}

	async destroy(req, res) {
		const { id } = req.params

		if (id !== req.userId) {
			return res.status(401).json(customMessage(sessions.unauthorized))
		}

		await User.destroy({ where: { id } })

		return res.status(200).json({ success: usersSuccess.deleted })
	}

	async storePhoto(req, res) {
		if (req.params.id !== req.userId) {
			return res.status(401).json(customMessage(sessions.unauthorized))
		}

		const user = await User.findOne({ where: { id: req.params.id } })
		if (!user) {
			return res.status(404).json(customMessage(usersErrors.notFound, 'email'))
		}

		if (!req.file) {
			return res
				.status(404)
				.json(customMessage(usersErrors.photo.required, 'photo'))
		}

		user.photo = req.file.filename
		await user.save()

		return res.status(200).json({ photo_url: user.photo_url })
	}
}

export default new UserController()
