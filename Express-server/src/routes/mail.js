const express = require('express');
const nodemailer = require('nodemailer');

const mongoose =require('mongoose');
var cron = require('node-cron');
const app = express.Router();
//var data = {}



/*
cron.schedule('40 10 * * *', () => {


});
*/

cron.schedule('04 10 * * *', () => {
  info()

});






require('../models/Student');
const Students = mongoose.model( 'Students');



//info()







 async function getSudents(){

  const  data = await  Students.find().then(documents =>{



    return documents
 });
return data

}



//from front

function getNbDay(datefin){
  const d1 = new Date(Date.now())
  const d2 = new Date(datefin) 
  
 const same = d1.getTime() - d2.getTime() ;

  const days = (same / (60*60*24*1000));


return days

}

function getDateFin(students){


for (let item of students) {

  console.log(getNbDay(item.dateFin))
  console.log(item.dateFin)
if(getNbDay(item.dateFin) <= 0) {

 if (getNbDay(item.dateFin) >= -7){

 

  console.log(item.nom)
  transporter.sendMail(Options(item), function(err, data) {
    if(err)  console.log(err) ;

    else console.log('sent') ;
 });
  

 } else {

  console.log(" il lui reste plus que 7 jours")
}

}else{
  console.log("il a deja fini son stage")
}
}
return true
}



async function info(){
  const a = await getSudents();
  const b = await getDateFin(a);
}




  
  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    
    //service : 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL, 

    auth: {
           user: 'notifcationstage@gmail.com',
           pass: 'FatmaTILIOUINE'
       },
       
       tls:{
        rejectUnauthorized:false
       },
       logger: true, // log to console
       debug: true, // include SMTP traffic in the logs
   
     

  });

  // setup email data with unicode symbols
  function Options(item){
    const output = `<h4>Bonjour </h4>
  <p> Le stagiaire  `+item.nom+` `+item.prenom +`  va terminer son stage dans une semaine.</p>
  <p> Ce mail a été envoyé automatiquement par la plateforme de suivi des stagiaires.</p>
  <p> Cordialement.</p>`;


    let mailOptions = {
      from: 'notifcationstage@gmail.com', // sender address
      to: 'menadsafaa@gmail.com', // list of receivers
      subject: 'Notification date fin de stagiaire '+item.nom+' '+item.prenom, // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  return mailOptions
  }
  
  


module.exports = app;
