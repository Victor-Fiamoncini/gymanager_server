import request from 'supertest'

import app from '../utils/bootstrap'
import truncate from '../utils/truncate'
import { User } from '../../src/app/models'

describe('Sessions', () => {
	beforeAll(() => {
		truncate()
	})

	beforeEach(() => {
		truncate()
	})

	afterAll(() => {
		truncate()
	})

	it('should get a valid/payloaded JWT token with valid credentials', async () => {
		await User.create({
			name: 'Victor',
			email: 'victor@gmail.com',
			password: '1234567',
		})

		const res = await request(app).post('/sessions').send({
			email: 'victor@gmail.com',
			password: '1234567',
		})

		expect(res.status).toBe(200)
		expect(res.body.token.length).toBeGreaterThan(30)
	})

	it('should get a user from payloaded JWT token', async () => {
		await User.create({
			name: 'Victor',
			email: 'victor@gmail.com',
			password: '1234567',
		})

		const user = await request(app).post('/sessions').send({
			email: 'victor@gmail.com',
			password: '1234567',
		})

		const res = await request(app)
			.get('/sessions')
			.set('Authorization', `Bearer ${user.body.token}`)

		expect(res.status).toBe(200)
		expect(res.body.name).toBe('Victor')
		expect(res.body.email).toBe('victor@gmail.com')
	})
})
