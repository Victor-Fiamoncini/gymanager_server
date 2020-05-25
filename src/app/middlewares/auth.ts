import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { AuthRequest, Decoded } from '../types'

export default (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): NextFunction | Response<object> => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({ error: 'No token provided' })
	}

	const parts = authorization.split(' ')

	if (parts.length !== 2) {
		return res.status(401).json({ error: 'Malformatted token' })
	}

	const [scheme, token] = parts

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).json({ error: 'Malformatted token' })
	}

	jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decoded: Decoded) => {
		if (err) {
			return res.status(401).json({ error: 'No valid token' })
		}

		req.userId = decoded.id
		return next()
	})
}
