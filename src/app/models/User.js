import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

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
				reset_password_token: DataTypes.STRING,
				reset_password_expire: DataTypes.DATE,
			},
			{
				sequelize: connection,
			}
		)

		this.addHook('beforeSave', async user => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 10)
			}

			if (user.photo) {
				const { APP_URL, FILE_URL_PREFIX } = process.env

				user.photo_url = `${APP_URL}/${FILE_URL_PREFIX}/${user.photo}`
			}
		})

		this.addHook('beforeUpdate', async user => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 10)
			}
		})

		return this
	}

	static associate(models) {
		this.hasMany(models.Student, {
			foreignKey: 'user_id',
			as: 'students',
		})

		this.hasMany(models.Plan, {
			foreignKey: 'user_id',
			as: 'plans',
		})

		this.hasMany(models.Registration, {
			foreignKey: 'user_id',
			as: 'registrations',
		})
	}

	async matchPassword(password) {
		return await bcrypt.compare(password, this.password_hash)
	}

	generateJwtToken() {
		const { JWT_AUTH_SECRET, JWT_EXPIRES } = process.env

		return jwt.sign({ id: this.id }, JWT_AUTH_SECRET, {
			expiresIn: Number(JWT_EXPIRES),
		})
	}

	generateResetPasswordToken() {
		const resetToken = crypto.randomBytes(16).toString('hex')

		this.reset_password_token = crypto
			.createHash('sha256')
			.update(resetToken)
			.digest('hex')

		this.reset_password_expire = Date.now() + 10 * 60 * 1000

		return resetToken
	}
}
