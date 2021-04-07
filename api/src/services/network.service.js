

const axiosOne = require('axios')
require('dotenv').config();


const https = require('https');

const axios = axiosOne.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });


  exports.getEncadruerByMat = async (mat) => {

    const htisUrl =     process.env.HITS_API    
   
    try {
        let res = await axios.get(htisUrl+mat)
        //console.log(res)


        return res.data
    } catch (err){



        return err
    }




  }