const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Subject: sequelize.define('subject', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        subject: DataTypes.STRING
    })
}