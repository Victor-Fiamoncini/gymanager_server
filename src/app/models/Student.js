import { DataTypes, Model } from 'sequelize'

export default class Student extends Model {
	static init(connection) {
		super.init(
			{
				name: DataTypes.STRING,
				email: DataTypes.STRING,
				age: DataTypes.INTEGER,
				weight: DataTypes.FLOAT,
				height: DataTypes.FLOAT,
			},
			{
				sequelize: connection,
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user',
		})

		this.hasOne(models.Registration, {
			foreignKey: 'registration_id',
			as: 'registration',
		})
	}
}
