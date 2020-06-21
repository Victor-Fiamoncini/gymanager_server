import SendMailService from '../services/SendMailService'

class ForgotPasswordController {
	async store(req, res) {
		await SendMailService.run({
			to: 'teste@mail.com.br',
			subject: 'Recuperar senha',
			template: 'forgot_password',
			context: {
				name: 'Victor',
				token: 'Hell1231n2j312oi3',
			},
		})

		return res.status(201).send()
	}
}

export default new ForgotPasswordController()
