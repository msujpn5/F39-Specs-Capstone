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
        fullName: DataTypes.STRING
    })
}