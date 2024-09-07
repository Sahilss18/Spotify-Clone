console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let bottomSongName = document.getElementById('songName'); 
let bottomCover = document.getElementById('gif');  

let songs = [
    {songName: "Night Changes", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Little Things", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Story of My Life", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Steal My Girl", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "What Makes You Beautiful", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"}
];

// Load the song list into the song items
songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Function to update the bottom song information
const updateBottomSongInfo = () => {
    bottomSongName.innerText = `${songs[songIndex].songName} - One Direction`;
    bottomCover.src = songs[songIndex].coverPath; 
};

// Handle play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
    updateBottomSongInfo(); 
});

// Update seekbar smoothly
audioElement.addEventListener('timeupdate', () => { 
    let progress = (audioElement.currentTime / audioElement.duration) * 100; 
    myProgressBar.value = progress;
});

// Seekbar change
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Play specific song from list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = i;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        updateBottomSongInfo(); 
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    updateBottomSongInfo(); 
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    updateBottomSongInfo(); 
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};
