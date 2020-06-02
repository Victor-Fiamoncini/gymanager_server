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
}
