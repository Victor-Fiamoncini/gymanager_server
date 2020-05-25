import multer from 'multer'
import multerConfig from '../config/multer'

export default {
	single: (field: string) => multer(multerConfig).single(field),
}
