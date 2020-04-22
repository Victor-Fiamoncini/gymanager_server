import 'reflect-metadata'
import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import routes from './routes'
import databaseConfig from './app/database/config'

/**
 * @class App
 */
export default class App {
	private express: Application

	public constructor() {
		this.express = express()

		this.middlewares()
		this.database()
	}

	get app(): Application {
		return this.express
	}

	private middlewares(): void {
		this.express.use(express.json())
		this.express.use(morgan('dev'))
		this.express.use(cors())
		this.express.use(routes)
	}

	private database(): void {
		const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env

		databaseConfig(DB_HOST!, DB_USER!, DB_PASS!, DB_NAME!, Number(DB_PORT)!)
	}
}
