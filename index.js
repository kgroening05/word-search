const express = require('express');
const path = require('path')
const app = express();
const readText = require('./detectText')
require('dotenv').config()

app.set("port", process.env.PORT || 8080)
app.set("views", "ejs")

app.use(express.static(__dirname + '/public'))

app.get(
    '/',
    readText,
    (req, res) => {
    res.send('Hello World')
})

app.listen(app.get('port'))

module.exports = app;
