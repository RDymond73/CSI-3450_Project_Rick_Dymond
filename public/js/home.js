//const { response } = require("express");

// { json } = require("body-parser");

//const { threadId } = require("worker_threads");

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
let audio_player = document.getElementById('audio_player');

//let deleteRowBTN = document.getElementsByID('deleteRow');

let updateRowBTN = document.getElementsByClassName('update');

file_input.onchange = () => {
    let sourceTag = 'source';
    const selectedFile = file_input.files[0];
    console.log(selectedFile);
    loadPlayer = document.getElementById('audio_player');
    mp3_src = document.getElementById('source');
    mp3_src.setAttribute('src', './audio/' + selectedFile.name);
  }

// uploadBTN.onclick = function() {
//     let mp3_file = file_input.files[0];
//     audio_player.load();
//     setTimeout(function () {console.log('audio src:', audio_player.currentSrc)});
//     console.log('audio player updated');
// };

  const handler = () => {
    const selectedFiles = [...file_input.files];
    console.log(file_input);
  }

//event listeners
 let editBTNS = document.querySelectorAll('.editBTN');

 editBTNS.forEach(editBTN => {
    editBTN.addEventListener('click', function handleClick(ev) {
        console.log('Edit Button Clicked', ev);
    });
 });

//deleteRowBTN.addEventListener('click', del); {
  //  del();
//}

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

//load database data into index.html
// function loadTable(data) {
//     const table = document.querySelector('table tbody');
//     //const table_row = document.querySelector('tbody tr');
//     //const table_data = document.querySelector('tr td');
//     //let tableHtml = "";
  
//     if(data.length === 0) {
//         //table.innerHTML = "<tr><td class='no-data' colspan='5' id='data_placeholder'>No Data</td></tr>";
//     } else {
//         //table.innerHTML = table_data.value;
//     };
//     console.log("Table loaded");
//   }


//functions
function upload(ev) {
    uploadBTN.onclick = function () {

        let mp3_file = document.getElementById('file_input');
        const selectedFile = file_input.files[0];
        let song_input = song.value;
        let album_input = album.value;
        let artist_input = artist.value;
        let uploader_input = uploader_name.value;

        console.log(song_input);
        console.log(album_input);
        console.log(artist_input);
        console.log(uploader_input);
        //console.log(mp3_file.value);

        // let uploadParm = {
        //     params: {
        //     song: song_input,
        //     album: album_input,
        //     artist : artist_input,
        //     uploader: uploader_input,
        //     mp3: mp3_file,
        //     }
        // };
        // console.log(uploadParm);
        // JSON.stringify(uploadParm);
        // console.log(uploadParm);
        //location.href=('/insert_table?[object%20Object]?' + JSON.stringify(uploadParm));

        location.href="/insert_table?" + 'song=' + song_input + '&' + 'album=' + album_input + '&' + 'artist=' + artist_input + '&' + 'uploader=' + uploader_input + '&' + 'mp3=' + JSON.stringify(mp3_file.name);
    }
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
        console.log('Upload Successful');
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
//test
// var app = new function() {
//     this.el = document.getElementById('music_table');
//     this.music_array = [] +1;

//     this.FetchAll = function() {
//        let data = '';

// if (this.music_array.length>0) {
// for(i=0;1<this.music_array.length; i++) {
//                 data+='<tr>';
//       data+='<td>'+(i+1) +". " +this.music_array[i] + "</td>";
//               data+='<td><button onclick="app.Delete('+i+')"class="btn btn-danger">Delete</button></td>';
//            data+='<td><button onclick="app.Edit('+i+')"class="btn btn-warning">Edit</button></td>';
//             }
//         }

//         //this.Count(this.song.length);
//         //return this.el.innerHTML = data
//     };

//     this.Add = function(){
//         el = document.getElementById('song');
//         let song = el.value;
//         if(song){
//            this.song.push(song.trim());
//            song.value='';
//            this.FetchAll();
// }
//     };

//    this.Edit = function(item){
//     el = document.getElementById('music_table');
//     this.el.value = this[item]

// };

//     this.Delete = function (item) {
//         this.song.splice(item,1)
//         this.FetchAll();

// };

// this.Count = function(data) {
// return threadId.el.innerHTML = data
//    };
 //}

//app.FetchAll();