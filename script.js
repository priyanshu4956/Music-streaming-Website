
let SongEl1 = document.getElementById("songList1");
let SongEl2 = document.getElementById("songList2");
let SongEl3 = document.getElementById("songList3");
let SongEl4 = document.getElementById("songList4");
let SingerEl = document.querySelector(".singerList");
let LogIn = document.getElementById("logIn");
let SliderContainer = document.querySelector(".slider-container");
let LoginPage = document.querySelector(".Login-page");     
let Back = document.getElementById("back")   
let MusicList = document.getElementById("musicList");         

const singers = document.querySelectorAll(".singer"); 
const artistImg = document.getElementById("artist-img");
const artistRadio = document.querySelector(".artists-radio");
const artistName = document.getElementById("artistname");

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = new Audio();
    let currentSongSrc = "";
    let currentSongIndex = -1;
    const songs = document.querySelectorAll(".song");   
    const progressBar = document.querySelector(".progress");
    const progressContainer = document.querySelector(".progress-bar");
    const currentTimeEl = document.getElementById("currentTime");
    const durationEl = document.getElementById("duration");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const songImg = document.getElementById("song-img");
    const songTitleEl = document.getElementById("song-title");  // Added 
    const songSingerEl = document.getElementById("song-singer");// Added

    function loadSong(index) {
        if (index < 0 || index >= songs.length) return;
        currentSongIndex = index;
        const song = songs[index];
        const songSrc = song.getAttribute("data-src");
        const songTitle = song.getAttribute("data-title");
        const songPoster = song.getAttribute("data-img");
        const songSinger = song.getAttribute("data-singer"); // Added

        audioPlayer.src = songSrc;
        currentSongSrc = songSrc;
        songImg.src = songPoster;
        songTitleEl.textContent = songTitle;
        songSingerEl.textContent = songSinger;   //Added
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        audioPlayer.play();
    }

    songs.forEach((song, index) => {

        const button = song.querySelector(".play");    // Playing and pauseing Song
        button.addEventListener("click", function () {
            if (currentSongSrc !== song.getAttribute("data-src")) {
                loadSong(index);
            } else {
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    audioPlayer.pause();
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            }
        });

        const Heart = song.querySelector(".heart");   // LogIn Page on clicking like
        Heart.addEventListener("click", function () {
           LogIn.style.display = "block";
        });
    });
    
    window.addEventListener("click", (event) => {     // Login Page Closed on clicking outside
        if (event.target === LogIn) {
            LogIn.style.display = "none";
        }
    });



    playPauseBtn.addEventListener("click", function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            this.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioPlayer.pause();
            this.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    prevBtn.addEventListener("click", function () {
        loadSong(currentSongIndex - 1);
    });

    nextBtn.addEventListener("click", function () {
        loadSong(currentSongIndex + 1);
    });

    audioPlayer.addEventListener("timeupdate", function () {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;

        let currentMin = Math.floor(audioPlayer.currentTime / 60);
        let currentSec = Math.floor(audioPlayer.currentTime % 60);
        currentTimeEl.textContent = `${currentMin}:${currentSec < 10 ? "0" : ""}${currentSec}`;

        if (!isNaN(audioPlayer.duration)) {
            let totalMin = Math.floor(audioPlayer.duration / 60);
            let totalSec = Math.floor(audioPlayer.duration % 60);
            durationEl.textContent = `${totalMin}:${totalSec < 10 ? "0" : ""}${totalSec}`;
        }
    });

    progressContainer.addEventListener("click", function (e) {
        const clickX = e.offsetX;
        const width = this.clientWidth;
        audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
    });
});

singers.forEach((singer) => {
    const chutton = singer.querySelector(".singerImg");
    chutton.addEventListener("click", function () {
        const artistPoster = singer.getAttribute("data-picture");
        const artistNaming = singer.getAttribute("data-artist");

        artistImg.src = artistPoster;
        artistName.textContent = artistNaming;

        SongEl1.style.display = "none"
        SongEl2.style.display = "none"
        SongEl3.style.display = "none"
        SongEl4.style.display = "none"
        SingerEl.style.display = "none"
        LogIn.style.display = "none"
        LoginPage.style.display = "none"
        SliderContainer.style.display = "none"
        MusicList.style.display = "none"
        artistRadio.style.display="flex";

        document.getElementById("artistBack").style.display = "block"
    })
})


const musicList = document.querySelector(".music-list");

async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;     
    
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`);

    const data = await response.json();
    
    const musicList = document.getElementById('musicList');
    musicList.innerHTML = '';
    
    data.results.forEach(song => {
        const musicItem = document.createElement('div');
        musicItem.classList.add('music-item');
        musicItem.innerHTML = `
            <img src="${song.artworkUrl100}" alt="${song.trackName}">
            <p><strong>${song.trackName}</strong></p>
            <p>${song.artistName}</p>
            <audio controls>
                <source src="${song.previewUrl}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        musicList.appendChild(musicItem);

        const audio = musicItem.querySelector('audio');     // For play & pause
          audio.addEventListener('play', function() {
            const allAudios = document.querySelectorAll('audio');
            allAudios.forEach(a => {
              if (a !== audio) {
                a.pause();
              }
            });
          });
    });

    SongEl1.style.display = "none"
    SongEl2.style.display = "none"
    SongEl3.style.display = "none"
    SongEl4.style.display = "none"
    SingerEl.style.display = "none"
    SliderContainer.style.display = "none";
    musicList.style.display = "flex"

}


// Responsive Navbar
document.addEventListener("DOMContentLoaded", function () {
    const checkBtn = document.getElementById("check-btn");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");

    checkBtn.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });

    navItems.forEach(item => {
        item.addEventListener("click", function () {
            navLinks.classList.remove("show");
        });
    });;
})

function homes() {
    SongEl1.style.display = "block"
    SongEl2.style.display = "block"
    SongEl3.style.display = "block"
    SongEl4.style.display = "block"
    SingerEl.style.display = "block"
    LoginPage.style.display = "flex"
    LogIn.style.display = "none"
    artistRadio.style.display = "none"
    SliderContainer.style.display = "block"
    artistRadio.style.display = "none"
    SingerEl.style.marginTop = "30px"
    LoginPage.style.marginTop = "30px"
    Back.style.display = "none"
    MusicList.style.display = "none"

    document.getElementById("home").style.color = "#0fa190";
    // document.getElementById("discover").style.color = "black";
    document.getElementById("playlist").style.color = "black";
    document.getElementById("artist").style.color = "black";
    document.getElementById("login").style.color = "black";

    window.location.reload();
}

function playlists() {
    SongEl1.style.display = "block"
    SongEl2.style.display = "block"
    SongEl3.style.display = "block"
    SongEl4.style.display = "none"
    SingerEl.style.display = "none"
    SliderContainer.style.display = "none";
    artistRadio.style.display = "none"
    LoginPage.style.display = "none";
    MusicList.style.display = "none"
    SongEl1.style.marginTop = "130px";

    document.getElementById("home").style.color = "black";
    // document.getElementById("discover").style.color = "black";
    document.getElementById("playlist").style.color = "#0fa190";
    document.getElementById("artist").style.color = "black";
    document.getElementById("login").style.color = "black";
}

function artists() {
    SongEl1.style.display = "none"
    SongEl2.style.display = "none"
    SongEl3.style.display = "none"
    SongEl4.style.display = "none"
    LoginPage.style.display = "none"
    SliderContainer.style.display = "none"
    artistRadio.style.display = "none"
    MusicList.style.display = "none"
    SingerEl.style.display = "block"
    SingerEl.style.marginTop = "140px";
    SingerEl.style.flexDirection ="coloumn"

    document.getElementById("back").style.display = "block"

    document.getElementById("home").style.color = "black";
    // document.getElementById("discover").style.color = "black";
    document.getElementById("playlist").style.color = "black";
    document.getElementById("artist").style.color = "#0fa190";
    document.getElementById("login").style.color = "black";
}

function logins() {
    SongEl1.style.display = "none"
    SongEl2.style.display = "none"
    SongEl3.style.display = "none"
    SongEl4.style.display = "none"
    SingerEl.style.display = "none"
    SliderContainer.style.display = "none";
    artistRadio.style.display = "none"
    MusicList.style.display = "none"
    LoginPage.style.display = "flex";
    LoginPage.style.marginTop = "100px";

    document.getElementById("home").style.color = "black";
    // document.getElementById("discover").style.color = "black";
    document.getElementById("playlist").style.color = "black";
    document.getElementById("artist").style.color = "black";
    document.getElementById("login").style.color = "#0fa190";
}

// LogIn And SignUP
function toggleForm() {
    document.getElementById('login-container').classList.toggle('hidden');
    document.getElementById('signup-container').classList.toggle('hidden');
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Login successful!');
    window.location.reload();
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Signup successful!');
    window.location.reload();
});

// Login Page
function toggleForm2() {
    document.getElementById('login-container2').classList.toggle('hidden2');
    document.getElementById('signup-container2').classList.toggle('hidden2'); 
}

document.getElementById('login-form2').addEventListener('submit', function(event) {
    event.preventDefault();
    // alert('Login successful!');
    window.location.href = "welcome.html";
    // location.reload();
});

document.getElementById('signup-form2').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Signup successful!');
    window.location.reload();
});

// Cancel button
function closeLogin() {              
    document.getElementById("logIn").style.display = "none";
    const Forms = document.querySelectorAll(".form");
    Forms.forEach((form) => {
        form.reset();
    })
}

const imageContainer = document.getElementById("imageContainer");
        let scrollAmount = 0;
        const scrollStep = 220; // Adjust based on image width + gap
        let autoScrollInterval;

        function nextImage() {
            const maxScroll = imageContainer.scrollWidth - imageContainer.clientWidth;
            if (scrollAmount < maxScroll) {
                scrollAmount += scrollStep;
                imageContainer.style.transform = `translateX(-${scrollAmount}px)`;
            }
        }

        function prevImage() {
            if (scrollAmount > 0) {
                scrollAmount -= scrollStep;
                imageContainer.style.transform = `translateX(-${scrollAmount}px)`;
            }
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                nextImage();
                const maxScroll = imageContainer.scrollWidth - imageContainer.clientWidth;
                if (scrollAmount >= maxScroll) {
                    scrollAmount = 0; // Reset to start
                    imageContainer.style.transform = `translateX(0)`;
                }
            }, 3000); // Change every 3 seconds
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // Auto-scroll starts automatically
        startAutoScroll();

        // Pause auto-scroll on hover and resume on mouse leave
        // imageContainer.addEventListener("mouseenter", stopAutoScroll);
        // imageContainer.addEventListener("mouseleave", startAutoScroll);


// Menu Chart
let menuChart = document.getElementById("menuChart");
let shareOptions = document.getElementById("shareOptions");
let shareBtn = document.getElementById("shareBtn");
let activeButton = null;

document.addEventListener("click", function(event) {
    let target = event.target;

    if (target.classList.contains("dots")) {
        if (activeButton === target && menuChart.style.display === "flex") {
            menuChart.style.display = "none";
            shareOptions.style.display = "none";
            activeButton = null;
            return;
        }

        activeButton = target;

        let rect = target.getBoundingClientRect();

        // Temporarily display the menu to get its height
        menuChart.style.display = "flex";
        menuChart.style.visibility = "hidden"; // Hide it but allow measurement
        let menuHeight = menuChart.offsetHeight;
        menuChart.style.visibility = "visible"; // Show it after measuring

        let spaceBelow = window.innerHeight - rect.bottom;
        let spaceAbove = rect.top;

        let topPosition;
        if (spaceBelow >= menuHeight || spaceBelow > spaceAbove) {
            topPosition = rect.bottom + window.scrollY; // Below
        } else {
            topPosition = rect.top + window.scrollY - menuHeight; // Above
        }

        menuChart.style.top = `${topPosition}px`;
        menuChart.style.left = `${rect.left + window.scrollX}px`;

        event.stopPropagation();
    } 

    else if (target.id === "shareBtn") {
        let rect = target.getBoundingClientRect();
        let shareHeight;

        // Temporarily show to measure height
        shareOptions.style.display = "flex";
        shareOptions.style.visibility = "hidden";
        shareHeight = shareOptions.offsetHeight;
        shareOptions.style.visibility = "visible";

        let spaceBelow = window.innerHeight - rect.bottom;
        let spaceAbove = rect.top;

        let topPosition;
        if (spaceBelow >= shareHeight) {
            topPosition = rect.bottom + window.scrollY; // Below
        } else {
            topPosition = rect.top + window.scrollY - shareHeight; // Above
        }

        shareOptions.style.top = `${topPosition}px`;
        shareOptions.style.left = `${rect.left + window.scrollX}px`;

        event.stopPropagation();
    } 

    else {
        menuChart.style.display = "none";
        shareOptions.style.display = "none";
        activeButton = null;
    }
});

