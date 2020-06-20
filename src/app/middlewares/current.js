import customMessage from '../messages/customMessage'
import { sessions } from '../messages/errors'

export default (req, res, next) => {
	if (req.params.id !== req.userId) {
		return res.status(401).json(customMessage(sessions.unauthorized))
	}

	return next()
}
