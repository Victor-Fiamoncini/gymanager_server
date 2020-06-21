import { User } from '../models'

import message from '../utils/message'
import { sessions } from '../messages/errors'

export default async (req, res, next) => {
	const user = await User.findByPk(req.userId)

	if (!user) {
		return res.status(401).json(message(sessions.unauthorized))
	}

	req.user = user
	return next()
}
