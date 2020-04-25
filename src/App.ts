import 'reflect-metadata'
import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createConnection, Connection } from 'typeorm'
import routes from './routes'

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

	public get getApp(): Application {
		return this.express
	}

	private middlewares(): void {
		this.express.use(express.json())
		this.express.use(morgan('dev'))
		this.express.use(cors())
		this.express.use(routes)
	}

	private async database(): Promise<Connection> {
		return await createConnection()
	}
}
