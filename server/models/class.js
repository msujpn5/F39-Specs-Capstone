const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Class: sequelize.define('class', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        subject: DataTypes.STRING,
        time: DataTypes.STRING,
        classroom: DataTypes.STRING
    })
}