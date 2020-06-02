import { Student } from '../models'

import errors from '../config/messages/errors'
import success from '../config/messages/success'

class StudentController {
	async show(req, res) {
		const { id } = req.params

		const student = await Student.findOne({
			where: { id },
			attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
		})

		if (!student) {
			return res.status(404).json({ error: errors.students.notFound })
		}

		return res.status(200).json(student)
	}

	async store(req, res) {
		const { email } = req.body

		if (await Student.findOne({ where: { email } })) {
			return res.status(404).json({ error: errors.students.notFound })
		}

		const { id, name, age, height, weight } = await Student.create(req.body)

		return res.status(201).json({ id, name, age, height, weight })
	}

	async update(req, res) {
		const studentById = await Student.findByPk(req.params.id)

		if (!studentById) {
			return res.status(404).json({ error: errors.students.notFound })
		}

		const studentByEmail = await Student.findOne({
			where: { email: req.body.email },
		})

		if (studentByEmail && studentById.email !== studentByEmail.email) {
			return res.status(404).json({ error: errors.students.alreadyExists })
		}

		const { id, name, age, height, weight } = await studentById.update(
			req.body,
			{
				where: { id: req.params.id },
			}
		)

		return res.status(200).json({ id, name, age, height, weight })
	}

	async destroy(req, res) {
		const student = await Student.findByPk(req.params.id)
		if (!student) {
			return res.status(404).json({ error: errors.students.notFound })
		}

		await student.destroy()
		return res.status(200).json({ success: success.students.deleted })
	}
}

export default new StudentController()
