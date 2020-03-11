const mongoose = require ('mongoose');
//var dateFormat = require('dateformat');
//var autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  matricule:{
    type:Number,

    unique: true,
    required:true
},


nom:{
    type:String,
    required:true

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
    required:true

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

}












});

module.exports =  mongoose.model('Students',StudentSchema);



/*
{
	 "matricule" : "12547",
	 "nom": "safaa",
	 "prenom":"bghjb",
	 "dateNaissance": "2019-09-23T13:18:16.445Z",
	  "sexe" : "sf",
  "Ntelephone" : "+214",
	 "dateDebut":"2019-09-23T13:18:16.445Z",
	  "dateFin":"2019-09-23T13:18:16.445Z",
		"email":"fvgdfvgdf@hf",
	  "diplome":"bgvfdgfd",
	 	 "etablissement":"tnht",
	  "theme":"gergr",

	  "typeStage":"frfrf",
 "typeRapport":"htrhtrh",
	 "encadreur":"bhgfbgf",
	   "affectation":"bhfgb",
	  "wilaya":"ggrg",
	  "NbJoursPresence":"25425",
	 "recommandation":"hthtrhr",
	 "attestation":"true"

 }



*/

