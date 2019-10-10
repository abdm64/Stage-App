const  http = require('http');
const students =require('./routes/students');
const mail =require('./routes/mail');
const exelData = require('./routes/dataExel');
const userRoutes = require("./routes/user");
const express = require('express');
const path = require('path');
//app.use(index);

const app = express();
app.use(students);
app.use(mail)
app.use(userRoutes);
app.use(exelData);
app.use(express.static(__dirname + '/static'))
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'static/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

const port =process.env.PORT || 3000;

app.set('port',port);
const server  =http.createServer(app);

server.listen(port);
