// app.js
const path = require("node:path");
const express = require("express");
const messages = require("./messages");

const app = express();

let nextMessageId = 11;

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { messages });
});

app.get("/message/:messageId", (req, res) => {
  const message = messages.find(m => m.id === Number(req.params.messageId));

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { message });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { user, text } = req.body;

  messages.push({
    text: text,
    user: user,
    added: new Date(),
    id: nextMessageId
  });

  nextMessageId++

  res.redirect("/");
});

const PORT = 6969;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
