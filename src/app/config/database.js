const {
	DB_HOST,
	DB_NAME,
	DB_USER,
	DB_PASS,
	DB_PORT,
	DB_TEST,
	NODE_ENV,
} = process.env

export default {
	host: DB_HOST,
	username: DB_USER,
	password: DB_PASS,
	database: NODE_ENV === 'test' ? DB_TEST : DB_NAME,
	dialect: 'mysql',
	port: DB_PORT,
	operatorsAliases: false,
	logging: false,
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
}
