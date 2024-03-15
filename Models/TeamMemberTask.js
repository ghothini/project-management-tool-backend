const mongoose = require('mongoose');

const TeamMemberTask = mongoose.Schema({
    teamMemberEmail: {type: String, required: true},
    taskDescription: {type: String, required: true},
    taskDeadline: {type: String, required: true},
    status: {type: String, required: true}
})

module.exports = mongoose.model('TeamMembersTasks',TeamMemberTask)