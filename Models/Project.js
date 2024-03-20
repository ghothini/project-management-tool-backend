const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectName: { type: String, required: true },
    projectManager: { type: String, required: true },
    projectDescription: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    teamMembers: { type: Array, required: true },
    status: { type: String, required: true },
    projectHealth: { type: String, required: true },
    createDate: { type: String, required: true }
})

module.exports = mongoose.model('Project', ProjectSchema)