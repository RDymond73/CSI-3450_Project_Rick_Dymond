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

file.onchange = () => {
    const selectedFile = file.files[0];
    console.log(selectedFile);
  }

  const handler = () => {
    const selectedFiles = [...file.files];
    console.log(file);
  }

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

uploader.addEventListener('change', handler)

//functions
function upload(ev) {
    let uploadGood = document.createElement("p")
    uploadGood.id = "uploadGood"
    uploadGood.innerHTML = ""
    
    if (song.value && album.value && artist.value && uploader_name.value && uploader.value != "") {
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