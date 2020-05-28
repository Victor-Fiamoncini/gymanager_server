import { DataTypes, Model } from 'sequelize'

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
	}
}
