const {User} = require('../models/user')
const {Student} = require('../models/student')

module.exports = {
    getAllStudents: async (req, res) => {
        try {
            const {userId} = req.params
            const students = await Student.findAll({
                where: {userId: userId},
                include: [{
                    model: User,
                    required: true,
                    attributes: [`email`]
                }]
            })
            res.status(200).send(students)
        } catch (error) {
            console.log('ERROR IN getAllStudents')
            console.log(error)
            res.sendStatus(400)
        }
    },

    addStudent: async (req, res) => {
        try {
            const {firstName, middleName, lastName, gender, age, classId, userId} = req.body
            await Student.create({firstName, middleName, lastName, gender, age, classId, userId})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN addStudent')
            console.log(error)
            res.sendStatus(400)
        }
    },

    deleteStudent: async (req, res) => {
        try {
            const {id} = req.params 
            await Student.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN deleteStudent')
            console.log(error)
            res.sendStatus(400)
        }
    }
}