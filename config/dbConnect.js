const mongoose = require('mongoose');
const dbConnect = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/bee_ete',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{console.log("Database connected!!")})
    .catch((e)=>{console.log("Error occured while connecting to the database")});
}

module.exports = dbConnect;