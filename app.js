const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

const mogodburl = process.env.MONGODB_URL;
mongoose.connect(mogodburl, { useNewUrlParser: true });

app.use(express.json());
const router = require("./routers/router");

app.use("/router", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server started 3000");
});
