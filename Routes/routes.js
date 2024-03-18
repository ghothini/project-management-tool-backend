const express = require('express');
const router = express.Router();
const Controlls = require('../Controllers/Controlls')

// Get
router.get('/',Controlls.defaultEndPoint)
router.get('/get-users',Controlls.getUsers)
router.get('/get-projects',Controlls.getProjects)
router.get('/get-tasks',Controlls.getTasks)
router.get('/assigned-tasks',Controlls.getAssignedTasks)

// Post
router.post('/add-user',Controlls.addUser)
router.post('/add-project',Controlls.addProject)
router.post('/add-task',Controlls.addTask)
router.post('/assign-task',Controlls.assignTask)
// router.post('/sendPassword',)


// Update
router.post('/update-user',Controlls.updateUser)
router.post('/update-project',Controlls.updateProject)
router.post('/update-member-task',Controlls.updateTask)

// Delete
router.delete('/delete-user/:email',Controlls.deleteUser)
router.delete('/delete-project/:projectDescription',Controlls.deleteProject)
router.delete('/delete-task/:taskDescription',Controlls.deleteTask)
router.delete('/delete-assigned-task/:_id',Controlls.deleteAssignedTask)

module.exports = router;

