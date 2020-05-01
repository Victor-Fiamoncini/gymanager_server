import multer from 'multer'
import { resolve } from 'path'
import { randomBytes } from 'crypto'
import { Request } from 'express'

type MulterCallback = (error: Error | null, filename?: string) => void

export default {
	dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
	storage: multer.diskStorage({
		destination: () => {},
		filename: () => {},
	}),
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (req: Request, file: Express.Multer.File, callback: MulterCallback) => {
		const allowedMimes = [
			'image/jpeg',
			'image/pjpeg',
			'image/png',
		]

		if (allowedMimes.includes(file.mimetype))
			return callback(null, file.filename)

		return callback(new Error('Invalid file type'))
	},
}
