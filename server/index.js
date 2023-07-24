require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env
const {sequelize} = require('./util/database')
const {Assignment} = require('./models/assignment')
const {teacherClass} = require('./models/class')
const {Student} = require('./models/student')
const {User} = require('./models/user')
const {getCurrentUserClasses, addClass, deleteClass} = require('./controllers/classes')
const {getAllStudents, addStudent, deleteStudent} = require('./controllers/students')
const {getAllAssignments, addAssignment, deleteAssignment} = require('./controllers/assignments')
const {isAuthenticated} = require('./middleware/isAuthenticated')
const {register, login} = require('./controllers/auth')

const app =express()
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))

User.hasMany(teacherClass)
User.hasMany(Student)
User.hasMany(Assignment)
teacherClass.belongsTo(User)
teacherClass.hasMany(Student)
teacherClass.hasMany(Assignment)
teacherClass.belongsToMany(Student, { through: 'StudentClass'})
Student.belongsTo(teacherClass)
Student.belongsTo(User)
Student.belongsToMany(teacherClass, { through: 'StudentClass'})
Student.belongsToMany(Assignment, { through: 'StudentAssignment'})
Assignment.belongsTo(User)
Assignment.belongsToMany(Student, { through: 'StudentAssignment'})
Assignment.hasOne(teacherClass)

app.post('/register', register)
app.post('/login', login)

app.get('/classes/:userId', isAuthenticated, getCurrentUserClasses)
app.get('/students/:userId', isAuthenticated, getAllStudents)
app.get('/assignments/:userId', isAuthenticated, getAllAssignments)

app.post('/classes', isAuthenticated, addClass)
app.post('/students', isAuthenticated, addStudent)
app.post('/assignments', isAuthenticated, addAssignment)
app.delete('/classes/:id', isAuthenticated, deleteClass)
app.delete('/students/:id', isAuthenticated, deleteStudent)
app.delete('/assignments/:id', isAuthenticated, deleteAssignment)



sequelize.sync()
    .then(() => {
        app.listen(SERVER_PORT, () => console.log(`Database successfully synced. Server now running on port ${SERVER_PORT}`))
    })
    .catch(err => console.log(err))