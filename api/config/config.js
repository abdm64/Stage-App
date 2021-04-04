const mongoose =require('mongoose');
require('dotenv').config();
const base_url = process.env.BASE_URL || "mongodb://localhost:27017/"

'use strict';
console.log(base_url)

  class Config {

 connectMongo(name){

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

connectToDataBase(so,res){
    if (so === 'true'){
    this.connectMongo('archive')
      res.status(200).json("archive connected to database!"); 
    } else {
    this.connectMongo('stage')
    res.status(200).json("stagedb connected to database!");
     
    } 
     }



}


module.exports = Config