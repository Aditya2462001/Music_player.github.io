const song = document.querySelector('.song');
const playBtn = document.querySelector('.playBtn');
const nextBtn = document.querySelector('.nextBtn');
const prvBtn = document.querySelector('.prvBtn');

//   timing 
let total_duration = document.querySelector('.totalTime');
let current_time_duration = document.querySelector('.currentTimeChange');

let bar = document.querySelector('.pro');
let progress_bar = document.querySelector('.progress');


const img = document.querySelector('#songImg');

const song_name_title = document.querySelector('.songName');

const uList = document.querySelector('.UlList');


const songCrad = document.querySelector(".SongCard");



const images = [
    {
        id: 1,
        src: './images/afreen_afreen.jpg',
        songSrc: './Songs/Afreen Afreen .mp3',
        songName: 'Afreen Afreen - Album',
    },
    {
        id: 2,
        src: './images/bandiya.jpg',
        songSrc: './Songs/Bandeya.mp3',
        songName: 'Bandeya - Dil Juunglee',
    },
    {
        id: 3,
        src: './images/Believer.jpg',
        songSrc: './Songs/Believer .mp3',
        songName: 'Believer - Album',
    }, {
        id: 4,
        src: './images/Devak-Kalji-Re.jpg',
        songSrc: './Songs/Devak Kalji Re.mp3',
        songName: 'Devak Kalji Re',
    },
    {
        id: 5,
        src: './images/faded.jpg',
        songSrc: './Songs/Faded.mp3',
        songName: 'Faded - Album',
    },
    {
        id: 6,
        src: './images/ishq-di-baajiyaan.jpg',
        songSrc: './Songs/Ishq Di Baajiyaan.mp3',
        songName: 'Faded - Album',
    },
    {
        id: 7,
        src: './images/jab_tak.jpg',
        songSrc: './Songs/Jab Tak.mp3',
        songName: 'Jab Tak - M.S Dhoni',
    },
    {
        id: 8,
        src: './images/naino-ne-baandhi.jpg',
        songSrc: './Songs/Naino Ne Baandhi.mp3',
        songName: 'Naino Ne Baandhi -Gold',
    },
    {
        id: 9,
        src: './images/on-and-on.jpg',
        songSrc: './Songs/On_and_On.mp3',
        songName: 'On and On -Album',
    },
    {
        id: 10,
        src: './images/cardless.jpg',
        songSrc: './Songs/Sub_Urban_-_Cradles.mp3',
        songName: 'Sub Urban -Cradles -Album',
    },
    {
        id: 11,
        src: './images/Tajda-E-haram.jpg',
        songSrc: './Songs/Tajdar e Haram.mp3',
        songName: 'Tajdar E Haram -Album',
    },
   ];


function list() {
    let c = 1;
    for (let i = 0; i < images.length; i++) {
        const item_create = window.document.createElement('li');
        item_create.classList.add('item');
        item_create.textContent = images[i].songName;
        item_create.value = c;
        item_create.classList.add(`${c}`);
        item_create.classList.add(`item${c}`);
        c++;
        uList.appendChild(item_create);
    }
};
list();

const btnIcon = document.querySelector('#btnIcon');
let count = 0;


function PlaySong() 
{
    song.play();
    img.classList.add('songImg');
    btnIcon.classList.remove('fa-play');
    btnIcon.classList.add('fa-pause');
    songCrad.classList.add('color_play');
}
function PauseSong() {
    song.pause();
    img.classList.remove('songImg');
    btnIcon.classList.add('fa-play');
    btnIcon.classList.remove('fa-pause');
    songCrad.classList.remove('color_play');
}
playBtn.addEventListener("click",
    function () {
        if (btnIcon.classList.contains('fa-play')) {
            PlaySong();
        }
        else {
            PauseSong();
        }
    });
function loadSong(song_number) {
    // console.log(song_number);
    song_name_title.textContent = song_number.songName;
    song.src = song_number.songSrc;
    img.src = song_number.src;
    PlaySong();

}


function nextSong() {
    count= (count + 1) % images.length;
    loadSong(images[count]);
}

function prevSong() {
    count= (count - 1 + images.length) % images.length;
    loadSong(images[count]);
}

// song_handing

nextBtn.addEventListener('click', nextSong);
prvBtn.addEventListener('click', prevSong);



song.addEventListener("timeupdate", function (event) {
    // console.log(event);
    const { currentTime, duration } = event.srcElement;
    /// console.log(currentTime);
    // console.log(duration);

    let progress_time = (currentTime / duration) * 100;

    bar.style.width = `${progress_time}%`;

    //total duration

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    //  console.log(min_duration);
    //  console.log(sec_duration);

    if (duration) {
        if (sec_duration < 10) {
            total_duration.textContent = `${min_duration}:0${sec_duration}`;
        }
        else {
            total_duration.textContent = `${min_duration}:${sec_duration}`;
        }
    }

    //current duration
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if (currentTime) {
        if (sec_currentTime < 10) {
            current_time_duration.textContent = `${min_currentTime}:0${sec_currentTime}`;
        }
        else {
            current_time_duration.textContent = `${min_currentTime}:${sec_currentTime}`;
        }
    }

    // after ending the song next song will be automatically played

    if (min_duration == min_currentTime && sec_duration == sec_currentTime)
    {
        nextSong()
    }

});


progress_bar.addEventListener("click", function (event) {
    const { duration } = song
    //console.log(event);
    //console.log(event.offsetX );
    // console.log(event.srcElement.clientWidth);
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    // console.log(move_progress);
    // console.log(duration);
    song.currentTime = move_progress;
    PlaySong();
});



const items = document.querySelectorAll('.item');

items.forEach(function (a) {
    a.addEventListener('click', function () {

        let b = a.value;
        count = parseInt(b) - 1;
        song.src = images[count].songSrc;
        img.classList.add('songImg');
        img.src = images[count].src;
        song_name_title.textContent = images[count].songName;
        btnIcon.classList.remove('fa-play');
        btnIcon.classList.add('fa-pause');
        PlaySong();
    });
})



const bar_open = document.querySelector(".fa-bars");
const bar_close = document.querySelector('.fa-times');
const side_bar = document.querySelector(".Slide_bar");

bar_open.addEventListener("click", () => {
    side_bar.style.transition = "all 0.5s";
    side_bar.classList.remove("close_side_bar");

});
bar_close.addEventListener("click", () => {
    side_bar.classList.add("close_side_bar");

});

