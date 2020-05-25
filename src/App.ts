import 'reflect-metadata'
import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createConnection, Connection } from 'typeorm'

import routes from './routes'

export default class App {
	private app: Application

	public constructor() {
		this.app = express()

		this.middlewares()
		this.database()
	}

	public get getApp(): Application {
		return this.app
	}

	private middlewares(): void {
		this.app.use(express.json())
		this.app.use(morgan('dev'))
		this.app.use(cors({ origin: process.env.CLIENT_HOST }))
		this.app.use(routes)
	}

	private async database(): Promise<Connection> {
		return await createConnection()
	}
}
