import App from '../src/App'

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env

export const { _app } = new App()
