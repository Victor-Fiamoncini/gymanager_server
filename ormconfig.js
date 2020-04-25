const { resolve } = require('path')
const { config } = require('dotenv')

config({ path: resolve(__dirname, '.env') })

const { DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT, NODE_ENV } = process.env
let dbConfig

if (NODE_ENV === 'development') {
	dbConfig = {
		type: 'sqlite',
		logging: true,
		synchronize: false,
		database: './src/app/database/db.sqlite',
	}
} else {
	dbConfig = {
		type: 'postgres',
		host: DB_HOST,
		port: DB_PORT,
		username: DB_USER,
		password: DB_PASS,
		database: DB_NAME,
		logging: true,
		synchronize: false,
	}
}

dbConfig.entities = ['./src/app/models']
dbConfig.migrations = ['./src/app/database/migrations']
dbConfig.subscribers = ['./src/app/database/subscribers']

dbConfig.cli = {
	entitiesDir: './src/app/models',
	migrationsDir: './src/app/database/migrations',
	subscribersDir: './src/app/database/subscribers',
}

module.exports = dbConfig
