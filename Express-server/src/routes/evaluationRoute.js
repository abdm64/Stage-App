

const express =require('express');
const evaluationController = require('../Controller/EvaluationController')
const auth = require('./auth-check')
const app = express.Router();



// ,auth

app.get('/api/evaluation/:id' , evaluationController.getEvaluation)

app.post('/api/evaluation/:id', evaluationController.postEvaluation)

app.get('/api/matricule' , evaluationController.getMat)





module.exports = app