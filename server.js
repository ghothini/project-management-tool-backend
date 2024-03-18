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
        text: `Hey ${req.firstName}, your user account has been successfully created and your password ${req.password}. Use your email address and this password to log in. `
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