
//variables
let uploader = document.getElementById('file_input');
let song = document.getElementById('song');
let album = document.getElementById('album');
let artist = document.getElementById('artist_name');
let uploader_name = document.getElementById('uploader_name');
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
const handler = () => {
    const selectedFiles = [...file_input.files];
    console.log(file_input);
  }
file_input.onchange = () => {
    let sourceTag = 'source';
    const selectedFile = file_input.files[0];
    console.log(selectedFile);
    mp3_text.value = selectedFile.name;
    loadPlayer = document.getElementById('audio_player');
    mp3_src = document.getElementById('source');
    mp3_src.setAttribute('src', './audio/' + selectedFile.name);

        if(selectedFile == null){
          return alert('No file selected.');
        }
        getSignedRequest(selectedFile);
      };

// uploadBTN.onclick = function() {
//     let mp3_file = file_input.files[0];
//     audio_player.load();
//     setTimeout(function () {console.log('audio src:', audio_player.currentSrc)});
//     console.log('audio player updated');
// };


//event listeners

 editBTNS.forEach(editBTN => {
    editBTN.addEventListener('click', function handleClick(ev) {
        console.log('Edit Button Clicked', ev);
    });
 });

// uploader.addEventListener('change', handler); {
//     upload();
// }

// songField.addEventListener('input', checkFields); {
//     if (song.value != "") {
//     checkFields(song);
//     UploadcheckFields(song);
//     }
// }

// songField.addEventListener('input', UploadcheckFields); {
//     if (song.value != "") {
//     UploadcheckFields(song);
//     }
// }

// artistField.addEventListener('input', checkFields); {
//     if (artist.value != "") {
//     checkFields(artist);
//     }
// }

// artistField.addEventListener('input', UploadcheckFields); {
//     if (song.value != "") {
//     UploadcheckFields(artist);
//     }
// }

// albumField.addEventListener('input', checkFields); {
//     if (album.value != "") {
//     checkFields(album);
//     }
// }

// albumField.addEventListener('input', UploadcheckFields); {
//     if (album.value != "") {
//     UploadcheckFields(album);
//     }
// }

uploaderField.addEventListener('input', checkFields); {
    if (uploader_name.value != "") {
    checkFields(uploader_name);
    UploadcheckFields(uploader_name);
    }
}

uploaderField.addEventListener('input', UploadcheckFields); {
    if (uploader_name.value != "") {
    UploadcheckFields(uploader_name);
    }
}

//check text fields
function checkFields (ev) {
    this.song;
    this.album;
    this.artist;
    this.uploader_name;
    if (song.value && album.value && artist.value && uploader_name.value != "") {
        searchBTN.disabled = false;
        updateBTN.disabled = false;
        deleteBTN.disabled = false;
        console.log('Buttons enabled');
    }
};

function UploadcheckFields (ev) {
    this.song;
    this.album;
    this.artist;
    this.uploader_name;
    this.file;
    if (song.value && album.value && artist.value && uploader_name.value && file_input.onchange(true) != "") {
        uploadBTN.disabled = false;
        console.log('Upload Button enabled');
    }
};

function uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
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

function getSignedRequest(file){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${file.type}`);
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
    xhr.send();
  }

// client interaction functions
// function upload(ev) {
//     uploadBTN.onclick = function () {

//         let mp3_file = document.getElementById('file_input');
//         const selectedFile = file_input.files[0];
//         let song_input = song.value;
//         let album_input = album.value;
//         let artist_input = artist.value;
//         let uploader_input = uploader_name.value;
//         console.log(song_input);
//         console.log(album_input);
//         console.log(artist_input);
//         console.log(uploader_input);
//         location.href="/insert_table?" + 'song=' + song_input + '&' + 'album=' + album_input + '&' + 'artist=' + artist_input + '&' + 'uploader=' + uploader_input + '&' + 'mp3=' + JSON.stringify(mp3_file.name);
//     }
//     let uploadGood = document.createElement("p")
//     uploadGood.id = "uploadGood"
//     uploadGood.innerHTML = ""
//     if (song.value && album.value && artist.value && uploader_name.value != "") {
//         disableButton = false;
//         uploadGood.innerHTML = "Succesful Upload!"
//         playerContainer.appendChild(uploadGood);
//         song.value = "";
//         album.value = "";
//         artist.value = "";
//         uploader_name.value = "";
//         console.log('Upload Successful');
//     }
// }
function search(ev) {
    let searchGood = document.createElement("p")
    searchGood.id = "searchGood"
    searchGood.innerHTML = ""
        if (song.value || album.value || artist.value || uploader_name.value != "") {
           // location.reload();
            disableButton = false;
            searchGood.innerHTML = "Succesful Search!"
            playerContainer.appendChild(searchGood);
            song.value = "";
            album.value = "";
            artist.value = "";
            uploader_name.value = "";
            console.log('Search Succesful');
    }
}
function update(ev) {
    let updateGood = document.createElement("p")
    updateGood.id = "updateGood"
    updateGood.innerHTML = ""
    
    if (song.value && album.value && artist.value && uploader_name.value != "") {
    updateGood.innerHTML = "Succesful Update!"
    playerContainer.appendChild(updateGood);
    song.value = "";
    album.value = "";
    artist.value = "";
    uploader_name.value = "";
    console.log('Update Succesful');
    }
}
function del(ev) {
    let delGood = document.createElement("p")
    delGood.id = "delGood"
    delGood.innerHTML = ""
    
    if (song.value && album.value && artist.value && uploader_name.value != "") {
    delGood.innerHTML = "Succesful Deletion!"
    playerContainer.appendChild(delGood);
    song.value = "";
    album.value = "";
    artist.value = "";
    uploader_name.value = "";
    console.log('Delete Succesful');
    }
}