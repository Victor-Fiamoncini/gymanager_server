import Sequelize from 'sequelize'

import * as models from '../models'
import databaseConfig from '../config/sequelize'

const connection = new Sequelize(databaseConfig)

Object.values(models).map(model => model.init(connection))
Object.values(models).map(model => model.associate(connection.models))

export default connection
