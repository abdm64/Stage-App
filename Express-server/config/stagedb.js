const mongoose =require('mongoose');
const base_url = process.env.BASE_URL || "mongodb://localhost:27017/"


mongoose
.connect(base_url+'test', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() => {
  console.log(' stagedb Connected to database!');
})
.catch(error => {
  console.log('Connection failed!');
  console.log(error);
});
mongoose.Promise = global.Promise;

module.exports = exports = mongoose;