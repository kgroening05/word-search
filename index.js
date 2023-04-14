const express = require('express');
const path = require('path')
const app = express();
const readText = require('./detectText')
const puzzleHandler = require('./utils/wordSearchHandler')
require('dotenv').config()

app.set("port", process.env.PORT || 8080)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))

app.post(
    '/read',
    puzzleHandler,
    (req, res) => {
        res.send('Hello World')
})
app.get(
    '/',
    (req, res) => {
        res.render('main')
    }
)

app.listen(app.get('port'))

module.exports = app;
