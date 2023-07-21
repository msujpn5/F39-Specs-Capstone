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
const {getCurrentClassStudents, addStudent, deleteStudent} = require('./controllers/students')
const {getCurrentClassAssignments, addAssignment, deleteAssignment} = require('./controllers/assignments')
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
Student.belongsTo(teacherClass)
Student.belongsTo(User)
Assignment.hasOne(teacherClass)
Assignment.belongsTo(User)

app.post('/register', register)
app.post('/login', login)

app.get('/classes/:userId', isAuthenticated, getCurrentUserClasses)
app.get('/students/:userId', isAuthenticated, getCurrentClassStudents)
app.get('/assignments/:userId', isAuthenticated, getCurrentClassAssignments)

app.post('/classes', isAuthenticated, addClass)
app.post('/students', isAuthenticated, addStudent)
app.post('/assignments', isAuthenticated, addAssignment)
app.delete('/classes/:id', isAuthenticated, deleteClass)
app.delete('/students/:id', isAuthenticated, deleteStudent)
app.delete('/assignments/:id', isAuthenticated, deleteAssignment)



sequelize.sync({ force: true })
    .then(() => {
        app.listen(SERVER_PORT, () => console.log(`Database successfully synced. Server now running on port ${SERVER_PORT}`))
    })
    .catch(err => console.log(err))