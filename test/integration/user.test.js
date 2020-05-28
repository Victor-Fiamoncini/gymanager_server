import request from 'supertest'
import { _app } from '../bootstrap'
import truncate from '../truncate'

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
