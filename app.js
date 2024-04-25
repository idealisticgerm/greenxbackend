// dotenv.config();
// // const express = require("express");
// import express from "express"
// const app = express();
// require("./db/connection"); // database connection
// const cors = require("cors");
// const router1 = require("./routes/router"); // Fixed router const
// const PORT = process.env.PORT || 6010;
// // import auth from "./routes/auth.js";
// // const auth = require("./routes/auth.js")

// app.use(cors());
// app.use(express.json());
// app.use(router1);


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import morgan from "morgan";
import auth from "./routes/auth.js";
import router from "./routes/router.js";
import cors from "cors";


//configure env
dotenv.config();
// If the env is not in root then give path { path: "./.env" }

//database config
connectDB();

const app = express();

//middlewares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

// ** routes
app.use(router)
app.use("/api/auth",auth);

//** rest api
app.get("/", (req, res) => {
  res.send("Hello Bhai!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
