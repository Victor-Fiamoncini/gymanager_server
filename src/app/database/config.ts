import { resolve } from 'path'
import { createConnection } from 'typeorm'

export default (host: string, username: string, password: string, database: string, port: number) => {
	if (process.env.NODE_ENV === 'development')
		return createConnection({
			type: 'sqlite',
			synchronize: false,
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
		host,
		username,
		password,
		database,
		port,
		synchronize: true,
		logging: false,
		entities: [resolve(__dirname, '..', 'models', '*.ts')],
		migrations: [`${__dirname}/migrations/*.ts`],
		cli: {
			migrationsDir: './src/app/database/migrations',
		}
	})
}
