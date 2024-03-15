const express = require('express');
const router = express.Router();
const Controlls = require('../Controllers/Controlls')

// Get
router.get('/',Controlls.defaultEndPoint)
router.get('/get-users',Controlls.getUsers)
router.get('/get-projects',Controlls.getProjects)
router.get('/get-members-tasks',Controlls.getTasks)

// Post
router.post('/add-user',Controlls.addUser)
router.post('/add-project',Controlls.addProject)
router.post('/assign-task',Controlls.assignTask)

// Update
router.post('/update-user',Controlls.updateUser)
router.post('/update-project',Controlls.updateProject)
router.post('/update-member-task',Controlls.updateTask)

// Delete
router.delete('/delete-user/:email',Controlls.deleteUser)
router.delete('/delete-project/:projectDescription',Controlls.deleteProject)
router.delete('/delete-task/:taskDescription',Controlls.deleteTask)

module.exports = router;

