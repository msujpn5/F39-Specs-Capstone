require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {User} = require('../models/user')
const {SECRET} = process.env

function createToken (email, id) {
    return jwt.sign(
        {
            email,
            id
        },
        SECRET,
        {
            expiresIn: '2 days'
        }
    )
}
module.exports = {
    register: async (req, res) => {
        try {
            const {email, password} = req.body 
            let foundUser = await User.findOne({where: {email}})
            if (foundUser) {
                res.status(400).send('cannot create user')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({email, hashedPass: hash})
                const token = createToken(newUser.dataValues.email, newUser.dataValues.id)
                console.log('TOKEN:', token)
                const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    email: newUser.dataValues.email,
                    userId: newUser.dataValues.id,
                    token,
                    exp
                })
            }
        } catch (error) {
            console.log('ERROR IN register')
            console.log(error)
            res.sendStatus(400)
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body
            let foundUser = await User.findOne({where: {email}})

            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)

                if (isAuthenticated) {
                    const token = createToken(foundUser.dataValues.email, foundUser.dataValues.id)
                    const exp = Date.now() + 1000 * 60 * 60 * 48
                    res.status(200).send({
                        email: foundUser.dataValues.email,
                        userId: foundUser.dataValues.id,
                        token,
                        exp
                    })
                } else {
                    res.status(400).send('not authenticated')
                }
            } else {
                res.status(400).send('user not found')
            }
        } catch (error) {
            console.log('ERROR IN login')
            console.log(error)
            res.sendStatus(400)
        }
    }
}
