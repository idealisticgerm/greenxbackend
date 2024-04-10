require("dotenv").config();
const express = require("express");
const app = express();
require("./db/connection"); // database connection
const cors = require("cors");
const router1 = require("./routes/router"); // Fixed router const
const PORT = process.env.PORT || 6010;

app.use(cors());
app.use(express.json());
app.use(router1);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
