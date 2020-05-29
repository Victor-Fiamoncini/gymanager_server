import request from 'supertest'

import { _app } from '../utils/bootstrap'
import truncate from '../utils/truncate'
import { User } from '../../src/app/models'

describe('Users', () => {
	beforeAll(async () => {
		await truncate()
	})

	beforeEach(async () => {
		await User.destroy({ truncate: true, force: true })
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

	it('should update a user informations', async () => {
		await User.create({
			name: 'Victor',
			email: 'victor.fiamoncini@gmail.com',
			password: '1234567',
		})

		const user = await request(_app).post('/sessions').send({
			email: 'victor.fiamoncini@gmail.com',
			password: '1234567',
		})

		const res = await request(_app)
			.put('/users')
			.set('Authorization', `Bearer ${user.body.token}`)
			.send({
				name: 'Victor Beninca',
				email: 'victor.fiamoncini@gmail.com',
				password: '1234567',
			})

		console.log(res.body)

		expect(res.status).toBe(200)
	})

	afterAll(async () => {
		await truncate()
	})
})
