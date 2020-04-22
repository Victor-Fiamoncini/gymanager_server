declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: number
		DB_NAME: string
		DB_USER: string
		DB_PASS: string
		DB_PORT: number
		DB_DIALECT: string
		JWT_AUTH_SECRET: string
	}
}
