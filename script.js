const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const player = document.querySelector('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

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

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

// On load
loadSong(songs[index]);

