import 'reflect-metadata'
import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { createConnection, Connection } from 'typeorm'
import { resolve } from 'path'

import routes from './routes'
import { error } from './app/middlewares'

export default class App {
	private app: Application

	public constructor() {
		this.app = express()

		this.configs()
		this.middlewares()
		this.database()
	}

	public get _app(): Application {
		return this.app
	}

	private configs(): void {
		this.app.disable('x-powered-by')
	}

	private middlewares(): void {
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

	private async database(): Promise<Connection> {
		return await createConnection()
	}
}
