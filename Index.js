const path = require("path");
const ejs = require("ejs");
const session = require("express-session");
const express = require('express');
const { userInfo } = require("os");
const { response } = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'index');

app.use(express.json());
app.use(express.urlencoded({ 
  extended: true, 
  SameSite: 'none'
}));

app.get("/", (req, res) => {
    res.render('index');
  });

app.get("/public/index.html", (req, res) => {
    res.render('index');
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));