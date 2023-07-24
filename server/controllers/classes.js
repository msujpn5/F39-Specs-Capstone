const {User} = require('../models/user')
const {teacherClass} = require('../models/class')

module.exports = {
    getCurrentUserClasses: async (req, res) => {
        try {
            const {userId} = req.params
            const classes = await teacherClass.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`email`]
                }]
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
            const {subject, time, classroom, userId} = req.body
            await teacherClass.create({subject, time, classroom, userId})
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
            await teacherClass.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN deleteClass')
            console.log(error)
            res.sendStatus(400)
        }
    }
}