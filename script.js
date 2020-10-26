const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const player = document.querySelector('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentTimeText = document.getElementById('current-time');
const durationText = document.getElementById('duration');

let isPlaying = false;
let songs = [
    {
        name: "AUDIO-1",
        displayName: "A Thousand Years",
        artist: "Christina Perri",
        imgName: 'img-1'
    },
    {
        name: "AUDIO-2",
        displayName: "Arms",
        artist: "Christina Perri",
        imgName: 'img-2'
    },
    {
        name: "AUDIO-3",
        displayName: "Love Story",
        artist: "Taylor Swift",
        imgName: 'img-3'
    },
    {
        name: "AUDIO-4",
        displayName: "Evil Love",
        artist: "Phineas & Ferb",
        imgName: 'img-4'
    },
    {
        name: "AUDIO-5",
        displayName: "Somewhere Only We Know",
        artist: "Keane",
        imgName: 'img-5'
    }
];

let index = 0;

function play() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    player.play();
}

function pause() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    player.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pause() : play()));

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    player.src = `./music/${song.name}.mp3`;
    image.src = `./img/${song.imgName}.jpg`;
}

function prev() {
    index--;
    if(index < 0) {
        index = songs.length -1;
    }
    loadSong(songs[index]);
    play();
}

function next() {
    index++;
    if(index > songs.length-1) {
        index = 0;
    }
    loadSong(songs[index]);
    play();
}

function updateProgress(e) {
    if(isPlaying) {
        let { currentTime, duration } = e.srcElement;
        const currentTimeMinutes = Math.floor(currentTime/60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if(currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        if(currentTimeSeconds) {
            currentTimeText.textContent = `${currentTimeMinutes}:${currentTimeSeconds}` ;
        }
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if(durationSeconds) {
            durationText.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        const progressPercent = (currentTime / duration) * 100 ;
        progress.style.width = `${progressPercent}%`;
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const x = e.offsetX;
    let { duration } = player;

    player.currentTime = (x/width) * duration;
}

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
player.addEventListener('timeupdate', updateProgress);
player.addEventListener('ended', next);
progressContainer.addEventListener('click', setProgressBar);

// On load
loadSong(songs[index]);

