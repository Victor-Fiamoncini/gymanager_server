import * as models from '../../src/app/models'
import sequelize from '../../src/app/database'

export default async () => {
	await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })

	return await models.User.destroy({
		cascade: true,
		truncate: true,
		force: true,
	})
}
