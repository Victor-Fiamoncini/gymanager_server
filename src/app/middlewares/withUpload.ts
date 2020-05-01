import multer from 'multer'
import multerConfig from '../config/upload/multer'

export default {
	single: (fieldName: string) => multer(multerConfig).single(fieldName),
}
