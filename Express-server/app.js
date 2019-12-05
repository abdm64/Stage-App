const  http = require('http');
const students =require('./routes/students');
const mail =require('./routes/mail');
const exelData = require('./routes/dataExel');
const userRoutes = require("./routes/user");
const encaRoutes = require("./routes/encadreur");
const chartRoutes = require("./routes/chart");
const express = require('express');
const path = require('path');
const mongoose =require('mongoose');
//app.use(index);

const app = express();
//stagedb

mongoose
.connect("mongodb://localhost/test", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() => {
  console.log('Connected to database!');
})
.catch(error => {
  console.log('Connection failed!');
  console.log(error);
});




app.use(students);
app.use(mail)
app.use(userRoutes);
app.use(exelData);
app.use(encaRoutes);
app.use(chartRoutes);
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
