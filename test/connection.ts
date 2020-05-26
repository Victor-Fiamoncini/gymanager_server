import { Connection, createConnection } from 'typeorm'

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env

export default function () {
	let con: Connection

	beforeAll(async () => {
		con = await createConnection({
			type: 'mysql',
			host: DB_HOST,
			port: Number(DB_PORT),
			username: DB_USER,
			password: DB_PASS,
			database: DB_NAME,
			logging: false,
			synchronize: false,
			entities: [__dirname + '../src/app/models/User/User.ts'],
		})
	})

	afterAll(async () => {
		await con.close()
	})
}
