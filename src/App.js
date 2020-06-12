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
		this.express = express()

		this.configs()
		this.middlewares()
	}

	get app() {
		return this.express
	}

	configs() {
		this.express.disable('x-powered-by')
	}

	middlewares() {
		const { CLIENT_HOST, FILE_URL_PREFIX, NODE_ENV } = process.env

		if (NODE_ENV === 'production') {
			this.express.use(cors({ origin: CLIENT_HOST }))
			this.express.use(helmet())
		}

		this.express.use(express.json())
		this.express.use(morgan('dev'))

		this.express.use(
			`/${FILE_URL_PREFIX}`,
			express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
		)

		this.express.use(routes)
		this.express.use(error)
	}
}
