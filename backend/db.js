const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const mongooURI = "mongodb://0.0.0.0:27017/inotebook";

const connectToMongoo = () =>{
    // mongoose.connect(mongooURI, ()=>{
    //     console.log("connected to mongoose successfully")
    // })
    mongoose.connect(mongooURI)
    .then(()=>console.log("connected to mongoDB"))
    .catch((err)=>console.log("Mongo Error",err));
}

module.exports = connectToMongoo;