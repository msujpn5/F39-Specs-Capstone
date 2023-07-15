const {User} = require('../models/user')
const {Class} = require('../models/class')
const {Student} = require('../models/student')

module.exports = {
    getCurrentUserClasses: async (req, res) => {
        try {
            const {userId} = req.params
            const classes = await Class.findAll({
                where: {userId: userId}
            })
            res.status(200).send(classes)
        } catch (error) {
            console.log('ERROR IN getCurrentUserClasses')
            console.log(error)
            res.sendStatus(400)
        }
    },

    addClass: async (req, res) => {
        try {
            const {fullName, subject, userId} = req.body
            await Class.create({fullName, subject, userId})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN addClass')
            console.log(error)
            res.sendStatus(400)
        }
    },

    deleteClass: async (req, res) => {
        try {
            const {id} = req.params 
            await Class.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN deleteClass')
            console.log(error)
            res.sendStatus(400)
        }
    }
}