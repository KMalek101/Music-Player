if you want to add a new song here's what you can do :
1- Go to src folder and add the song cover(png only)
2- Go to src folder and add the song(mp3 only)
3- Go to index.html and replace <audio id="customID" src="src/song.mp3"></audio> replace customID with the id you want and song.mp3 with your actual song name
4- Go to script.js and add a new const named 'yoursong' (replace 'yoursong' with the song you want) and add it to the songs array
5- inside the script.js go to loadSong function and add the following :
    { 
            title: "your song name", 
            author: "author name", 
            cover: "src/cover.png" 
        },
