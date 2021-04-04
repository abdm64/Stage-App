

 const mongoose =require('mongoose');
 require('../models/Student');
 require('../models/Apprenti');
 const Students = mongoose.model( 'Students');
 const Apprenti = mongoose.model('Apprenti')

exports.getEcadreurDep = (req,res)=>{
  const type = req.params.type
  const ModelType = getModelType(type,Students,Apprenti)
    
    const year = req.query.year
    getData(ModelType,res,year,'encadreurDEP')
  
  }

  exports.getEcadreurSec = (req,res)=>{
    const type = req.params.type
    const ModelType = getModelType(type,Students,Apprenti)
    
    const year = req.query.year
    getData(ModelType,res,year,'encadreurSec')
      }


      exports.getTypes = (req,res)=>{ 
        const type = req.params.type
        const ModelType = getModelType(type,Students,Apprenti)
        const year = req.query.year
     getData(ModelType,res,year,'typeStage')
          }
  


    exports.getDateDebut = (req,res)=>{
      //can't refector with getData function need a time 
     
      const type = req.params.type
      const ModelType = getModelType(type,Students,Apprenti)
      const year = req.query.year
        var arraySec = []
        const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  
       
        ModelType.find().then(documents =>{
          const data = getDataPerYear(documents,year)
          for (docment of data) {
            let month = monthNames[docment.dateDebut.getMonth()]
            arraySec.push(month)
          }
        
       res.status(200).send(sendDataDate(getElemnt(arraySec.sort())))
      
          });
          }

          exports.getDateFin = (req,res)=>{
       
            const type = req.params.type
            const ModelType = getModelType(type,Students,Apprenti)
            const year = req.query.year
            var arraySec = []
            const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
           
            ModelType.find().then(documents =>{
              const data = getDataPerYear(documents,year) // fix Big Problem 
              for (docment of data) {
                
                let month = monthNames[docment.dateFin.getMonth()]
                arraySec.push(month)
              }
            
            
              
               
      
           res.status(200).send(sendDataDate(getElemnt(arraySec.sort())))
          
              });
              }

//helper method


              function getElemnt(arr){
                const chars = {}
        
                for (let char of arr ) {
                  if ( !chars[char]) {
                      chars[char] = 1
                  } else {
             
                     chars[char]++
             
                  }
             
                
             }
        
             
              return chars
        
              }
        
              function sendDataDate(data){
        
        
        
        
                const obj = {
        
        
                  January : data.January ||  0,
                  February : data.February  || 0,
                  March : data.March || 0,
                  April:   data.April || 0,
                  May: data.May || 0,
                  Jun: data.Jun || 0,
                  July: data.July || 0,
                  August:data.August || 0,
                  September: data.September || 0,
                  October: data.October || 0,
                  November:  data.November  || 0,
                  December: data.December || 0,
        
                
                }
                
        
                return obj
              }
        
function getDataPerYear(documents,year){


  if (!(year == 0)){

    documents.forEach((doc)=>{
     
      doc.year = new Date(doc.dateDebut).getFullYear()
    
     })
    
     const types = documents.filter((doc)=>{
  
  
        return  doc.year == year
     })

     return types

  } else {

    return documents
  }

 


}

function getData(Students,res,year,name){


  var arrayTypes = []
  // { dateDebut: req.params.id }
  Students.find().then(documents =>{


const data = getDataPerYear(documents,year)

    for (docment of data) {
      arrayTypes.push(docment[name])
    }
 res.status(200).send(getElemnt(arrayTypes))
 
    });
}

   
function getModelType(type,studentModel,apprentiModel){
  if ( type === "0"){


    return  studentModel
  }

  return apprentiModel


}
