

const Encadreur = require('../models/Responsable');
const express = require("express");
const router = express.Router();


router.get('/api/encadreur/data/:id',(req,res, next)=>{

    Encadreur.findOne( {Employee_Number  : req.params.id }  , { _id : false},

        (err, docs) => {
            // Handle any possible database errors
    
                if (err) return res.status(500).send(err);
                return res.send(docs);
            }
        )
  })

  module.exports = router;