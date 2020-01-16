
const studentsRoute =require('./src/routes/students');
const mail =require('./src/routes/mail');
const exelData = require('./src/routes/dataExel');
const userRoute = require("./src/routes/user");
const encaRoute = require("./src/routes/encadreur");
const chartRoute = require("./src/routes/chart");
const evaluation = require('./src/routes/evaluationRoute')
const urlRandom = require('./src/routes/URLRoute')
const express = require('express');
const path = require('path');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
//stagedb:27017
const base_url = process.env.BASE_URL || "mongodb://localhost:27017/test"


console.log(base_url)

mongoose
.connect(base_url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() => {
  console.log('Connected to database!');
})
.catch(error => {
  console.log('Connection failed!');
  console.log(error);
});
mongoose.Promise = global.Promise;

app.use(cors()) 
 







//how middleware works
/***********************************/
app.use((req,res,next)=> {
    //console.log(Date.now());
    //req.name='safaa';
    res.setHeader("Access-Control-Allow-Origin" ,"*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type , Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET ,POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
/************************************/



// body parse middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parsejson
app.use(bodyParser.json())




app.use(studentsRoute);
app.use(mail)
app.use(userRoute);
app.use(exelData);
app.use(encaRoute);
app.use(chartRoute);
app.use(evaluation);
app.use(urlRandom);
app.use(express.static(__dirname + '/static'))
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'static/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

const port =process.env.PORT || 3000;


app.listen(port);



