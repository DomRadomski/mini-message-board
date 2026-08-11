// app.js
const path = require("node:path");
const express = require("express");
const { body, validationResult } = require("express-validator");
const db = require("./db/queries");

const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// getAllMessages
app.get("/", async (req, res) => {
  const messages = await db.getAllMessages()
  res.render("index", { messages });
});

// get individual message
app.get("/message/:messageId", async (req, res) => {
  const id = req.params.messageId;
  const message = await db.getMessageById(id);

  if (message.length === 0) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { message });
});

app.get("/new", (req, res) => {
  res.render("new");
});

const validateMessage = [
  body("user")
    .trim()
    .isAlpha().withMessage("must only contain letters")
    .isLength({ min: 1, max: 10 }).withMessage(`must be between 1 & 10 characters long`),
  body("text")
    .trim()
    .isLength({ min: 1, max: 50 }).withMessage(`must be between 1 & 50 characters long`),

]

app.post("/new", [validateMessage, async (req, res) => {
  const { user, text } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("new", {
      title: "Message",
      errors: errors.array(),
    });
  }

  await db.insertMessage(text, user);
  res.redirect("/");
}]);

const PORT = 6969;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
