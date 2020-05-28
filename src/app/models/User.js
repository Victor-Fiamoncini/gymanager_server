import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'

export default class User extends Model {
	static init(connection) {
		super.init(
			{
				name: DataTypes.STRING,
				email: DataTypes.STRING,
				password: DataTypes.STRING,
				photo: DataTypes.STRING,
				photo_url: DataTypes.STRING,
			},
			{
				sequelize: connection,
			}
		)

		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.password = await bcrypt.hash(user.password, 10)
			}
		})

		return this
	}
}
