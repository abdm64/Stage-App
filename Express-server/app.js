
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
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet')
const mongoose =require('mongoose');
const base_url = process.env.BASE_URL || "mongodb://localhost:27017/"
require('dotenv').config();




const app = express();



connectMongo('stage')



app.use(helmet())

app.use(cors()) 

app.use((req,res,next)=> {
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

//switch database Api must be  protected

app.get('/api', (req,res, next)=>{
 
  const value = req.query.archive
  let token = req.query.token
  console.log(token)


  if("LdGqSM7RDe2uSQPnwwSN" === token){ 


    connectToDataBase(value,res)
  } else {

    res.status(401).send("Error:Invalid Token"); 
  }



 
 
  



});


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
    res.sendFile(path.join(__dirname, 'static/index.html'), (err) => {

      if (err) {
        res.status(500).send(err)
      }
    })
  })

const port =process.env.PORT || 3000;


app.listen(port, ()=> {

  console.log('Server listening on port ' + port);
});


function connectToDataBase(so,res){

  
  //  stagedb.connection.close()
  // archive.connection.close()
  console.log("switching is here")

if (so === 'true'){
  




connectMongo('archive')


  
  res.status(200).json("archive connected to database!"); 
 
} else {




connectMongo('stage')


res.status(200).json("stagedb connected to database!"); 
  
 
}

     

  
 
 }

 function connectMongo(name){
   mongoose.connection.close()

  mongoose
  .connect(base_url+name, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log(name + ' Connected to database!');
  })
  .catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });
  mongoose.Promise = global.Promise;







 }
