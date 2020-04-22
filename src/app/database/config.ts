import { resolve } from 'path'
import { createConnection } from 'typeorm'

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, NODE_ENV } = process.env

export default () => {
	if (NODE_ENV === 'development')
		return createConnection({
			type: 'sqlite',
			synchronize: true,
			logging: false,
			database: resolve(__dirname, 'db.sqlite'),
			entities: [resolve(__dirname, '..', 'models', '*.ts')],
			migrations: [resolve(__dirname, '..', 'database', 'migrations', '*.ts')],
			subscribers: [
				resolve(__dirname, '..', 'database', 'subscribers', '*.ts'),
			],
		})

	return createConnection({
		type: 'postgres',
		host: DB_HOST,
		port: DB_PORT,
		username: DB_USER,
		password: DB_PASS,
		database: DB_NAME,
		synchronize: true,
		logging: false,
		entities: [resolve(__dirname, '..', 'models', '*.ts')],
		migrations: [resolve(__dirname, 'migrations', '*.ts')],
	})
}
