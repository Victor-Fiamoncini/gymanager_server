import transport from '../config/nodemailer'

class SendMailService {
	async run({ to, subject, template, context }) {
		const { FROM_NAME, FROM_EMAIL } = process.env

		return await transport.sendMail({
			to,
			from: `${FROM_NAME} <${FROM_EMAIL}>`,
			subject,
			template,
			context,
		})
	}
}

export default new SendMailService()
