import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class User extends Model {
	static init(connection) {
		super.init(
			{
				name: DataTypes.STRING,
				email: DataTypes.STRING,
				password: DataTypes.VIRTUAL,
				password_hash: DataTypes.STRING,
				photo: DataTypes.STRING,
				photo_url: DataTypes.STRING,
			},
			{
				sequelize: connection,
			}
		)

		this.addHook('beforeSave', async (user) => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 10)
			}

			if (user.photo) {
				const { APP_URL, FILE_URL_PREFIX } = process.env

				user.photo_url = `${APP_URL}/${FILE_URL_PREFIX}/${user.photo}`
			}
		})

		this.addHook('beforeUpdate', async (user) => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 10)
			}
		})

		return this
	}

	async matchPassword(password) {
		return await bcrypt.compare(password, this.password_hash)
	}

	generateToken() {
		const { JWT_AUTH_SECRET, JWT_EXPIRES } = process.env

		return jwt.sign({ id: this.id }, JWT_AUTH_SECRET, {
			expiresIn: Number(JWT_EXPIRES),
		})
	}
}
