import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(__dirname, '..', '.env') })

import App from './App'

const { app } = new App()
const { PORT } = process.env

app.listen(PORT, () => console.log(`Server running at ${PORT}`))
