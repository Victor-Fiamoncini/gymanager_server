import { Request } from 'express'
import { resolve } from 'path'
import { randomBytes } from 'crypto'
import multer, { FileFilterCallback } from 'multer'

const pathToUploads = resolve(
	__dirname,
	'..',
	'..',
	'..',
	'..',
	'temp',
	'uploads'
)

const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']

export default {
	dest: pathToUploads,
	storage: multer.diskStorage({
		destination: (req, file: Express.Multer.File, callback) => {
			callback(null, pathToUploads)
		},
		filename: (req: Request, file: Express.Multer.File, callback) => {
			randomBytes(16, (err: Error, buf: Buffer) => {
				if (err) {
					callback(err, '')
				}

				const filename = `${buf.toString('hex')}-${file.originalname}`
				callback(null, filename)
			})
		},
	}),
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (
		req: Request,
		file: Express.Multer.File,
		callback: FileFilterCallback
	) => {
		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true)
		} else {
			callback(new Error('Invalid file type'))
		}
	},
}
