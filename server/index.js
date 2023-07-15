require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {PORT} = process.env
const {sequelize} = require('./util/database')
const {Assignment} = require('./models/assignment')
const {Class} = require('./models/class')
const {Student} = require('./models/student')
const {Subject} = require('./models/subject')
const {Teacher} = require('./models/teacher')
const {User} = require('./models/user')

const app =express()

app.use(express.json())
app.use(cors())

User.hasMany(Class)
Class.belongsTo(User)

Class.hasMany(Student)
Student.belongsTo(Class)

Teacher.hasMany(Class)
Class.belongsTo(Teacher)

Class.hasOne(Subject)
Subject.belongsTo(Class)

Student.hasMany(Assignment)
Assignment.hasOne(Student)

app.post('/register', register)
app.post('login', login)

app.get('/classes', getClasses)
app.get('/students', getStudents)

app.post('/classes', isAuthenticated, addClass)
app.post('/students', isAuthenticated, addStudent)
app.put('/classes/:id', isAuthenticated, editClass)
app.put('/students/:id', isAuthenticated, editStudent)
app.delete('/classes/:id', isAuthenticated, deleteClass)
app.delete('/students/:id', isAuthenticated, deleteStudent)


sequelize.sync({ force:true })
    .then(() => {
        app.listen(PORT, () => console.log(`Database successfully synced. Server now running on port ${PORT}`))
    })
    .catch(err => console.log(err))