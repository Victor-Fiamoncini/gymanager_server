import { Plan } from '../models'

import message from '../utils/message'
import { plans as plansErrors } from '../messages/errors'
import { plans as plansSuccess } from '../messages/success'

class PlanController {
	async index(req, res) {
		const plans = await Plan.findAll({
			where: { user_id: req.userId },
			attributes: ['id', 'title', 'duration', 'price'],
			order: [['created_at', 'DESC']],
		})

		if (!plans) {
			return res.status(404).json(message(plansErrors.notFoundIndex))
		}

		return res.status(200).json(plans)
	}

	async store(req, res) {
		const { title, duration, price } = req.body

		const plan = await Plan.findOne({
			where: {
				title,
				user_id: req.userId,
			},
		})

		if (plan) {
			return res.status(400).json(message(plansErrors.alreadyExists))
		}

		const { id } = await Plan.create({
			title,
			duration,
			price,
			user_id: req.userId,
		})

		return res.status(201).json({ id, title, price, duration })
	}

	async update(req, res) {
		const plan = await Plan.findOne({
			where: {
				id: req.params.id,
				user_id: req.userId,
			},
		})

		if (!plan) {
			return res.status(404).json(message(plansErrors.notFound))
		}

		const { id, title, price, duration } = await plan.update(req.body, {
			where: {
				id: req.params.id,
				user_id: req.userId,
			},
		})

		return res.status(200).json({ id, title, price, duration })
	}

	async destroy(req, res) {
		const plan = await Plan.findOne({
			where: {
				id: req.params.id,
				user_id: req.userId,
			},
		})

		if (!plan) {
			return res.status(404).json(message(plansErrors.notFound))
		}

		await plan.destroy()
		return res.status(200).json({ success: plansSuccess.deleted })
	}
}

export default new PlanController()
