import { resolve } from 'path'
import { createConnection } from 'typeorm'
import request, { Response } from 'supertest'

import App from '../../src/App'
import User from '../../src/app/models/User'

const { getApp } = new App()

describe('User', () => {
	beforeAll(async () => {
		await createConnection({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			logging: false,
			synchronize: false,
			entities: [User]
		})
	})

	beforeEach(async () => {
		await User.clear()
	})

	it('should store a new user', async () => {
		const res: Response = await request(getApp)
			.post('/users')
			.field('name', 'Victor')
			.field('email', 'victor.fiamoncini@gmail.com')
			.field('password', '1234567')
			.attach('photo', resolve(__dirname, '..', 'photo.jpeg'))

		expect(res.status).toBe(201)
		expect(res.body).toEqual(
			expect.objectContaining({
				name: 'Victor',
				email: 'victor.fiamoncini@gmail.com',
			})
		)
	})
})
