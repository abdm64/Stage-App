const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  matricule:{
    type:Number,

    unique: false,
    required:true
},


nom:{
    type:String,
    required:true,


},
prenom:{
    type:String,
    required:true

},

dateNaissance:{
    type:Date,

},
sexe:{
    type:String,
    required:true

},
nTelephone:{
    type:Number,
    required:true

},
email:{
    type:String,
    required:true

},
diplome:{
    type:String,
    required:true

},
etablissement:{
    type:String,
    required:true

},
theme:{
    type:String,
    required:true

},
dateDebut:{
    type:Date,
    default:Date.now,
    required:true
},
dateFin:{
    type:Date,
    required:true

},
typeStage:{
    type:String,
    required:true

},
typeRapport:{
    type:String,
    required:true

},

wilaya:{
    type:String,
    required:true

},
nbJoursPresence:{
    type:String,
    required:true

},
recommandation:{
    type:String,
    required:false

},
attestation:{
    type:Boolean,
    required:true

},
encadreur:{     /////////// ? affectation
  type:String,
  required:true

},

encadreurID:{     /////////// ?
  type:Number,
  required:true

},
encadreurmMail:{     /////////// ?
  type:String,
  required:false

},
encadreurmOrg:{     /////////// ?
  type:String,
  required:true

},
encadreurDEP:{
  type:String,
  required:true

},

encadreurSec:{
  type:String,
  required:true

},

user:{
    type:String,
    required:true
  
  },

  description: {
      type:String,
      required: false

  }












});

module.exports =  mongoose.model('Students',StudentSchema);




