const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/routes')
const app = express()
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/project-management-tool')
    .catch((err) => console.log('Something went wrong'))

// Middlewares
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log('App running on port 3000');
})