import { User } from '../models'

import message from '../utils/message'
import { users as usersErrors } from '../messages/errors'
import { users as usersSuccess } from '../messages/success'

class UserController {
	async show(req, res) {
		const { id, name, email, photo_url } = req.user

		return res.status(200).json({ id, name, email, photo_url })
	}

	async store(req, res) {
		if (await User.findOne({ where: { email: req.body.email } })) {
			return res.status(400).json(message(usersErrors.alreadyExists, 'email'))
		}

		const { id, name, email, photo_url } = await User.create(req.body)

		return res.status(201).json({ id, name, email, photo_url })
	}

	async update(req, res) {
		const { user, userId } = req

		const userByEmail = await User.findOne({ where: { email: req.body.email } })
		if (userByEmail && userByEmail.email !== user.email) {
			return res.status(404).json(message(usersErrors.alreadyExists, 'email'))
		}

		const { id, name, email, photo_url } = await user.update(req.body, {
			where: { id: userId },
		})

		return res.status(200).json({ id, name, email, photo_url })
	}

	async destroy(req, res) {
		await req.user.destroy()

		return res.status(200).json({ success: usersSuccess.deleted })
	}

	async storePhoto(req, res) {
		if (!req.file) {
			return res.status(404).json(message(usersErrors.photo.required, 'photo'))
		}

		const { user } = req

		user.photo = req.file.filename
		await user.save()

		return res.status(200).json({ photo_url: user.photo_url })
	}
}

export default new UserController()
