import { NextFunction, Request, Response } from 'express'

export default (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err)

	res.status(500).json({ error: `${err.name} - ${err.message}` })
}
