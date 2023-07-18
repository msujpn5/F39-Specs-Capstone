require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {PORT} = process.env
const {sequelize} = require('./util/database')
const {Assignment} = require('./models/assignment')
const {Class} = require('./models/class')
const {Student} = require('./models/student')
const {User} = require('./models/user')
const {getCurrentUserClasses, addClass, deleteClass} = require('./controllers/classes')
const {getCurrentClassStudents, addStudent, deleteStudent} = require('./controllers/students')
const {getCurrentClassAssignments, addAssignment, deleteAssignment} = require('./controllers/assignments')
const {isAuthenticated} = require('./middleware/isAuthenticated')
const {register, login} = require('./controllers/auth')

const app =express()

app.use(express.json())
app.use(cors())

User.hasMany(Class)
Class.belongsTo(User)

Class.hasMany(Student)
Student.belongsTo(Class)

Class.hasMany(Assignment)
Assignment.hasOne(Class)

app.post('/register', register)
app.post('/login', login)

app.get('/classes/:id', isAuthenticated, getCurrentUserClasses)
app.get('/students/:id', isAuthenticated, getCurrentClassStudents)
app.get('/assignments/:id', isAuthenticated, getCurrentClassAssignments)

app.post('/classes', isAuthenticated, addClass)
app.post('/students', isAuthenticated, addStudent)
app.post('/assignments', isAuthenticated, addAssignment)
app.delete('/classes/:id', isAuthenticated, deleteClass)
app.delete('/students/:id', isAuthenticated, deleteStudent)
app.delete('/assignments/:id', isAuthenticated, deleteAssignment)


sequelize.sync({ force:true })
    .then(() => {
        app.listen(PORT, () => console.log(`Database successfully synced. Server now running on port ${PORT}`))
    })
    .catch(err => console.log(err))