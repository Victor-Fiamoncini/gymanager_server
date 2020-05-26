import request from 'supertest'
import { getCustomRepository } from 'typeorm'

import connection from '../connection'
import App from '../../src/App'
import UserRepository from '../../src/app/models/User/UserRepository'

const { _app } = new App()

describe('Users', () => {
	connection()

	beforeAll(async () => {
		await request(_app).post('/users').send({
			name: 'Victor',
			email: 'victor.fiamoncini@gmail.com',
			password: '1234567',
		})
	})

	afterAll(async () => {
		await getCustomRepository(UserRepository).clear()
	})

	it('should get a valid payloaded JWT token', async () => {
		const res = await request(_app).post('/sessions').send({
			email: 'victor.fiamoncini@gmail.com',
			password: '1234567',
		})

		expect(res.status).toBe(200)
		expect(res.body.token.length).toBeGreaterThan(40)
		expect(res.body.user).toEqual(
			expect.objectContaining({
				id: 1,
				name: 'Victor',
				email: 'victor.fiamoncini@gmail.com',
			})
		)
	})
})
