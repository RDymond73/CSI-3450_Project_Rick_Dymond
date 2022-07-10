const { clearScreenDown } = require("readline");

let uploadParm = {
    "song": song_input,
    'album': album_input,
    'artist' : artist_input,
    'uploader': uploader_input,
    'mp3': mp3_file
}

JSON.stringify(uploadParm);

console.log(uploadParm);