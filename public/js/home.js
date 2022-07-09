//const { response } = require("express");

//variables
let uploader = document.getElementById('file');

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

file.onchange = () => {
    let sourceTag = 'source';
    const selectedFile = file.files[0];
    console.log(selectedFile);
    loadPlayer = document.getElementById('audio_player');
    mp3_src = document.getElementById('mp3_src');
    mp3_src.setAttribute('src', './audio/' + selectedFile.name);
    //location.reload(true);
  
    console.log(document.getElementById('source'));
  }

  const handler = () => {
    const selectedFiles = [...file.files];
    console.log(file);
  }

//button disabler
 uploadBTN.disabled = true;
 searchBTN.disabled = true;
 updateBTN.disabled = true;
 deleteBTN.disabled = true;



  

//event listeners
uploadBTN.addEventListener('click', upload); {
    upload();
}

searchBTN.addEventListener('click', search); {
    search();
}

updateBTN.addEventListener('click', update); {
    update();
}

deleteBTN.addEventListener('click', del); {
    del();
}

uploader.addEventListener('change', handler); {
    upload();
}

songField.addEventListener('input', checkFields); {
    if (song.value != "") {
    checkFields(song);
    UploadcheckFields(song);
    }
}

songField.addEventListener('input', UploadcheckFields); {
    if (song.value != "") {
    UploadcheckFields(song);
    }
}

artistField.addEventListener('input', checkFields); {
    if (artist.value != "") {
    checkFields(artist);
    }
}

artistField.addEventListener('input', UploadcheckFields); {
    if (song.value != "") {
    UploadcheckFields(artist);
    }
}

albumField.addEventListener('input', checkFields); {
    if (album.value != "") {
    checkFields(album);
    }
}

albumField.addEventListener('input', UploadcheckFields); {
    if (album.value != "") {
    UploadcheckFields(album);
    }
}

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

// load database table
//document.addEventListener('DOMContentLoaded', funtion () {
  //fetch('http://localhost:3000/search')
  //.then( response => response.json())
  //.then(data => console.log(data));
  //loadTable([]);
//});

//
//let checkField = checkFields();

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
    if (song.value && album.value && artist.value && uploader_name.value && file.onchange(true) != "") {
        uploadBTN.disabled = false;
        console.log('Upload Button enabled');
    }
};

//load database data into index.html
function loadTable(data) {
    const table = document.querySelector('table tbody');
    let tableHtml = "";
  
    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='3'>No Data</td></tr>";
    }
  }


//functions
function upload(ev) {
    let uploadGood = document.createElement("p")
    uploadGood.id = "uploadGood"
    uploadGood.innerHTML = ""
    if (song.value && album.value && artist.value && uploader_name.value != "") {
        disableButton = false;
        uploadGood.innerHTML = "Succesful Upload!"
        playerContainer.appendChild(uploadGood);
        song.value = "";
        album.value = "";
        artist.value = "";
        uploader_name.value = "";
        console.log('Upload Succesful');
    }
}
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