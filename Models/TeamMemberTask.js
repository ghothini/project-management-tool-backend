const mongoose = require('mongoose');

const Task = mongoose.Schema({
    project: {type: String, required: true},
    taskTitle: {type: String, required: true},
    taskDescription: {type: String, required: true},
    taskDeadline: {type: String, required: true},
    taskPriority: {type: String, required: true},
    status: {type: String, required: true}
})

const User = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    gender: {type: String, required: true},
    id: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    password: {type: String, required: true},
})

const TeamMemberTask = mongoose.Schema({
    teamMember: {type: User, required: true},
    task: {type: Task, required: true},
})
module.exports = mongoose.model('TeamMemberTask',TeamMemberTask)