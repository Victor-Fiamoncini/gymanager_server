import { Router } from 'express'

import * as controllers from './app/controllers'
import * as middlewares from './app/middlewares'
import * as validators from './app/validators'

const router = Router()

/**
 * Session
 */
router.post('/sessions', middlewares.async(controllers.SessionController.store))
router.get(
	'/sessions',
	middlewares.async(controllers.SessionController.refresh)
)

/**
 * User
 */
router.post(
	'/users',
	validators.UserValidator.store,
	middlewares.async(controllers.UserController.store)
)
router.put(
	'/users/:id',
	validators.UserValidator.update,
	middlewares.async(controllers.UserController.update)
)
router.put(
	'/users/:id/photo',
	middlewares.upload.single('photo'),
	middlewares.async(controllers.UserController.update)
)

export default router
