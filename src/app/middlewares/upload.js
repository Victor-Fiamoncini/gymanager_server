import multer from 'multer'
import multerConfig from '../config/multer'

export default {
	single: (requestField) => multer(multerConfig).single(requestField),
}
