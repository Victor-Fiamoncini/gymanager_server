import './bootstrap'
import App from './App'

const { _app } = new App()
const { PORT } = process.env

_app.listen(PORT, () => console.log(`Server running at ${PORT} 🚀`))
