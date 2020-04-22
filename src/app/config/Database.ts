import { Connection, getConnectionManager } from 'typeorm'

/**
 * @class DBConfig
 */
export default class Database {
	private host: string
	private port: number
	private username: string
	private password: string
	private database: string

	public constructor(
		host: string,
		port: number,
		username: string,
		password: string,
		database: string
	) {
		this.host = host
		this.port = port
		this.username = username
		this.password = password
		this.database = database
	}

	public async connect(): Promise<Connection> {
		const connectionManager = getConnectionManager()

		const connection = connectionManager.create({
			type: 'postgres',
			host: this.host,
			port: this.port,
			username: this.username,
			password: this.password,
			database: this.database,
		})

		return await connection.connect()
	}
}
