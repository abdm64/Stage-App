

const express =require('express');
const evaluationController = require('../controller/EvaluationController')
const auth = require('../middleware/auth-check')

const app = express.Router();



// ,auth

app.get('/api/v2/evaluation/:id' , evaluationController.getEvaluation)

app.post('/api/v2/evaluation/:id', evaluationController.postEvaluation)

app.get('/api/v2/matricule',auth , evaluationController.getMat)





module.exports = app