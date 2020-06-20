import sequelize from '../../src/app/database'

export default () => {
	sequelize.transaction(t => {
		const options = { raw: true, transaction: t }

		return sequelize
			.query('SET FOREIGN_KEY_CHECKS = 0', options)
			.then(() => {
				return sequelize.query('truncate table users', options)
			})
			.then(() => {
				return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options)
			})
	})
}
