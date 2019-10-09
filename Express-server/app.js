const  http = require('http');
const students =require('./routes/students');
const mail =require('./routes/mail');
const exelData = require('./routes/dataExel');
const userRoutes = require("./routes/user");
const express = require('express');
//app.use(index);

const app = express();
app.use(students);
app.use(mail)
app.use(userRoutes);
app.use(exelData);


const port =process.env.PORT || 3000;

app.set('port',port);
const server  =http.createServer(app);

server.listen(port);
