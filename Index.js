//variables for server
const path = require("path");
const ejs = require("ejs");
const mysql = require("mysql");
const env = require('dotenv');
const cors = require('cors');
const fs = require('fs');
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
const { request } = require("http");
const app = express();
let instance = null;
env.config();

//database connection object
// const database = mysql.createConnection({
//       //database
//       host: 'localhost',
//       user: 'root',
//       password: '',
//       database: 'music_db',
//       multipleStatments: true
// });

const database = mysql.createConnection({
  //database
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b5bb56fadceead',
  password: '781ab838',
  database: 'heroku_2baab068f103003',
  multipleStatments: true
});

//database connection function
database.connect(function(err) {
  if(err) {
    console.log('Error no connection to database');
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



//test server via http
// app.get("/home", (req, res) => {
//    res.render(__dirname + '/views/index.ejs', {test: 'HELLO!'})
//    console.log('HTTP reponse successful');
//   });

  //upload mp3 file
//  app.get("/upload", (req, res) => {
//   res.redirect('/home');
//   console.log('Upload Reponse Successful');
//   });

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
    let sql = 'CREATE TABLE music_table(id INT AUTO_INCREMENT PRIMARY KEY, song VARCHAR(255), album VARCHAR(255), artist VARCHAR(255), uploader VARCHAR(255), mp3 VARCHAR(255))';
    let databaseName = 'music_db';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    res.redirect('/home');
    console.log('Table Created');
  });

  app.get('/create_mp3table', (req, res) => {
    let sql = 'CREATE TABLE mp3_table(id INT AUTO_INCREMENT PRIMARY KEY, mp3 BLOB)';
    let databaseName = 'music_db';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    res.redirect('/home');
    console.log('MP3 Table Created');
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
  app.post('/insert_table', (request, response) => {
    
    let song =  request.body.song;
    let album = request.body.album;
    let artist = request.body.artist_name;
    let uploader = request.body.uploader_name;
    let mp3_file = request.files.mp3_file;
    //let mp3_file = request.query.mp3_file;
    console.log(song);
    console.log(album);
    console.log(artist);
    console.log(uploader);
    console.log(mp3_file);
    let sql = "INSERT INTO `music_table`(`id`, `song`, `album`, `artist`, `uploader`, `mp3` ) VALUES (NULL, " + "'" + song + " ', " + "'" + album + "', '" + artist + "' , " + "'" + uploader + "', '" + JSON.stringify(mp3_file.name) + "');";
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      mp3_file.mv("public/audio/" + mp3_file.name, function(error) {
        if (error) {
          console.log('error moving audio file');
        } else {
          console.log('audio file moved');
        } 
      });
    });
    mp3_file.mv("/public/audio/" + mp3_file.name, function(error) {
      if (error) {
        console.log('error moving audio file');
      } else {
        console.log('audio file moved');
      } 
    });
    response.redirect('/home');
    //response.render(__dirname + '/views/index.ejs', {title: 'Music Table AYO' , action:'list', index: data});
  });
    //console.log('Insert Query');
  

  app.all('/update_row', (req, res) => {
    let rowID = req.query.id;
    let song =  req.query.song;
    let album = req.query.album;
    let artist = req.query.artist;
    let uploader = req.query.uploader;
    let mp3_file = req.files.mp3_file;
    console.log(song);
    console.log(album);
    console.log(artist);
    console.log(uploader);
    let sql = 'UPDATE music_table SET (' + song + ", '" + album +"', '" + artist + "', '" + uploader + ') WHERE id=' + rowID ;
    let databaseName = 'music_db';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    res.redirect('/home');
    console.log('Row Deleted');
  });

  //select row
  app.get('/select_row', (request, response) => {
    let rowID = request.query.id;
    let source = request.query.source;
    let mp3_file = request.query.mp3;
    let source_string = '/audio/' + mp3_file.replace(/(^"|"$)/g, '');
    let sql = 'SELECT * FROM music_table WHERE id=' +rowID;
    let databaseName = 'music_db';
    console.log(source);
    console.log(source_string);
    database.query(sql, (err, data) => {
      if (err) throw err;
      console.log('Row Selected');
      response.render(__dirname + '/views/index.ejs', {title: 'Selected Track' , action:'list', index: data, player: 'update', source: source_string});
      console.log('Select Query');
      });
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
  let sql = 'SELECT * FROM music_table ORDER BY id';
  database.query(sql, (err, data) => {
    if (err) throw err;
    console.log('Database table loaded');
    res.render(__dirname + '/views/index.ejs', {title: 'Music Table Data' , action:'list', index: data, player: ""});
    });
  });

  // app.all('/home', (req, res) => {
  //   console.log(req.query);
  //   console.log(res.query);
  //   let sql = 'SELECT * FROM mp3_table ORDER BY id';
  //   database.query(sql, (err, data) => {
  //     if (err) throw err;
  //     console.log(data);
  //     res.render(__dirname + '/views/index.ejs', {title: 'Music Table Data' , action:'list', index:data});
  //   });

  // });

  //upload file I hope
  // app.post('/insert_table2', function(request, response) {
  //   if(request.files) {
  //     let rowID = 22;
  //     let song =  request.query.song;
  //     let album = request.query.album;
  //     let artist = request.query.artist;
  //     let uploader = request.query.uploader;
  //     let mp3_file = request.files.mp3_file;
  //     console.log(song);
  //     console.log(album);
  //     console.log(artist);
  //     console.log(uploader);
  //     let sql = "INSERT INTO `mp3_table` (id, `mp3`) VALUES (NULL," + JSON.stringify(mp3_file.name) + ");";
  //     database.query(sql, (err, result) => {
  //       if (err) throw err;
        
  //     });
  //     //console.log(mp3_file);
  //     mp3_file.mv('./public/audio/');
  //   }
  //   response.redirect('/home');
  // });

  //drop row
  app.all('/drop_row', (req, res) => {
    let rowID = req.query.id;
    let mp3 = req.query.mp3;
    let mp3_string = mp3.replace(/(^"|"$)/g, '');
    let sql = 'DELETE FROM music_table WHERE id=' + rowID;
    let databaseName = 'music_db';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    fs.unlinkSync('./public/audio/' + mp3_string);
    res.redirect('/home');
    console.log('Row Deleted');
  });

//port for application listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

