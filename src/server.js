import './bootstrap'
import App from './App'

const { app } = new App()
const { PORT } = process.env

app.listen(PORT, () => console.log(`Server running at ${PORT} ☕️`))
