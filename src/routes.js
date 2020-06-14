import { Router } from 'express'

import * as controllers from './app/controllers'
import * as middlewares from './app/middlewares'
import * as validators from './app/validators'

const router = Router()

/**
 * Public Sessions
 */
router.post(
	'/sessions',
	middlewares.brute.prevent,
	middlewares.async(controllers.SessionController.store)
)

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

/**
 * Protected Students
 */
router.get('/students/', middlewares.async(controllers.StudentController.index))
router.get(
	'/students/:id',
	middlewares.async(controllers.StudentController.show)
)
router.post(
	'/students',
	validators.StudentValidator.store,
	middlewares.async(controllers.StudentController.store)
)
router.put(
	'/students/:id',
	validators.StudentValidator.update,
	middlewares.async(controllers.StudentController.update)
)
router.delete(
	'/students/:id',
	middlewares.async(controllers.StudentController.destroy)
)

export default router
