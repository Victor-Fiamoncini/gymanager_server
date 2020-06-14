import { DataTypes, Model } from 'sequelize'

export default class Plan extends Model {
	static init(connection) {
		super.init(
			{
				title: DataTypes.STRING,
				duration: DataTypes.STRING,
				price: DataTypes.INTEGER,
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
	}
}
