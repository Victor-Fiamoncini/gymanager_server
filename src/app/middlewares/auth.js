import jwt from 'jsonwebtoken'
import { sessions } from '../messages/errors'

export default (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({ error: sessions.noToken })
	}

	const parts = authorization.split(' ')

	if (parts.length !== 2) {
		return res.status(401).json({ error: sessions.malformattedToken })
	}

	const [scheme, token] = parts

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).json({ error: sessions.malformattedToken })
	}

	try {
		const { id } = jwt.verify(token, process.env.JWT_AUTH_SECRET)

		req.userId = id.toString()
		return next()
	} catch (err) {
		return res.status(401).json({ error: sessions.invalidToken })
	}
}
