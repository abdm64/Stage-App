const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//create schema
const IdeaSchema = new Schema({

    name:{
        type: String,
        required :true
    },
    email:{
        type:String,
        required:true

    },
   
});
//create our model ideas
mongoose.model('ideas',IdeaSchema);