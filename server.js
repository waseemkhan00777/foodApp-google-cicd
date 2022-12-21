"use strict";

const express = require("express");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();
app.get("/", (req, res) => {
  res.send("Playing with Google CI/CD");
});

exports.TestFunc = (req, res) => {
  console.log("REQ:", req.body.message);
  res.status(200).send("Successful");
  return { status: 200 };
};
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
