
//variables from document
let uploader = document.getElementById('simple-file-upload');
let song = document.getElementById('song');
let album = document.getElementById('album');
let artist = document.getElementById('artist_name');
let uploader_name = document.getElementById('uploader_name');
let link = document.getElementById('link');
let playerContainer = document.getElementById('player_container');
let uploadBTN = document.getElementById('upload');
let searchBTN = document.getElementById('search');
let updateBTN = document.getElementById('update');
let deleteBTN = document.getElementById('delete');
let songField = document.getElementById('song');
let artistField = document.getElementById('artist_name');
let albumField =document.getElementById('album');
let uploaderField = document.getElementById('uploader_name');
let mp3_text = document.getElementById('mp3_text');
let audio_player = document.getElementById('audio_player');
let updateRowBTN = document.getElementsByClassName('update');
let editBTNS = document.querySelectorAll('.editBTN');
let simplefileupload = document.getElementById('simple-file-upload');

//log file name in console
const handler = () => {
    const selectedFiles = [...file_input.files];
    console.log(file_input);
  };

//listen for change in 2nd file field 
file_input.onchange = () => {
    let sourceTag = 'source';
    const selectedFile = file_input.files[0];
    console.log(selectedFile);
    mp3_text.value = selectedFile.name;
    mp3_text.setAttribute('size', mp3_text.length);
    // getSignedRequest(selectedFile); //for using s3 *not using anymore
  };

//event listeners//
//function for edit button
 editBTNS.forEach(editBTN => {
    editBTN.addEventListener('click', function handleClick(ev) {
        console.log('Edit Button Clicked', ev);
    });
 });

 //listen for file upload success 
uploader.addEventListener("fileUploadSuccess", function (e) {
   link.value = this.value;
  alert('file upload successful!')
   console.log(this.value);
   console.log(uploader.name);
});

//functions//
//upload file to s3 *not using anymore
function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "https://localhost:3000");
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          document.getElementById('preview').src = url;
          document.getElementById('avatar-url').value = url;
        }
        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  };

//get request aignature from s3 *not using anymore
function getSignedRequest(file){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${file.type}`);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "https://localhost:3000");
    console.log(xhr);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          const response = JSON.parse(xhr.responseText);
          uploadFile(file, response.signedRequest, response.url);
        }
        else{
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send()
  };