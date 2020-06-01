import { User } from '../models'
import errors from '../config/messages/errors'
import success from '../config/messages/success'

class UserController {
	async show(req, res) {
		if (req.params.id !== req.userId) {
			return res.status(401).json({ error: errors.sessions.unauthorized })
		}

		const user = await User.findOne({ where: { id: req.params.id } })
		if (!user) {
			return res.status(404).json({ error: errors.users.notFound })
		}

		const { id, name, email, photo_url } = user

		return res.status(200).json({ id, name, email, photo_url })
	}

	async store(req, res) {
		if (await User.findOne({ where: { email: req.body.email } })) {
			return res.status(400).json({ error: errors.users.alreadyExists })
		}

		const { id, name, email, photo_url } = await User.create(req.body)

		return res.status(201).json({ id, name, email, photo_url })
	}

	async update(req, res) {
		if (req.params.id !== req.userId) {
			return res.status(401).json({ error: errors.sessions.unauthorized })
		}

		const userById = await User.findOne({ where: { id: req.params.id } })
		if (!userById) {
			return res.status(404).json({ error: errors.users.notFound })
		}

		const userByEmail = await User.findOne({ where: { email: req.body.email } })
		if (userByEmail && userByEmail.email !== userById.email) {
			return res.status(404).json({ error: errors.users.alreadyExists })
		}

		const { id, name, email, photo_url } = await userById.update(req.body, {
			where: { id: req.params.id },
		})

		return res.status(200).json({ id, name, email, photo_url })
	}

	async destroy(req, res) {
		const { id } = req.params

		if (id !== req.userId) {
			return res.status(401).json({ error: errors.sessions.unauthorized })
		}

		await User.destroy({ where: { id } })

		return res.status(200).json({ success: success.users.deleted })
	}

	async updatePhoto(req, res) {
		if (req.params.id !== req.userId) {
			return res.status(401).json({ error: errors.sessions.unauthorized })
		}

		const user = await User.findOne({ where: { id: req.params.id } })
		if (!user) {
			return res.status(404).json({ error: errors.users.notFound })
		}

		const { id, name, email, photo_url } = await user.update(req.body, {
			where: { id: req.params.id },
		})

		return res.status(200).json({ id, name, email, photo_url })
	}
}

export default new UserController()
