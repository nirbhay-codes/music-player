const musicContainer = document.getElementById('music-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currTimeEl = document.getElementById('currTime');
const durTimeEl = document.getElementById('durTime');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 0;

// Initally load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar and the curr time and duration
function updateProgress(e) {
  //   console.log('e.srcElement: ', e.srcElement);
  //   console.log('this: ', this);
  //   console.log('e.srcElement.currentTime: ', e.srcElement.currentTime);
  //   console.log('e.srcElement.duration: ', e.srcElement.duration);
  //   console.log('this.currentTime: ', this.currentTime);
  //   console.log('this.duration: ', this.duration);

  //   Note: - This is the original way of getting the duration and currentTime. Here, doing 'e.srcElement' gives the element on which the event is called.
  //                - const { duration, currentTime } = e.srcElement;
  //         - Alternative way of getting the duration and currentTime from the 'this' object.
  //         - Remember that 'this' is the element (<audio> element) on which the event 'timeupdate' gets called.
  const duration = this.duration;
  const currentTime = this.currentTime;

  const progressPercent = (currentTime / duration) * 100;

  // Note: we can directly access the css class of the progress div class using 'style'
  // Update progress bar width
  progress.style.width = `${progressPercent}%`;

  // Set current time and duration elements
  console.log('currentTime: ', currentTime);
  console.log('duration: ', duration);

  // get duration min
  let durMin = Math.floor(duration / 60);

  // get duration secs
  let durSec = Math.floor(duration) % 60;
  if (durSec < 10) {
    durSec = `0${durSec}`;
  }

  // get currTime min
  let curMin = Math.floor(currentTime / 60);

  //get currTime secs
  let curSec = Math.floor(currentTime) % 60;
  if (curSec < 10) {
    curSec = `0${curSec}`;
  }

  // Wait for the time elements to be calculated to avoid NaN on screen.
  if (curMin >= 0 && durMin >= 0) {
    currTimeEl.innerText = `${curMin}:${curSec}`;
    durTimeEl.innerText = `${durMin}:${durSec}`;
  }
}

function setProgress(e) {
  //   Note: - 'this.clientWidth' is the total width of the progress-container div.
  //         - 'e.offsetX' is the point where the click was made on the progress-container div.
  console.log(this.clientWidth);
  console.log(e.offsetX);

  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  // * duration gives us the seconds into the song.
  const secIntoSong = (clickX / width) * duration;
  audio.currentTime = secIntoSong;
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update on pgogress bar
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends, play next
audio.addEventListener('ended', nextSong);

// Time duration calculation
// TODO
