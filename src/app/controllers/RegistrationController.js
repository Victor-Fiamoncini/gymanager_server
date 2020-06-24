import { Registration, Student, Plan } from '../models'

import message from '../utils/message'
import { registrations as registrationsErrors } from '../messages/errors'
import { registrations as registrationsSuccess } from '../messages/success'

class RegistrationController {
	async index(req, res) {
		const registrations = await Registration.findAll({
			where: { user_id: req.userId },
			attributes: ['id', 'student_id', 'start_date', 'end_date', 'price'],
			order: [['created_at', 'DESC']],
		})

		if (!registrations.length > 0) {
			return res.status(400).json(message(registrationsErrors.notFoundIndex))
		}

		return res.status(200).json(registrations)
	}

	async store(req, res) {
		const { plan_id, student_id, start_date, end_date, price } = req.body

		if (!(await Student.findByPk(student_id))) {
			return res
				.status(404)
				.json(message(registrationsErrors.student_id.notFound))
		}

		if (!(await Plan.findByPk(plan_id))) {
			return res.status(404).json(message(registrationsErrors.plan_id.notFound))
		}

		let registration = await Registration.findOne({
			where: {
				user_id: req.userId,
				student_id,
			},
		})

		if (registration) {
			return res.status(400).json(message(registrationsErrors.alreadyExists))
		}

		registration = await Registration.create({
			start_date,
			end_date,
			price,
			user_id: req.userId,
			student_id,
			plan_id,
		})

		return res.status(201).json(registration)
	}

	async update(req, res) {
		const { plan_id, start_date, end_date, price } = req.body

		if (!(await Plan.findByPk(plan_id))) {
			return res.status(404).json(message(registrationsErrors.plan_id.notFound))
		}

		const registration = await Registration.findOne({
			where: {
				id: req.params.id,
				user_id: req.userId,
			},
		})

		if (!registration) {
			return res.status(400).json(message(registrationsErrors.notFound))
		}

		await registration.update({
			plan_id,
			start_date,
			end_date,
			price,
		})

		return res.status(200).json(registration)
	}

	async destroy(req, res) {
		const registration = await Registration.findOne({
			where: {
				id: req.params.id,
				user_id: req.userId,
			},
		})

		if (!registration) {
			return res.status(400).json(message(registrationsErrors.notFound))
		}

		await registration.destroy()

		return res.status(200).json({ success: registrationsSuccess.deleted })
	}
}

export default new RegistrationController()
