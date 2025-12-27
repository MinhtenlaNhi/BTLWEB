const mongoose = require("mongoose");

module.exports.connect = async() => {

    try{
        await mongoose.connect('mongodb+srv://yiwang0508_db_user:9ksYrCL3OuU5tFzF@cluster0.sjssrbu.mongodb.net/Product?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connect Successful!");
    }
    
    catch(error){
        console.log("Connect Fail!");
    }
}


