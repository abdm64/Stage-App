const mongoose = require ('mongoose');
var dateFormat = require('dateformat');
const Schema = mongoose.Schema;
 var now = new Date();

//create schema
const RseponsableSchema = new Schema({
   

    nom:{
        type:String,
        required:true

    },
    prenom:{
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
    
  
    affectation:{     /////////// ? 
        type:String,
        required:true

    },
    

    
    
    

    
    
    
    
});

mongoose.model('Responsables',RseponsableSchema);
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
	 "attestation":"thrht"
	 
 }
    


*/ 

