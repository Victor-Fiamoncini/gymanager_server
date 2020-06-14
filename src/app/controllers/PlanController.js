import { Plan } from '../models'

class PlanController {
	async index(req, res) {}

	async store(req, res) {
		const { title, duration, price } = req.body

		const plan = await Plan.findOne({
			where: { title, user_id: req.userId },
		})

		if (plan) {
			return res.status(400)
		}

		const { id } = await Plan.create({ title, duration, price })

		return res.status(201).json({ id, title, price, duration })
	}

	async update(req, res) {}

	async destroy(req, res) {}
}

export default new PlanController()
