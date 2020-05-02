import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Length, IsNotEmpty, IsEmail } from 'class-validator'
import { hash } from 'bcrypt'

import errors from '../config/messages/errors'

@Entity({ name: 'users' })
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: number

	@Column('varchar', { length: 255 })
	name: string

	@Column('varchar', { nullable: false, unique: true })
	@IsEmail({}, { message: errors.users.email.isEmail })
	@IsNotEmpty({ message: errors.users.email.isNotEmpty })
	email: string

	@Column('varchar', { nullable: false })
	@Length(6, undefined, { message: errors.users.password.length })
	password: string

	@Column('varchar')
	photo: string

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: string;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: number;

	@BeforeInsert()
	@BeforeUpdate()
	async onInsertAndOnUpdate() {
		this.updatedAt = Date.now()

		if (this.password)
			this.password = await hash(this.password, 10)
	}
}
