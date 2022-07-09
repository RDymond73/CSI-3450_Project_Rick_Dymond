//variables for server
const path = require("path");
const ejs = require("ejs");
const mysql = require("mysql");
const env = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileUpload');
const session = require("express-session");
const express = require('express');
const { userInfo } = require("os");
const { response } = require("express");
const { strictEqual } = require("assert");
const { clearScreenDown } = require("readline");
const { brotliDecompress } = require("zlib");
const { writer } = require("repl");
const app = express();
env.config();

//database connection object
const database = mysql.createConnection({
      //database
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'music_db'
});

//database connection function
database.connect(function(err) {
  if(err) {
    console.log('Error no connection');
    throw err;
  }
  console.log('Connected to Database');
});

//middleware & routers
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({ 
  extended: true, 
  SameSite: 'none'
}));

app.use(cors());

app.use(fileUpload());


//test server via http
app.get("/home", (req, res) => {
   res.render(__dirname + '/views/index.ejs', {test: 'HELLO!'})
   console.log('HTTP reponse successful');
  });

  //upload mp3 file
 app.get("/upload", (req, res) => {
  res.redirect('/home');
  console.log('Upload Reponse Successful');
  });

app.post('/home', function(req, res){
  let mp3_data = req.body;
  let mp3_file = req.files.mp3_file;

  mp3_file.mv('/public/audio/'+ mp3_file.name, function (error) {
    if(error) {
    console.log('MP3 Upload not succesful');
    console.log(error);
  }else{
    console.log('MP3 Upload Succesful');
  }
  console.log(mp3_file);
  });
});

//create db for admin
app.get('/create_db', (req, res) => {
  let databaseName = 'music_db';
   sql = 'CREATE DATABASE music_db';
   database.query(sql, (err, result) => {
   if(err) throw err;
   console.log(result);
   console.log('Database music_db Created');
   res.redirect('/home');
   
   });
   
//drop db for admin
app.get('/drop_db', (req, res) => {
  let databaseName = 'music_db';
    sql = 'DROP DATABASE music_db';
    database.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    //res.sendFile(__dirname + '/public/index.html');
    res.redirect('/home');
    });
  });
});

//create table for admin
app.get('/create_table', (req, res) => {
    let sql = 'CREATE TABLE music_table(id INT AUTO_INCREMENT PRIMARY KEY, song VARCHAR(255), artist VARCHAR(255), uploader VARCHAR(255), mp3 BLOB)';
    let databaseName = 'music_db';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    res.redirect('/home');
    console.log('Table Created');
  });

//drop table from database for admin
  app.get('/drop_table', (req, res) => {
    let sql = 'DROP TABLE music_table';
    let databaseName = 'music_db';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    res.redirect('/home');
    console.log('Table Deleted');
  });

  //database querys
  //create
  app.get('/insert_table', (request, response) => {
    let sql = "INSERT INTO music_table (id, song, artist, uploader, mp3) VALUES (NULL, 'Ripple', 'Grateful Dead', 'Rick Dymond', 'file')";
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    response.redirect('/home');
    console.log('Insert Query');
  });

  //test create
  app.post('/test_create', (request, response) => {

  });

  //search
  app.get('/search_table', (request, response) => {
    let sql = 'SELECT * FROM music_table';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    response.redirect('/home');
    console.log('Search Querry');
  });

  //search 2
  app.get('/search', (req, res) => {
  console.log(req.query);
  console.log(res.query);
  let sql = 'SELECT * FROM music_table';
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  res.json({
    message: 'search JSON reponse successful',
    id: req.query.id,
    song: req.query.song,
    artist: req.query.artist,
    uploader: req.query.uploader,
    mp3_file: req.query.mp3_file,
  });
  //http://localhost:3000/search?id=1&song=Ripple&artist=Grateful%20Dead&uploader=Rick%20Dymond&mp3_file=BLOB
  //res.redirect('/');

  //drop row
  app.get('/drop_row', (req, res) => {
    let sql = 'DELETE FROM music_table WHERE id=1';
    let databaseName = 'music_db';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    res.redirect('/home');
    console.log('Row Deleted');
  });

  });

  app.get('/drop_row', (req, res) => {
    let sql = 'DELETE FROM music_table WHERE id=1';
    let databaseName = 'music_db';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    res.redirect('/home');
    console.log('Row Deleted');
  });

//port for application listening
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));