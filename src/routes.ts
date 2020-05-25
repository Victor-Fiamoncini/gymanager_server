import { Router } from 'express'

import * as controllers from './app/controllers'
import * as middlewares from './app/middlewares'
import * as validators from './app/validators'

const router = Router()

router.post('/sessions', controllers.SessionController.store)
router.get('/sessions', controllers.SessionController.refresh)

router.post(
	'/users',
	validators.UserValidator.store,
	controllers.UserController.store
)

router.put(
	'/users/:id',
	validators.UserValidator.update,
	controllers.UserController.update
)

router.put(
	'/users/:id/photo',
	middlewares.withUpload.single('photo'),
	controllers.UserController.update
)

export default router
