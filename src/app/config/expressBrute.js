import Brute from 'express-brute'
import SequelizeBruteStore from 'express-brute-sequelize'
import connection from '../database'

const sequelizeBruteStore = new SequelizeBruteStore(
	connection,
	'brute_stores',
	{
		freeRetries: 5,
		minWait: 5 * 60 * 1000,
		maxWait: 60 * 60 * 1000,
		lifetime: 24 * 60 * 60,
	},
	store => store
)

export default new Brute(sequelizeBruteStore)
