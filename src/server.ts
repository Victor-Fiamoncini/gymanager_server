import { config } from 'dotenv'
import { resolve } from 'path'
import App from './App'

config({ path: resolve(__dirname, '..', '.env') })

const { app } = new App()
const { PORT } = process.env

app.listen(PORT, () => console.log(`Server running at ${PORT}`))
