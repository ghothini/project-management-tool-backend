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
                req.body.email = req.body.email.toLowerCase();
                const validationResult = new UserSchema(req.body)
                const result = await validationResult.save()
                res.send(result)
            });
        });
    },
    addManagementAccounts: async (req, res) => {
        const Admin = {
          "firstName": "Administrator",
          "lastName": "Admin",
          "gender": "male",
          "id": "4564545645645",
          "email": "admin@gmail.com",
          "role": "admin",
          "password": "123"
        }

        const projectManager = {
          "firstName": "Thabiso",
          "lastName": "Kgotlhang",
          "gender": "female",
          "id": "4564545645645",
          "email": "manager@gmail.com",
          "role": "project manager",
          "password": "123"
        }
        const isAdminFound = await UserSchema.findOne({role: 'admin'})
        if(!isAdminFound) {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(Admin.password, salt, async function (err, hash) {
                    console.log("err", err)
                    console.log("hashed  password", hash)
                    Admin.password = hash;
                    Admin.email = Admin.email.toLowerCase();
                    const validationResult = new UserSchema(Admin)
                    const result = await validationResult.save()
                    // res.send(result)
                });
            });
        }
        const isProjectManagerFound = await UserSchema.findOne({role: 'project manager'});
        console.log("isProjectManagerFound",isProjectManagerFound);
        if(!isProjectManagerFound) {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(projectManager.password, salt, async function (err, hash) {
                    console.log("err", err)
                    console.log("hashed  password", hash)
                    projectManager.password = hash;
                    projectManager.email = projectManager.email.toLowerCase();
                    const validationResult = new UserSchema(projectManager)
                    const result = await validationResult.save()
                    // res.send(result)
                });
            });
        }
    },
    getUsers: async (req, res) => {
        const results = await UserSchema.find();
        res.send(results)
    },
    checkPassword: async (req, res) => {
        console.log("req.body", req.body)
        // Checking matching password
        bcrypt.compare(req.body.plainPassword, req.body.hashedPassword, function (err, result) {
            res.send(result);
        });
    },
    login: async (req, res) => {
        const results = await UserSchema.findOne({ email: req.params.email.toLowerCase() });
        if (!results) {
            res.send({ emailExists: false, passwordMatches: false });
        }
        // Checking matching password
        bcrypt.compare(req.params.password, results.password, function (err, result) {
            res.send({ emailExists: true, passwordMatches: result, userAcc: results });
        });
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
    updateUserPassword: async (req, res) => {
        try {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {

                    req.body.password = hash;
                    req.body.email = req.body.email.toLowerCase();

                    const filter = { email: req.body.email };
                    const options = { upsert: true };
                    const updateDoc = {
                        $set: req.body
                    };
                    const result = await UserSchema.updateOne(filter, updateDoc, options);const message = `Your account password has been changed successfully`;
                    
                    let mailTransporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'Kimberlymnguni@gmail.com',
                            pass: 'hgdtwrdqheiesibm'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    })
                    const details = {
                        from: 'Kimberlymnguni@gmail.com',
                        to: req.body.email,
                        subject: 'Password Change',
                        text: "You account password has been successfully changed"
                    }
            
                    mailTransporter.sendMail(details, (err) => {
                        if (err) {
                            console.log('It has an error', err)
                        } else {
                            console.log('Messege send successfully')
                        }
                    })
                    res.send(result)
                });
            });
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
    updateAssignedTask: async (req, res) => {
        try {
            const filter = { _id: req.body._id };
            const options = { upsert: true };
            const updateDoc = {
                $set: req.body
            };
            const result = await TeamMemberTask.updateOne(filter, updateDoc, options);
            res.send(result)
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
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
            const filter = { _id: req.body._id };
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
    },

    // Emails,
    taskAssignedEmail: async (req, res) => {
        const message = `A ${req.body.task} task has been assigned to you by management. Log in for latest updates",`
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'Kimberlymnguni@gmail.com',
                pass: 'hgdtwrdqheiesibm'
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        const details = {
            from: 'Kimberlymnguni@gmail.com',
            to: req.body.email,
            subject: 'Task Assignment',
            text: message
        }

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.log('It has an error', err)
            } else {
                console.log('Messege send successfully')
            }
        })
    },
    projectHealthEmail: async (req, res) => {
        const message = `Project health status has changed to ${req.body.healthStatus}`
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'Kimberlymnguni@gmail.com',
                pass: 'hgdtwrdqheiesibm'
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        const details = {
            from: 'Kimberlymnguni@gmail.com',
            to: req.body.email,
            subject: 'Project Health Update',
            text: message
        }

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.log('It has an error', err)
            } else {
                console.log('Messege send successfully')
            }
        })
    },
    projectStatusEmail: async (req, res) => {
        console.log(req.body)
        const message = `Project status has changed to ${req.body.status}`;
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'Kimberlymnguni@gmail.com',
                pass: 'hgdtwrdqheiesibm'
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        const details = {
            from: 'Kimberlymnguni@gmail.com',
            to: "thapeloghothini@gmail.com",
            subject: 'Project Status Update',
            text: message
        }

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.log('It has an error', err)
            } else {
                console.log('Messege send successfully')
            }
        })
    },
    taskStatusEmail: async (req, res) => {
        const message = `${req.body.task} status has changed to ${req.body.status}`;
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'Kimberlymnguni@gmail.com',
                pass: 'hgdtwrdqheiesibm'
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        const details = {
            from: 'Kimberlymnguni@gmail.com',
            to: "thapeloghothini@gmail.com",
            subject: 'Task Status Update',
            text: message
        }

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.log('It has an error', err)
            } else {
                console.log('Messege send successfully')
            }
        })
    },
    forgotPasswordEmail: async (req, res) => {
        console.log(req.body)
        try {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash("test123", salt, async function (err, hash) {

                    req.body.password = hash;

                    const filter = { email: req.body.email };
                    const options = { upsert: true };
                    const updateDoc = {
                        $set: req.body
                    };
                    const result = await UserSchema.updateOne(filter, updateDoc, options);

                    let mailTransporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'Kimberlymnguni@gmail.com',
                            pass: 'hgdtwrdqheiesibm'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    })
                    const details = {
                        from: 'Kimberlymnguni@gmail.com',
                        to: req.body.email,
                        subject: 'Forgot Password',
                        text: "You account password has been temporarily set to test123"
                    }
            
                    mailTransporter.sendMail(details, (err) => {
                        if (err) {
                            console.log('It has an error', err)
                        } else {
                            console.log('Messege send successfully')
                        }
                    })
                    res.send(result)
                });
            });
        } catch (error) {
            res.status(500).send(error)
        }
        
    }
}

module.exports = Controlls;
