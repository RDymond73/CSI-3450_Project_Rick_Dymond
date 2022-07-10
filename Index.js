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
const { resolve } = require("path");
const app = express();
let instance = null;
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

//class DBService {
  //static getDbServiceInstance() {
  //  return instance ? instance : new Dbservice();
  //}

 // async getALLData() {
   // try {
   //   const response = await new Promise((resolve, reject) => {
    //    const query = "SELECT * FROM music_table WHERE song = ?;";

     //   database.query(query, (error, results) => {
   //       if (error) reject(new Error(error.message));
    //      resolve(results);
   //     })
   //   });
   //   console.log(reponse);
  //  } catch (error) {
  //    console.log(error);
  //  }
 // }
//}

//module.exports = DBService;

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

//app.use(upload());


//test server via http
// app.get("/home", (req, res) => {
//    res.render(__dirname + '/views/index.ejs', {test: 'HELLO!'})
//    console.log('HTTP reponse successful');
//   });

app.get('/', (req, res) => {
  res.redirect('/home');
  });

  //upload mp3 file
 app.get("/upload", (req, res) => {
  res.redirect('/home');
  console.log('Upload Reponse Successful');
  });

// app.all('/insert_table', function(req, res){
//   let mp3_data = req.body;
//   let mp3_file = req.files.mp3_file;

//   mp3_file.mv('./audio/' + mp3_file.name, function (error) {
//     if(error) {
//     console.log('MP3 Upload not succesful');
//     console.log(error);
//   }else{
//     console.log('MP3 Upload Succesful');
//   }
//   console.log(mp3_file);
//   });

//   res.redirect('/home');
// });

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
    let sql = 'CREATE TABLE music_table(id INT AUTO_INCREMENT PRIMARY KEY, song VARCHAR(255), album VARCHAR(255), artist VARCHAR(255), uploader VARCHAR(255), mp3 BLOB)';
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
  //insert row into music_table
  app.all('/insert_table', (request, response) => {
    
    let song =  request.query.song;
    let album = request.query.album;
    let artist = request.query.artist;
    let uploader = request.query.uploader;
    let mp3_file = request.query.mp3_file;
    console.log(song);
    console.log(album);
    console.log(artist);
    console.log(uploader);
    //let mp3_file = request.files.mp3_file;
    let sql = "INSERT INTO `music_table`(`id`, `song`, `album`, `artist`, `uploader`, `mp3`) VALUES (NULL" + ", '" + song + "', '"+ album +"', '" + artist + "', '" + uploader + "', " + 'MP3' + ');';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    response.redirect('/home');
    console.log('Insert Query');
  });

  //search
  app.all('/search_table', (request, response) => {
    let sql = 'SELECT * FROM music_table';
    //const db = DBService.getDbServiceInstance();
    //const result = DBService.getALLData();
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    response.redirect('/home');
    console.log('Search Querry');

  });

  //Load table into EJS
  app.all('/home', (req, res) => {
  console.log(req.query);
  console.log(res.query);
  let sql = 'SELECT * FROM music_table ORDER BY id';
  database.query(sql, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.render(__dirname + '/views/index.ejs', {title: 'Music Table Data' , action:'list', index:data});
  });

  });
//drop row
  app.all('/drop_row', (req, res) => {
    let rowID = req.query.id;
    let sql = 'DELETE FROM music_table WHERE id=' + rowID;
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