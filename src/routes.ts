import { Router } from 'express'
import UserController from './app/controllers/UserController'

const router = Router({ caseSensitive: false })

// router.get('/users/:id', UserController.show)
router.post('/users', UserController.store)
// router.put('/users', UserController.update)
// router.delete('/users/:id', UserController.destroy)

export default router
