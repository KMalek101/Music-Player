const lullaby = document.getElementById('lullaby')
const citylights = document.getElementById('city-lights')
const progress = document.querySelector('.progress-bar')
const progressContainer = document.querySelector('.progress-bar-container')
const title = document.getElementById("songName")
const cover = document.querySelector(".cover")
const author = document.getElementById("songAuthor")
const songs = [lullaby, citylights]
let currentSongIndex = 0



function playSong(){
    if (songs[currentSongIndex].paused) {
        songs[currentSongIndex].play();}
    else{
        pauseSong()}
}

function pauseSong(){
    if (!songs[currentSongIndex].paused) {
        songs[currentSongIndex].pause();}
    else{
        playSong()}
}

function next(){
    songs[currentSongIndex].pause();
    songs[currentSongIndex].currentTime = 0;
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = currentSongIndex - songs.length
    }
    songs[currentSongIndex].play()
    loadSong();
    songs[currentSongIndex].addEventListener('timeupdate', updateProgress)
    console.log(currentSongIndex);
    songs[currentSongIndex - 1].removeEventListener('timeupdate', updateProgress)
}

function prev() {
    songs[currentSongIndex].pause();
    songs[currentSongIndex].currentTime = 0;
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    songs[currentSongIndex].play();
    loadSong();
    songs[currentSongIndex].addEventListener('timeupdate', updateProgress);
    console.log(currentSongIndex);
    songs[(currentSongIndex + 1) % songs.length].removeEventListener('timeupdate', updateProgress);
}
function loadSong(){

    const songInfo = [
        { 
            title: "Lost in the City Lights", 
            author: "Cosmo Sheldrake", 
            cover: "src/cover-1.png" 
        },
        { 
            title: "Forest Lullaby", 
            author: "Lesfm", 
            cover : "src/cover-2.png"
        }
    ];
    title.textContent = songInfo[currentSongIndex].title
    author.textContent = songInfo[currentSongIndex].author
    cover.src = songInfo[currentSongIndex].cover

}
function updateProgress(event){
        const { duration, currentTime } = event.target;
        const progressbarWidth = (event.target.currentTime * 100) / duration;
        const currentSeconds = Math.floor(currentTime % 60) 
        const currentMinutes = Math.floor(currentTime / 60) 
        const durationSeconds = Math.floor(duration % 60) 
        const durationMinutes = Math.floor(duration / 60) 

        let currentTimeDisplay = document.getElementById('currentTime')
        let durationTimeDisplay = document.getElementById('duration');

        progress.style.width = `${progressbarWidth}%`;
    
        durationTimeDisplay.textContent = durationMinutes < 1 ? `${durationSeconds}s` : `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
        currentTimeDisplay.textContent = currentMinutes < 1 ? `${currentSeconds}s` : `${(currentMinutes)}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

        //jump to next song if the song finished

        if (duration == currentTime) {
            next();
        }

    }
    
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = songs[currentSongIndex].duration
    currentTime = (clickX / width) * duration
    songs[currentSongIndex].currentTime = currentTime

}
//udpate progress event listener
songs[currentSongIndex].addEventListener('timeupdate', updateProgress)

//set progress event listener
progressContainer.addEventListener('click', setProgress) 

