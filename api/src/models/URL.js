const mongoose = require("mongoose");


const randomHashSchema = mongoose.Schema({
  id: { type: String, required: true },
  random: { type: String, required: true },
  firstName : { type: String, required: true },
  lastName :  { type: String, required: true }
  
} , { versionKey: false });





module.exports = mongoose.model("URL", randomHashSchema);
