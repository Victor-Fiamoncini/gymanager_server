import { Op } from 'sequelize'
import crypto from 'crypto'
import { User } from '../models'

import SendMailService from '../services/SendMailService'
import message from '../utils/message'
import {
	server,
	users,
	forgotPassword as forgotPasswordErrors,
} from '../messages/errors'
import { forgotPassword as forgotPasswordSuccess } from '../messages/success'

class ForgotPasswordController {
	async store(req, res) {
		const user = await User.findOne({ where: { email: req.body.email } })

		if (!user) {
			return res.status(404).json(message(users.notFound, 'email'))
		}

		const resetToken = user.generateResetPasswordToken()
		await user.save()

		try {
			await SendMailService.run({
				to: user.email,
				subject: 'Recuperação de senha',
				template: 'forgot_password',
				context: {
					name: user.name,
					token: resetToken,
				},
			})

			return res
				.status(201)
				.json({ message: forgotPasswordSuccess.forgotRequestCreated })
		} catch (err) {
			user.reset_password_token = null
			user.reset_password_expire = null
			await user.save()

			return res.status(500).json(message(server.internalError))
		}
	}

	async reset(req, res) {
		const { password, resetToken } = req.body

		const resetPasswordToken = crypto
			.createHash('sha256')
			.update(resetToken)
			.digest('hex')

		const user = await User.findOne({
			where: {
				reset_password_token: resetPasswordToken,
				reset_password_expire: {
					[Op.gte]: Date.now(),
				},
			},
		})

		if (!user) {
			return res.status(401).json(message(forgotPasswordErrors.invalidToken))
		}

		user.password = password
		user.reset_password_token = null
		user.reset_password_expire = null
		await user.save()

		return res
			.status(200)
			.json({ message: forgotPasswordSuccess.passwordReseted })
	}
}

export default new ForgotPasswordController()
