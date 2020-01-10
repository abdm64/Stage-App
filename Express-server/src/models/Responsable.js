




const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


//create schema
const RseponsableSchema = new Schema({
   
    Employee_Number : Number,
   
    Last_Name:  String,
    First_name : String,
    Sector :String,
    Departement : String,
    Organisation : String,
    Position : String,
    Job : String,
    TEL : Number,
    Email_Address : String,
    status : String,

    
});

module.exports =  mongoose.model('Ecadreur',RseponsableSchema,'ecadreur');


