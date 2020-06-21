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
	process.env.NODE_ENV === 'test' ? [] : middlewares.brute.prevent,
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
 * Public ForgotPassword
 */
router.post(
	'/forgot',
	middlewares.async(controllers.ForgotPasswordController.store)
)
router.put(
	'/reset',
	validators.ForgotPasswordValidator.reset,
	middlewares.async(controllers.ForgotPasswordController.reset)
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
	middlewares.current,
	middlewares.async(controllers.SessionController.refresh)
)

/**
 * Protected Users
 */
router.get(
	'/users',
	middlewares.current,
	middlewares.async(controllers.UserController.show)
)
router.put(
	'/users',
	[validators.UserValidator.update, middlewares.current],
	middlewares.async(controllers.UserController.update)
)
router.delete(
	'/users',
	middlewares.current,
	middlewares.async(controllers.UserController.destroy)
)
router.put(
	'/users/photo',
	[middlewares.current, middlewares.upload.single('photo')],
	middlewares.async(controllers.UserController.storePhoto)
)

/**
 * Protected Students
 */
router.get('/students', middlewares.async(controllers.StudentController.index))
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

/**
 * Protected Plans
 */
router.get('/plans', middlewares.async(controllers.PlanController.index))
router.post(
	'/plans',
	validators.PlanValidator.store,
	middlewares.async(controllers.PlanController.store)
)
router.put(
	'/plans/:id',
	validators.PlanValidator.update,
	middlewares.async(controllers.PlanController.update)
)
router.delete(
	'/plans/:id',
	middlewares.async(controllers.PlanController.destroy)
)

/**
 * Protected Registrations
 */
router.post(
	'/registrations',
	validators.RegistrationValidator.store,
	middlewares.async(controllers.PlanController.store)
)

export default router
