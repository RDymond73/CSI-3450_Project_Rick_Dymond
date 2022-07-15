//variables for server
const path = require("path");
const ejs = require("ejs");
const mysql = require("mysql");
const env = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const AWS = require('aws-sdk');
//const session = require("express-session");
//const fileUpload = require('express-fileUpload');
const express = require('express');
const axios = require('axios');
const { userInfo } = require("os");
const { response } = require("express");
const { strictEqual } = require("assert");
const { clearScreenDown } = require("readline");
const { brotliDecompress } = require("zlib");
const { writer } = require("repl");
const { resolve } = require("path");
const { request } = require("http");
const { HttpRequest } = require("aws-sdk");
const { send } = require("process");
const app = express();
const S3_BUCKET = 'csi3450-project-rick-dymondInfo';
let instance = null;
env.config();
AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIA3SJWYFGDN4F5T3BJ";
AWS.config.secretAccessKey = "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";
AWS.config.region = "us-east-1";
//heroku config:set AWS_ACCESS_KEY_ID=AKIA3SJWYFGDHDGLKXBI AWS_SECRET_ACCESS_KEY=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 *not using anymore
//heroku config:set S3_BUCKET_NAME=csi3450-project-rick-dymond *not using anymore

//connect web app to local database
// const database = mysql.createConnection({
//       //database
//       host: 'localhost',
//       user: 'root',
//       password: '',
//       database: 'music_db',
//       multipleStatments: true
// });

//connect web app to heroku database
const database = mysql.createPool({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b5bb56fadceead',
  password: '781ab838',
  database: 'heroku_2baab068f103003',
});

module.exports = database;

var db_config = {
  host: 'localhost',
    user: 'root',
    password: '',
    database: 'example'
};

//hanndle db disconnects
let connection;
function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
      handleDisconnect();
    }
  });
}

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
      Bucket: BUCKET_NAME,
      Key: fileName.name, // File name you want to save as in S3
      Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};


//middleware & routers
app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({ 
  extended: true, 
  SameSite: 'none'
}));

app.use(cors({
   origin: 'https://s3.console.aws.amazon.com/'
}));

//test server via http
app.get("/", (req, res) => {
   res.render(__dirname + '/home')
   console.log('HTTP reponse successful');
  });

  //upload mp3 file
 app.get("/upload", (req, res) => {
  res.redirect('/home');
  console.log('Upload Reponse Successful');
  });

// app.post('/insert_table', function(req, res){
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
   sql = 'CREATE DATABASE music_db';
   database.query(sql, (err, result) => {
   if(err) throw err;
   console.log(result);
   console.log('Database music_db Created');
   res.redirect('/home');
   });
});
   
//drop db for admin
app.get('/drop_db', (req, res) => {
    sql = 'DROP DATABASE music_db';
    database.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.redirect('/home');
    });
  });

//create table for admin
app.get('/create_table', (req, res) => {
    let sql = 'CREATE TABLE music_table(id INT AUTO_INCREMENT PRIMARY KEY, song VARCHAR(255), album VARCHAR(255), artist VARCHAR(255), uploader VARCHAR(255), mp3 VARCHAR(255), link VARCHAR(255))';
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
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    res.redirect('/home');
    console.log('Table Deleted');
  });

  //database querys//
  //insert row into music_table
app.get('/insert_table', (request, response) => {
    let song =  request.query.song;
    let album = request.query.album;
    let artist = request.query.artist_name;
    let uploader = request.query.uploader_name;
    let mp3_file = request.query.mp3_text;
    let link = request.query.link;
    console.log(song);
    console.log(album);
    console.log(artist);
    console.log(uploader);
    console.log(mp3_file);
    let sql = "INSERT INTO `music_table`(`id`, `song`, `album`, `artist`, `uploader`, `mp3`, `link`) VALUES (NULL, " + "'" + song + " ', " + "'" + album + "', '" + artist + "' , " + "'" + uploader + "', '" + mp3_file + "', '" + link + "');";
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    response.redirect('/home');
    console.log('Insert Query Successful');
  });
app.post('/insert_table', (request, response) => {
    let mp3_file = request.mp3_file;
    console.log(mp3_file);
    // mp3_file.mv("/public/audio/" + mp3_file.name, function(error) {
    //   if (error) {
    //     console.log('error moving audio file');
    //   } else {
    //     console.log('audio file moved');
    //   } 
    // });
    response.redirect('/home');
    console.log('Insert Query Successful');
  });

//update row
app.get('/update_row', (req, res) => {
    let rowID = req.query.id;
    console.log(rowID);
    let sql = 'SELECT * FROM music_table WHERE id=' +rowID;
    database.query(sql, (err, data) => {
      if (err) throw err;
      res.render(__dirname + '/views/Update.ejs', {action:'list', index: data, player: 'update'});
     });
    console.log('Row Selected for Update');
  });

app.get('/update', (request, response) => {
  let rowID = request.query.id;
  let song =  request.query.song;
  let album = request.query.album;
  let artist = request.query.artist_name;
  let uploader = request.query.uploader_name;
  let mp3_file = request.query.mp3_text;
  let sql = 'UPDATE music_table SET ' + "id='" + rowID + "', song='"+ song + "', album='" + album +"', artist='" + artist + "', uploader='" + uploader +  "', mp3='" + mp3_file + "' " + 'WHERE id=' + rowID;
    database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    });
    response.redirect('/home');
  });  

//select row
app.get('/select_row', (request, response) => {
    let rowID = request.query.id;
    let source = request.query.source;
    let mp3_file = request.query.mp3;
    let link = request.query.source;
    //let source_string = '/audio/' + mp3_file.replace(/(^"|"$)/g, '');
    let sql = 'SELECT * FROM music_table WHERE id=' +rowID;
    //console.log(source);
    console.log(link);
    database.query(sql, (err, data) => {
      if (err) throw err;
      console.log('Row Selected');
      response.render(__dirname + '/views/index.ejs', {title: 'Selected Track' , action:'list', index: data, player: 'update', source: link});
      console.log('Select Query');
      });
    });

//Load table into index.ejs
app.all('/home', (req, res) => {
  let sql = 'SELECT * FROM music_table ORDER BY id';
  database.query(sql, (err, data) => {
    if (err) throw err;
    console.log('Database table loaded');
    res.render(__dirname + '/views/index.ejs', {title: 'Music Table Data' , action:'list', index: data, player: ""});
    });
  });

//drop row from table
app.all('/drop_row', (req, res) => {
    let rowID = req.query.id;
    let mp3 = req.query.mp3;
    let link = req.query.link;
    let sql = 'DELETE FROM music_table WHERE id=' + rowID;
    let databaseName = 'music_db';
    database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    axios.delete('https://app.simplefileupload.com/api/v1/file?url=' + link, {
      auth: {
        username: 'pb574627fb61bb20a5d0f69aa972be0ad',
        password: 'sa2e110ef066b084c82e5b47c0ccaad16'
      }
    }).then(() => {
      console.log('Delete file @ ' + link);
      console.log('File Deleted');
      res.redirect('/home');
    }).catch((error) => {
      console.log(error);
    });
    console.log('Row Deleted');
  });

//get signature from s3
app.get('/sign-s3', (req, res) => {
    const s3 = new AWS.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

  // api setup for s3
  // app.use((req, res,) => {
  //   res.header("Access-Control-Allow-Origin", "https://csi3450-project-rick-dymond.herokuapp.com/");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested, Content-Type, Accept Authorization"
  //   )
  //   if (req.method === "OPTIONS") {
  //     res.header(
  //       "Access-Control-Allow-Methods",
  //       "POST, PUT, PATCH, GET, DELETE"
  //     )
  //     return res.status(200).json({})
  //   }
  // })

//port for application listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));