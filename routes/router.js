const express = require("express");
const router = express.Router();
// const controllers = require("../Controllers/cropController");
const CropModel = require("../models/CropSchema");

//routes
router.get("/crops", async (req, res) => {
  const search = req.query.search || "";
  const page = req.query.page || 1;
  const Items_per_page = 30;

  const query = {
    Crop: {
      $regex: search,
      $options: "i",
    },
  };

  try {
    // console.log(req.query);
    const skip = (page - 1) * Items_per_page;
    const count = await CropModel.countDocuments(query);

    let allcps = await CropModel.find(query).limit(Items_per_page).skip(skip);

    const pageCount = Math.ceil(count / Items_per_page);

    res.status(200).json({
      Pagination: {
        count,
        pageCount,
      },
      allcps,
    });
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
