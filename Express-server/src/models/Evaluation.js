const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


//create schema
const EvaluationSchema = new Schema({
   
    matricule:{
        type:Number,
        unique: true,
        required:true
    },
    global:{
        type:String,
        required:true,
    
    
    },
    project:{
        type:String,
        required:true,
    
    
    },
    etude:{
        type:String,
        required:true,
    
    
    },
    it:{
        type:String,
        required:true,
    
    
    },
    france:{
        type:String,
        required:true,
    
    
    },
    anglais:{
        type:String,
        required:true,
    
    
    },
    motivation:{
        type:String,
        required:true,
    
    
    },
    commentaire:{
        type:String,
        required:false,
    
    
    },
   

    
});

module.exports =  mongoose.model('Evaluation',EvaluationSchema,'Evaluation');
