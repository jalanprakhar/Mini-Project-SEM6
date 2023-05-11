const express = require("express");
const cors = require("cors");
require("./db/connection.js");
const authRouter = require("./routers/auth.js");
const userRouter = require("./routers/users.js");
const app = express();
const messageRouter = require("./routers/messages.js");
const path = require("path");

app.use(cors());
app.use(express.json({ limit: "500mb" }));

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

module.exports = app;
