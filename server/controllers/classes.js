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
            console.log('ERROR in getCurrentUserClasses')
            console.log(error)
            res.sendStatus(400)
        }
    },

    addClass: async (req, res) => {
        try {
            
        }
    }
}