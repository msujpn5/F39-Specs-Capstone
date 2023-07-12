const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Teacher: sequelize.define('teacher', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING
    })
}