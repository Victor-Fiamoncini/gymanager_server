import { Router } from 'express'
import User from '../app/models/User'
import UserController from '../app/controllers/UserController'

import withUpload from '../app/middlewares/withUpload'

const router = Router()

const user = new User()
const userController = new UserController(user)

router.post('/', withUpload.single('photo'), (req, res) => userController.store(req, res))

export default router
