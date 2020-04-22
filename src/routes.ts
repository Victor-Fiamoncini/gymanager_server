import { Router } from 'express'
import UserController from './app/controllers/UserController'

const router = Router({ caseSensitive: false })

router.get('/', UserController.index)

export default router
