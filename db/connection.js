// // const mongoose  = require("mongoose");
// import mongoose from "mongoose"

// const DB = process.env.DATABASE

// mongoose.connect(DB).then(()=> console.log("Database Connected")).catch((err)=>console.log(err))

import mongoose from "mongoose";
import colors from "colors";
// Create a connection to the database using Mongo
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connectted to DataBase ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in connecting MongoDB ${error}`.bgRed.white);
  }
};

export default connectDB;
