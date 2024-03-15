const UserSchema = require('../Models/User')
const ProjectSchema = require('../Models/Project')
const bcrypt = require('bcrypt');
const TeamMemberTaskSchema = require('../Models/TeamMemberTask');
const Project = require('../Models/Project');

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
                if (result) {
                    res.send('User saved succesfully');
                } else {
                    res.send('Error saving user');
                }
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
            if (result.modifiedCount === 1) {
                res.status(201).send('Updated successfully')
            } else {
                res.status(201).send('User created successfully')
            }
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addProject: async (req, res) => {
        const validationResult = new ProjectSchema(req.body)
        const result = await validationResult.save()
        if (result) {
            res.send('Project saved succesfully');
        } else {
            res.send('Error saving user');
        }
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
            if (result.modifiedCount === 1) {
                res.status(201).send('Updated successfully')
            } else {
                res.status(201).send('User created successfully')
            }
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    assignTask: async (req, res) => {
        const validationResult = new TeamMemberTaskSchema(req.body)
        const result = await validationResult.save()
        if (result) {
            res.send('Task assigned succesfully');
        } else {
            res.send('Error saving user');
        }
    },
    getTasks: async (req, res) => {
        const results = await TeamMemberTaskSchema.find();
        res.send(results)
    },
    deleteTask: async (req, res) => {
        const results = await TeamMemberTaskSchema.deleteOne(req.params);
        res.send(results)
    },
    updateTask: async (req, res) => {
        try {
            const filter = { taskDescription: req.body.taskDescription };
            const options = { upsert: true };
            const updateDoc = {
                $set: req.body
            };
            const result = await TeamMemberTaskSchema.updateOne(filter, updateDoc, options);
            if (result.modifiedCount === 1) {
                res.status(201).send('Updated successfully')
            } else {
                res.status(201).send('User created successfully')
            }
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = Controlls;
