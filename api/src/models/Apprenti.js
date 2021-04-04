const mongoose = require ('mongoose');
const autoInc = require('mongoose-sequence')(mongoose);
const autoIncrement = require('mongoose-auto-increment');


var Schema = mongoose.Schema;

const ApprentiSchema = new Schema({
 matricule : {

    type:Number,
    required : true
 }
,

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
    type: Date,
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
    required:false
  
  },

  description: {
      type:String,
      required: false

  },
  year: {
      type: Number,
      required: false
  }













});
//ApprentiSchema.plugin(autoInc, {inc_field: 'matricule'});
autoIncrement.initialize(mongoose.connection)
ApprentiSchema.plugin(autoIncrement.plugin, {
    model: 'Apprenti',
    field: 'matricule',
    startAt: 1,
    incrementBy: 1
  });

module.exports =  mongoose.model('Apprenti',ApprentiSchema,'Apprentis');





