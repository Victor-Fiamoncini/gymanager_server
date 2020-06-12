import Sequelize from 'sequelize'

import * as models from '../models'
import databaseConfig from '../config/sequelize'

const connection = new Sequelize(databaseConfig)

Object.values(models).map(model => model.init(connection))

export default connection
