// app.js
const path = require("node:path");
const express = require("express");
const messages = require("./messages");

const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { messages });
});

app.get("/new", (req, res) => {
  res.send("What you saying my g");
});

const PORT = 6969;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});