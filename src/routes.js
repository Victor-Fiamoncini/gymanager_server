import { Router } from 'express'

import * as controllers from './app/controllers'
import * as middlewares from './app/middlewares'
import * as validators from './app/validators'

const router = Router()

/**
 * Public Sessions
 */
router.post('/sessions', middlewares.async(controllers.SessionController.store))

/**
 * Public Users
 */
router.post(
	'/users',
	validators.UserValidator.store,
	middlewares.async(controllers.UserController.store)
)

/**
 * Protected routes
 */
router.use(middlewares.auth)

/**
 * Protected Sessions
 */
router.get(
	'/sessions',
	middlewares.async(controllers.SessionController.refresh)
)

/**
 * Protected Users
 */
router.get('/users/:id', middlewares.async(controllers.UserController.show))
router.put(
	'/users/:id',
	validators.UserValidator.update,
	middlewares.async(controllers.UserController.update)
)
router.delete(
	'/users/:id',
	middlewares.async(controllers.UserController.destroy)
)
router.put(
	'/users/:id/photo',
	middlewares.upload.single('photo'),
	middlewares.async(controllers.UserController.storePhoto)
)

export default router
