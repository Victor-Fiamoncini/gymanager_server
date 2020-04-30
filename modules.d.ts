declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: number
		NODE_ENV: string
		DB_HOST: string
		DB_USER: string
		DB_PASS: string
		DB_NAME: string
		DB_PORT: number
		DB_TEST: string
		JWT_AUTH_SECRET: string
	}
}
