import jwt from 'jsonwebtoken'
import errors from '../config/messages/errors'

export default (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({ error: errors.sessions.noToken })
	}

	const parts = authorization.split(' ')

	if (parts.length !== 2) {
		return res.status(401).json({ error: errors.sessions.malformattedToken })
	}

	const [scheme, token] = parts

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).json({ error: errors.sessions.malformattedToken })
	}

	try {
		const { id } = jwt.verify(token, process.env.JWT_AUTH_SECRET)

		req.userId = id.toString()
		return next()
	} catch (err) {
		return res.status(401).json({ error: errors.sessions.invalidToken })
	}
}
