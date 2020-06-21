import { resolve } from 'path'
import { createTransport } from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'

const { SMTP_EMAIL, SMTP_HOST, SMTP_PASS, SMTP_PORT } = process.env

const mailerConfigs = {
	host: SMTP_HOST,
	port: SMTP_PORT,
	auth: {
		user: SMTP_EMAIL,
		pass: SMTP_PASS,
	},
}

const transport = createTransport(mailerConfigs)

transport.use(
	'compile',
	hbs({
		viewEngine: {
			extName: '.handlebars',
			partialsDir: resolve(__dirname, '..', 'resources'),
			layoutsDir: resolve(__dirname, '..', 'resources'),
			defaultLayout: 'index.handlebars',
		},
		viewPath: resolve(__dirname, '..', 'resources/mail'),
		extName: '.handlebars',
	})
)

export default transport
