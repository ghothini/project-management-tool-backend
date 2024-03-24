const express = require('express');
const router = express.Router();
const Controlls = require('../Controllers/Controlls')

// Get
router.get('/', Controlls.defaultEndPoint)
router.get('/get-users', Controlls.getUsers)
router.get('/login/:email/:password', Controlls.login)
router.get('/get-projects', Controlls.getProjects)
router.get('/get-tasks', Controlls.getTasks)
router.get('/assigned-tasks', Controlls.getAssignedTasks)
router.get('/add-management-accounts', Controlls.addManagementAccounts)

// Post
router.post('/add-user', Controlls.addUser)
router.post('/add-project', Controlls.addProject)
router.post('/add-task', Controlls.addTask)
router.post('/assign-task', Controlls.assignTask)
// router.post('/sendPassword',)


// Update
router.post('/update-user', Controlls.updateUser)
router.post('/update-user-password', Controlls.updateUserPassword)
router.post('/update-project', Controlls.updateProject)
router.post('/update-task', Controlls.updateTask)
router.post('/update-assigned-task', Controlls.updateAssignedTask)
router.post('/checkPassword', Controlls.checkPassword)

// Delete
router.delete('/delete-user/:email', Controlls.deleteUser)
router.delete('/delete-project/:projectDescription', Controlls.deleteProject)
router.delete('/delete-task/:_id', Controlls.deleteTask)
router.delete('/delete-assigned-task/:_id', Controlls.deleteAssignedTask)

// Emails
router.post('/taskEmail', Controlls.taskAssignedEmail)
router.post('/projectHealthEmail', Controlls.projectHealthEmail)
router.post('/projectStatusEmail', Controlls.projectStatusEmail)
router.post('/taskStatusEmail', Controlls.taskStatusEmail)
router.post('/forgot-password', Controlls.forgotPasswordEmail)


module.exports = router;

