const {User} = require('../models/user')
const {Class} = require('../models/class')
const {Assignment} = require('../models/assignment')

module.exports = {
    getCurrentClassAssignments: async (req, res) => {
        try {
            const {userId} = req.params
            const assignments = await Assignments.findAll({
                where: {userId: userId}
            })
            res.status(200).send(assignments)
        } catch (error) {
            console.log('ERROR IN getCurrentClassAssignments')
            console.log(error)
            res.sendStatus(400)
        }
    },

    addAssignment: async (req, res) => {
        try {
            const {assignmentName, maxScore, dateDue, userId} = req.body
            await Assignment.create({assignmentName, maxScore, dateDue, userId})
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