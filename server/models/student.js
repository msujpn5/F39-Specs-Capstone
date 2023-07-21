const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Student: sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName: DataTypes.STRING,
        middleName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        gender: DataTypes.STRING,
        age: DataTypes.STRING
    })
}