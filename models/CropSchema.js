// const mongoose = require("mongoose");

// const CropSchema = new mongoose.Schema({
//   Crop: String,
//   "Required Nutrients": String,
//   "Climatic Season": String,
//   "Suitable Regions": String,
//   "Preferred Soil Type": String,
// });

// //model
// const crops = new mongoose.model("crops", CropSchema);
// module.exports = crops;

import mongoose from "mongoose";

const CropSchema = new mongoose.Schema({
  Crop: String,
  "Required Nutrients": String,
  "Climatic Season": String,
  "Suitable Regions": String,
  "Preferred Soil Type": String,
});

// Model
const crops = mongoose.model("crops", CropSchema);
export default crops;
