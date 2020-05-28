import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { resolve } from 'path'

import './app/database'
import routes from './routes'
import { error } from './app/middlewares'

export default class App {
	constructor() {
		this.app = express()

		this.configs()
		this.middlewares()
	}

	get _app() {
		return this.app
	}

	configs() {
		this.app.disable('x-powered-by')
	}

	middlewares() {
		const { CLIENT_HOST, FILE_URL_PREFIX, NODE_ENV } = process.env

		if (NODE_ENV === 'production') {
			this.app.use(cors({ origin: CLIENT_HOST }))
			this.app.use(helmet())
		}

		this.app.use(express.json())
		this.app.use(morgan('dev'))

		this.app.use(
			`/${FILE_URL_PREFIX}`,
			express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
		)

		this.app.use(routes)
		this.app.use(error)
	}
}
