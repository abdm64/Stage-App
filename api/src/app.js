require('./config/config.env')
const studentsRoute =require('./routes/StudentsRoutes');
const exelData = require('./routes/ExelRoutes');
const userRoute = require("./routes/UserRoutes");
const encaRoute = require("./routes/EncadreurRoutes");
const chartRoute = require("./routes/chartRoutes");
const evaluation = require('./routes/EvaluationRoute')
const urlRandom = require('./routes/URLRoute')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet')
const Config = require('./config/config')
const config = new Config()
const TOKEN = process.env.TOKEN












const app = express();

config.connectMongo('stage')

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
  
  if( TOKEN === token){ 


    config.connectToDataBase(value,res)
  } else {

    res.status(401).send("Error:Invalid Token")
  }


});




// body parse middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parsejson
app.use(bodyParser.json())




app.use(studentsRoute);
app.use(userRoute);
app.use(exelData);
app.use(encaRoute);
app.use(chartRoute);
app.use(evaluation);
app.use(urlRandom);
app.use(express.static(__dirname + '/static'))
//serve
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'static/index.html'), (err) => {

      if (err) {
        res.status(500).send(err)
      }
    })
  })

const port =process.env.PORT || 3000;


app.listen(port, ()=> {

  console.log('HR App  listening on port ' + port);
});




 
