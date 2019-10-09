const express = require('express');
const nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
const mongoose =require('mongoose');
var cron = require('node-cron');
const app = express.Router();
//var data = {}

mongoose.Promise = global.Promise;

/*
cron.schedule('40 10 * * *', () => {


});
*/

cron.schedule('* * * * *', () => {


});


mongoose.connect("mongodb://localhost/test",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})



require('../models/Student');
const Students = mongoose.model( 'Students');



info()







 async function getSudents(){

  const  data = await  Students.find().then(documents =>{



    return documents


  });


//console.log(data)
return data

}



//from front

function getNbDay(datefin){
  const d1 = new Date(Date.now())
  const d2 = new Date(datefin)



  const same = d1.getTime() - d2.getTime() ;

  const days = (same / (60*60*24*1000))




return days

}
function getDateFin(students){


for (let item of students) {

 if (getNbDay(item.dateFin) < 7){


  console.log(item.nom)

envoyerMail(item)

 } else {

  // not send email

  console.log("email not sent")



 }

}
return true
}


async function info(){
  const a = await getSudents();
  const b = await getDateFin(a);
}

function envoyerMail(item){
  const output = `<h4>Bonjour Fatma  </h4>
  <p> Le stagiaire `+item.nom+' '+item.prenom+` va terminer son stage dans une semaine</p>`;

  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    service : 'Gmail',

    auth: {
           user: 'notifcationstage@gmail.com',
           pass: 'FatmaTILIOUINE'
       },

      // proxy: "http://djezzyproxy",


  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'notifcationstage@gmail.com', // sender address
      to: 'gingfrix64@gmail.com', // list of receivers
      subject: 'Notifction date fine ' +' '+ item.nom, // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(err, data) {

        if (err){
          console.log(err) ;
        }
        else{
          console.log('email sent');
        }

  });




}




















  module.exports = app;
