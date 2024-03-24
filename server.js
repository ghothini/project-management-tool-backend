const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/routes')
const app = express()
const port = 3000;
const cors = require('cors')
const nodemailer = require('nodemailer')

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

mongoose.connect('mongodb://127.0.0.1:27017/project-management-tool')
    .catch((err) => console.log('Something went wrong'))

// Middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(routes)

app.listen(port, () => {
    console.log('App running on port 3000');
})

const sendPassword = (req) => {

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Kimberlymnguni@gmail.com',
            pass: 'hgdtwrdqheiesibm'
        }
    })

    let details = {
        from: 'Kimberlymnguni@gmail.com',
        to: `${req.email}`,
        subject: 'Account',
        text: `Hey ${req.firstName}, your user account has been successfully created and your password ${req.body.password}. Use your email address and this password to log in. `
    }


    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log('It has an error', err)
        } else {
            console.log('Messege send successfully')
        }
    })
}

app.post('/sendPassword', (req, res) => {
    console.log(req.body)
    sendPassword(req.body)
})
app.post('/forgotPassword', (req, res) => {

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

    const messages = {
        "resetPassword": `Hey ${req.body.firstName}, your password is: test123. Use your email address and this password to log in.`,
        "taskAssignment": "A new task has been assigned to you by management. Log in for latest updates",
        "accountCreated": "Your Management Tool Account has been created. Log in with default password test123 and request the password change"
    }

    let details;
    if (req.body.subject === 'Reset Password') {

        details = {
            from: 'Kimberlymnguni@gmail.com',
            // to: `${req.body.user.email}`,
            to: "thapeloghothini@gmail.com",
            subject: req.body.subject,
            text: messages.resetPassword
        }

    } else if (req.body.subject === 'Task Assignment') {
        details = {
            from: 'Kimberlymnguni@gmail.com',
            // to: `${req.body.user.email}`,
            to: `${req.body.email}`,
            subject: req.body.subject,
            text: messages.taskAssignment
        }
    } else if (req.body.subject === 'Account Created') {
        details = {
            from: 'Kimberlymnguni@gmail.com',
            // to: `${req.body.user.email}`,
            to: `${req.body.email}`,
            subject: req.body.subject,
            text: messages.accountCreated
        }
    }

    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log('It has an error', err)
        } else {
            console.log('Messege send successfully')
            res.send(true);
        }
    })
})