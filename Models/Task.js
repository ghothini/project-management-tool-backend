const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    project: {type: String, required: true},
    taskTitle: {type: String, required: true},
    taskDescription: {type: String, required: true},
    taskDeadline: {type: String, required: true},
    taskPriority: {type: String, required: true},
    status: {type: String, required: true}
})

module.exports = mongoose.model('Tasks',TaskSchema)