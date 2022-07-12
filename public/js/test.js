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

//edit row ntm
//<td><button class="update" onclick="location.href='/update_row?id=' + '<%= data.id%>' + '&song=' + '<%= song_input %>' +'&album=' + '<%= album_input %>' + '&artist=' + '<%= artist_input%>' + '&uploader=' + '<%= uploader_input%>'">Edit<button></td>