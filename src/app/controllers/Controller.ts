import { NextFunction, Request, Response } from "express";

/**
 * @class Controller
 */
export abstract class Controller {
	protected abstract executeImpl(req: Request, res: Response, next?: NextFunction): Promise<any>

	public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			await this.executeImpl(req, res, next)
		} catch (err) {
			// this.fail(res, 'An error occurred'.)
		}
	}

	public static jsonResponse(res: Response, code: number, message: string | object): Response {
		return res.status(code).json(message)
	}
}
