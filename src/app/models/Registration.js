import { DataTypes, Model } from 'sequelize'

export default class Registration extends Model {
	static init(connection) {
		super.init(
			{
				start_date: DataTypes.DATE,
				end_date: DataTypes.DATE,
				price: DataTypes.FLOAT,
				student_id: DataTypes.INTEGER,
				plan_id: DataTypes.INTEGER,
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

		this.belongsTo(models.Student, {
			foreignKey: 'student_id',
			as: 'student',
		})

		this.belongsTo(models.Plan, {
			foreignKey: 'plan_id',
			as: 'plan',
		})
	}
}
