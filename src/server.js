// install and import express
const express = require("express");
const bodyParser = require("body-parser");
const users = require("./assets/user.json");

// const express = () => {};
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Code here
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/assets/users.html");
});

app.get("/users", function (req, res) {
  res.send({ users });
});

app.get("/:id", function (req, res) {
  const user = users.find((x) => x.id === req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "user not found" });
  }
});

app.post("/users", function (req, res) {
  const user = {
    id: users.length + 1,
    first_name: req.body.fName,
    last_name: req.body.lName,
    email: req.body.email,
    gender: req.body.gender,
    ip_address: req.body.ip,
    age: req.body.age,
  };
  users.push(user);
  res.json(user);
});

app.listen(8000, function () {
  console.log("Server running on port 8000");
});
// Note: Do not remove this export statement
module.exports = app;
