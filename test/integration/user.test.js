import request from 'supertest'
import { resolve } from 'path'

import { app } from '../utils/bootstrap'
import truncate from '../utils/truncate'
import { User } from '../../src/app/models'

describe('Users', () => {
	beforeAll(async () => {
		await truncate()
	})

	it('should store a new user', async () => {
		const res = await request(app).post('/users').send({
			name: 'Victor Beninca',
			email: 'victor@hotmail.com',
			password: '1234567',
		})

		expect(res.status).toBe(201)
		expect(res.body).toEqual(
			expect.objectContaining({
				name: 'Victor Beninca',
				email: 'victor@hotmail.com',
			})
		)
	})

	it('should update a user information', async () => {
		const user = await request(app).post('/sessions').send({
			email: 'victor@hotmail.com',
			password: '1234567',
		})

		const res = await request(app)
			.put(`/users/${user.body.user.id}`)
			.set('Authorization', `Bearer ${user.body.token}`)
			.send({
				name: 'Victor Fiamoncini',
				email: 'victor@hotmail.com',
				password: '1234567',
			})

		expect(res.status).toBe(200)
		expect(res.body.name).toBe('Victor Fiamoncini')
	})

	it('should store user photo and get his url', async () => {
		await User.create({
			name: 'Victor',
			email: 'victor@hotmail.com',
			password: '1234567',
		})

		const user = await request(app).post('/sessions').send({
			email: 'victor@hotmail.com',
			password: '1234567',
		})

		const res = await request(app)
			.put(`/users/${user.body.user.id}/photo`)
			.set('Authorization', `Bearer ${user.body.token}`)
			.attach('photo', resolve(__dirname, '..', 'photo.jpeg'))

		expect(res.status).toBe(200)
	})

	afterAll(async () => {
		await truncate()
	})
})
