import { createConnection, getCustomRepository } from 'typeorm'
import request from 'supertest'

import App from '../../src/App'
import User from '../../src/app/models/User/User'
import UserRepository from '../../src/app/models/User/UserRepository'

const { _app } = new App()
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env
const userRepository = getCustomRepository(UserRepository)

describe('Users', () => {
	beforeAll(async () => {
		await createConnection({
			type: 'mysql',
			host: DB_HOST,
			port: Number(DB_PORT),
			username: DB_USER,
			password: DB_PASS,
			database: DB_NAME,
			logging: false,
			synchronize: false,
			entities: [User],
		})
	})

	beforeEach(async () => {
		await userRepository.clear()
	})

	it('should store a new user', async () => {
		const res = await request(_app).post('/users').send({
			name: 'Victor',
			email: 'victor.fiamoncini@gmail.com',
			password: '1234567',
		})

		console.log(res.body)

		expect(res.status).toBe(201)
		expect(res.body).toEqual(
			expect.objectContaining({
				name: 'Victor',
				email: 'victor.fiamoncini@gmail.com',
			})
		)
	})
})
