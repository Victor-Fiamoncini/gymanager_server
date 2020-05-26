import {
	BeforeInsert,
	BeforeUpdate,
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

@Entity({ name: 'users' })
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column('varchar', { length: 255, nullable: false })
	name: string

	@Column('varchar', { nullable: false, unique: true })
	email: string

	@Column('varchar', { nullable: false, select: false })
	password: string

	@Column('varchar', { nullable: true, default: '' })
	photo: string

	@Column('varchar', { nullable: true, default: '' })
	photoUrl: string

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: number

	@BeforeInsert()
	public async beforeInsert() {
		if (this.password) {
			this.password = await this.encrypt(this.password)
		}
	}

	@BeforeUpdate()
	public async beforeUpdate() {
		console.log(this.password)
		console.log('AQUIIII')

		if (this.password) {
			this.password = await this.encrypt(this.password)
		}

		if (this.photo) {
			this.photoUrl = `${process.env.APP_URL}/files/${this.photo}`
		}
	}

	public async encrypt(password: string) {
		return await bcrypt.hash(password, await bcrypt.genSalt(10))
	}

	public async matchPassword(password: string) {
		return await bcrypt.compare(password, this.password)
	}

	public generateToken() {
		const { JWT_AUTH_SECRET, JWT_EXPIRES } = process.env

		return jwt.sign({ id: this.id }, JWT_AUTH_SECRET!, {
			expiresIn: Number(JWT_EXPIRES),
		})
	}
}
