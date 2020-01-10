const express =require('express');
const urlController = require('../Controller/URLController')
//const auth = require('./auth-check')
const app = express.Router();


app.post("/api/random", urlController.postRandomhash)

app.get("/api/random/:id", urlController.getUrlById)

app.delete("/api/random/:id", urlController.deleteUrlById)



module.exports = app;