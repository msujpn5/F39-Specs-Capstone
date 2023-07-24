const {User} = require('../models/user')
const {Assignment} = require('../models/assignment')

module.exports = {
    getAllAssignments: async (req, res) => {
        try {
            const {userId} = req.params
            const assignments = await Assignment.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`email`]
                }]
            })
            res.status(200).send(assignments)
        } catch (error) {
            console.log('ERROR IN getAllAssignments')
            console.log(error)
            res.sendStatus(400)
        }
    },

    addAssignment: async (req, res) => {
        try {
            const {assignmentName, maxScore, dateDue, classId, userId} = req.body
            await Assignment.create({assignmentName, maxScore, dateDue, classId, userId})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN addAssignment')
            console.log(error)
            res.sendStatus(400)
        }
    },

    deleteAssignment: async (req, res) => {
        try {
            const {id} = req.params 
            await Assignment.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN deleteAssignment')
            console.log(error)
            res.sendStatus(400)
        }
    }
}