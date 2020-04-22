import { Router } from 'express'
import AuthController from './app/controllers/AuthController'

const router = Router({ caseSensitive: false })

router.get('/auth', AuthController.signIn)

export default router
