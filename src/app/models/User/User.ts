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

@Entity({ name: 'users' })
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column('varchar', { length: 255, nullable: false })
	name: string

	@Column('varchar', { nullable: false, unique: true })
	email: string

	@Column('varchar', { nullable: false })
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
	async beforeInsert() {
		if (this.password) {
			this.password = await this.encrypt(this.password)
		}
	}

	@BeforeUpdate()
	async beforeUpdate() {
		if (this.password) {
			this.password = await this.encrypt(this.password)
		}

		if (this.photo) {
			this.photoUrl = `${process.env.APP_URL}/files/${this.photo}`
		}
	}

	async encrypt(password: string) {
		return await bcrypt.hash(password, await bcrypt.genSalt(10))
	}
}
