import request from 'supertest'
import { getCustomRepository } from 'typeorm'

import connection from '../connection'
import App from '../../src/App'
import UserRepository from '../../src/app/models/User/UserRepository'

const { _app } = new App()

describe('Users', () => {
	connection()

	beforeAll(async () => {
		await getCustomRepository(UserRepository).clear()
	})

	beforeEach(async () => {
		await getCustomRepository(UserRepository).clear()
	})

	it('should store a new user', async () => {
		const res = await request(_app).post('/users').send({
			name: 'Victor',
			email: 'victor.fiamoncini@gmail.com',
			password: '1234567',
		})

		expect(res.status).toBe(201)
		expect(res.body).toEqual(
			expect.objectContaining({
				name: 'Victor',
				email: 'victor.fiamoncini@gmail.com',
			})
		)
	})
})
