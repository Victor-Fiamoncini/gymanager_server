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

	@Column('varchar', { length: 255 })
	name: string

	@Column('varchar', { nullable: false, unique: true })
	email: string

	@Column('varchar', { nullable: false })
	password: string

	@Column('varchar')
	photo: string

	@Column('varchar')
	photoUrl: string

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: number

	@BeforeInsert()
	async beforeInsert() {
		this.updatedAt = Date.now()

		if (this.password) {
			this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10))
		}

		if (this.photo) {
			this.photoUrl = `${process.env.APP_URL}/files/${this.photo}`
		}
	}

	@BeforeUpdate()
	async beforeUpdate() {
		this.updatedAt = Date.now()

		if (this.password) {
			this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10))
		}

		if (this.photo) {
			this.photoUrl = `${process.env.APP_URL}/files/${this.photo}`
		}
	}
}
