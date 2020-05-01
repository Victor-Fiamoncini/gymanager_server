import { Router } from 'express'
import withUpload from './app/middlewares/withUpload'

import UserController from './app/controllers/UserController'

const router = Router({ caseSensitive: false })

router.post('/users', withUpload.single('photo'), UserController.store)
// router.get('/users/:id', UserController.show)
// router.put('/users', UserController.update)
// router.delete('/users/:id', UserController.destroy)

export default router
