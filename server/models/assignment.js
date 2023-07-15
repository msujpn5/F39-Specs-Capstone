const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Assignment: sequelize.define('assignment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        assignmentName: DataTypes.STRING,
        score: DataTypes.INT,
        dateSubmitted: DataTypes.STRING
    })
}