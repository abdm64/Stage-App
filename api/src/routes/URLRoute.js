const express =require('express');
const urlController = require('../controller/URLController')
//const auth = require('./auth-check')
const app = express.Router();


app.post("/api/v2/random", urlController.postRandomhash)

app.get("/api/v2/random/:id", urlController.getUrlById)

app.delete("/api/v2/random/:id", urlController.deleteUrlById)



module.exports = app;