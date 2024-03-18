const UserSchema = require('../Models/User')
const ProjectSchema = require('../Models/Project')
const bcrypt = require('bcrypt');
const TaskSchema = require('../Models/Task');
const TeamMemberTask = require('../Models/TeamMemberTask');
const Project = require('../Models/Project');
const nodemailer = require('nodemailer');

const Controlls = {
    defaultEndPoint: (req, res) => {
        res.send('Welcome to Project Management Tool');
    },
    addUser: async (req, res) => {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
                console.log("err", err)
                console.log("hashed  password", hash)
                req.body.password = hash;
                const validationResult = new UserSchema(req.body)
                const result = await validationResult.save()
                res.send(result)
            });
        });
    },
    getUsers: async (req, res) => {
        const results = await UserSchema.find();
        res.send(results)
    },
    deleteUser: async (req, res) => {
        // To delete user based on params
        const results = await UserSchema.deleteOne(req.params);
        res.send(results)
    },
    updateUser: async (req, res) => {
        try {
            const filter = { email: req.body.email };
            const options = { upsert: true };
            const updateDoc = {
                $set: req.body
            };
            const result = await UserSchema.updateOne(filter, updateDoc, options);
            res.send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addProject: async (req, res) => {
        const validationResult = new ProjectSchema(req.body)
        const result = await validationResult.save()
        res.send(result)
    },
    getProjects: async (req, res) => {
        const results = await Project.find();
        res.send(results)
    },
    deleteProject: async (req, res) => {
        const results = await Project.deleteOne(req.params);
        res.send(results)
    },
    updateProject: async (req, res) => {
        try {
            const filter = { projectDescription: req.body.projectDescription };
            const options = { upsert: true };
            const updateDoc = {
                $set: req.body
            };
            const result = await Project.updateOne(filter, updateDoc, options);
            res.send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addTask: async (req, res) => {
        const validationResult = new TaskSchema(req.body)
        const result = await validationResult.save()
        res.send(result)
    },
    getTasks: async (req, res) => {
        const results = await TaskSchema.find();
        res.send(results)
    },
    assignTask: async (req, res) => {
        const validationResult = new TeamMemberTask(req.body)
        const result = await validationResult.save()
        res.send(result)
    },
    getAssignedTasks: async (req, res) => {
        const results = await TeamMemberTask.find();
        res.send(results)
    },
    deleteAssignedTask: async (req, res) => {
        const results = await TeamMemberTask.deleteOne(req.params);
        res.send(results)
    },
    getTasks: async (req, res) => {
        const results = await TaskSchema.find();
        res.send(results)
    },
    deleteTask: async (req, res) => {
        const results = await TaskSchema.deleteOne(req.params);
        res.send(results)
    },
    updateTask: async (req, res) => {
        try {
            const filter = { taskDescription: req.body.taskDescription };
            const options = { upsert: true };
            const updateDoc = {
                $set: req.body
            };
            const result = await TaskSchema.updateOne(filter, updateDoc, options);
            res.send(result)
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = Controlls;
