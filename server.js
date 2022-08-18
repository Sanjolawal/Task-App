const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const test = require(`./ServerRoutes/tes`);

dotenv.config();

const url = process.env.url;

// Server setup
app.listen(3000, console.log(`Server is listening.. `));

// const router = require("./ServerRoutes/route");
// app.use(express.static(__dirname, +"public"));
// app.use("/api", express.json());
// app.use(router);

// connecting Server to Mongodb database using mongoose

async function main() {
  try {
    const initial = await mongoose.connect(url);
    console.log(`Connected to DB`);
    const structure = mongoose.Schema({
      task: String,
      info: String,
    });
    const collection = mongoose.model("collection", structure);
    module.exports = collection;
    const router = require("./ServerRoutes/route");
    app.use(express.static(__dirname, +"public"));
    app.use("/api", express.json());
    app.use(router);
  } catch {
    console.log(" Database error");
  }
}

main();
