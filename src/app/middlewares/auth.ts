import { Response, NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

import { AuthRequest } from '../types'

export default (req: AuthRequest, res: Response, next: NextFunction) => {
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

	const secret: Secret = process.env.JWT_AUTH_SECRET!

	try {
		const decoded: any = jwt.verify(token, secret)

		req.userId = decoded.id.toString()
		return next()
	} catch (err) {
		return res.status(401).json({ error: 'Invalid token' })
	}
}
