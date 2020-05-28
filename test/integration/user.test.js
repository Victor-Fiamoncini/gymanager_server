import request from 'supertest'

import { _app } from '../utils/bootstrap'
import truncate from '../utils/truncate'

describe('Users', () => {
	beforeAll(async () => {
		await truncate()
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

	afterAll(async () => {
		await truncate()
	})
})
