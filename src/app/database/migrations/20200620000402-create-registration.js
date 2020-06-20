'use strict'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('registrations', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			start_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			end_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			student_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'students',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			plan_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'plans',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		})
	},

	down: queryInterface => {
		return queryInterface.dropTable('registrations')
	},
}
