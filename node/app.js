
const express = require('express');

const path = require('path');
const getControllerFor404 = require('./controllers/404page.js')
const parser = require('body-parser')
const loginroutes = require('./routes/login')
const messageroutes = require('./routes/message')
const app = express();

app.use(parser.urlencoded({extended: false}))
app.use(loginroutes);
app.use(messageroutes);



app.use(getControllerFor404.get404Page)

app.listen(1000)

