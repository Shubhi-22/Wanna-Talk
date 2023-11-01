const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = async () => {
    try{
        console.log("hi");
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("hi");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}



module.exports = connectDB;
