
const express = require('express');

const path = require('path');
const cors = require('cors')
const sequelize = require('./util/database');
const getControllerFor404 = require('./controllers/404page.js')

const parser = require('body-parser')
const app = express();
app.use(cors(
  {
    origin: '*'
  }
))

app.use(express.json())
//const loginroutes = require('./routes/login')
const signuproutes = require('./routes/users')
const msgs = require("./routes/msg");
//const messageroutes = require('./routes/message')
const users = require('./models/user')
const messages = require('./models/messages')

app.use(parser.urlencoded({extended: false}))
//app.use(loginroutes);
app.use('/user',signuproutes)
//app.use(messageroutes);
app.use(msgs)

users.hasMany(messages)
messages.belongsTo(users)
//app.use(getControllerFor404.get404Page)


sequelize
  .sync()
  
  .then(() => {
   
   // https.createServer({key:privatekey,cert:certificate},app).listen(process.env.HOST || 1000)
   app.listen(9000)
  })
 
  .catch(err => {
    console.log(err);
  });


