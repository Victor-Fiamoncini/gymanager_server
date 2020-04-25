import { Request, Response } from 'express'

class AuthController {
	public async signIn(req: Request, res: Response) {
		return res.send('Hello world')
	}

	public async signUp(req: Request, res: Response) {
		return res.send('Hello world')
	}
}

export default new AuthController()
