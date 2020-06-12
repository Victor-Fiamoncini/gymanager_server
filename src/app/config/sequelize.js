const { config } = require('dotenv')
const { resolve } = require('path')

config({ path: resolve(__dirname, '..', '..', '..', '.env') })

const {
	DB_HOST,
	DB_NAME,
	DB_USER,
	DB_PASS,
	DB_PORT,
	DB_TEST,
	NODE_ENV,
} = process.env

module.exports = {
	host: DB_HOST,
	username: DB_USER,
	password: DB_PASS,
	database: NODE_ENV === 'test' ? DB_TEST : DB_NAME,
	dialect: 'mysql',
	port: DB_PORT,
	logging: false,
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
}
