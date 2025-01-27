const mongoose = require('mongoose')
const mongo_url = process.env.MongoConnection

mongoose.connect(mongo_url)
    .then(()=> {
        console.log("Database is connected...")
    }) .catch((err)=>{
        console.log("MongoDb error occured..", err)
    })