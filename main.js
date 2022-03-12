

const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");
let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
const musics = [
    {
        id: 1,
        title: "Phai Chia Tay Thoi",
        file: "pctt.mp3",
        image: "https://i.pinimg.com/236x/51/9f/4c/519f4ce977dc0f9d17d49ea9c669eeac.jpg" 
    },
    {
        id: 2,
        title: "Em Luon O Trong Tam Tri Anh",
        file: "elottta.mp3",
        image: "https://png.pngtree.com/png-vector/20190121/ourlarge/pngtree-valentine-couple-one-continuous-line-art-drawing-vector-illustration-minimalism-style-png-image_437795.jpg" 
    },
    {
        id: 3,
        title: "Can Khong Co Co Khong Can", 
        file: "ckcckc.mp3",
        image: "https://anhdep.tv/attachments/2d4478c4fbfa44e69667fb4d375eeae5-jpeg.13690/" 
    }
]
let timer;
playRepeat.addEventListener("click", function() {
    if (isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute("style");
    }
    else {
        isRepeat = true;
        playRepeat.style.color = "#999";
    }
});
nextBtn.addEventListener("click", function() {
        changeSong(1);
} );
prevBtn.addEventListener("click", function() {
    changeSong(-1);
} );
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
    if (isRepeat) {
        // handle song
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
}
function changeSong(dir) {
    if(dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        // prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
    if (isPlaying) {
        song.play();
        playBtn.innerHTML = '<ion-icon name="pause-circle"></ion-icon>';
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    } else {
        song.pause();
        playBtn.innerHTML = '<ion-icon name="play"></ion-icon>';
        isPlaying = true;
        clearInterval(timer);
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number) {
    const minutes = Math.floor( number / 60 );
    const seconds = Math.floor ( number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes: minutes }:${seconds < 10 ? '0' + seconds: seconds}`;
}

rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
    song.currentTime = rangeBar.value;
}

function init(indexSong) {
    song.setAttribute("src", `./music/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);