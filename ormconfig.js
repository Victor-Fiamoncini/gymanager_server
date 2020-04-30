const { resolve } = require('path')
const { config } = require('dotenv')

config({ path: resolve(__dirname, '.env') })

const {
	DB_HOST,
	DB_NAME,
	DB_USER,
	DB_PASS,
	DB_PORT,
	DB_TEST,
	NODE_ENV,
} = process.env

const dbConfig = {}

NODE_ENV === 'development'
	? (dbConfig.database = DB_TEST)
	: (dbConfig.database = DB_NAME)

dbConfig.type = 'postgres'
dbConfig.host = DB_HOST
dbConfig.port = DB_PORT
dbConfig.username = DB_USER
dbConfig.password = DB_PASS
dbConfig.logging = false
dbConfig.synchronize = true

dbConfig.entities = ['src/app/models/**/*.ts']
dbConfig.migrations = ['src/app/database/migrations/**/*.ts']
dbConfig.subscribers = ['src/app/database/subscribers/**/*.ts']

dbConfig.cli = {
	entitiesDir: 'src/app/models',
	migrationsDir: 'src/app/database/migrations',
	subscribersDir: 'src/app/database/subscribers',
}

module.exports = dbConfig
