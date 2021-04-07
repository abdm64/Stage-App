
const networkService = require('../services/network.service')


exports.getEcadreur = async (req,res, next)=>{

    const mat = req.params.id

try {

        let data = await networkService.getEncadruerByMat(mat)
        
        if(data){

            let encadreur = {
                Last_Name : data.lastName,
                First_name : data.firstName,
                Sector : getSector(data.department),
                Position : data.position,
                Departement: getDepartment(data.department),
                TEL : parseInt(data.phone),
                Email_Address: data.email, 
                Location: data.location
    
            }
    
          
          return  res.status(200).send(encadreur)


        } else {


            return res.status(404).send({ message :'Not Found'})
        }
       

} catch(err) {
    console.log(err)

  return  res.status(500).send({ message : "Internal Server Error"})



}
    
    

  

  
   



}

const getSector = (department) => {
//Technology/ Data Management Services Administration


return department.split('/')[0]
}

const getDepartment = (department) => {



   return department.split('/')[1]
}