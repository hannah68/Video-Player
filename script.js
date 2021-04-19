const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const backward = document.getElementById('rwd');
const forward = document.getElementById('fwd');
const volumeslider = document.getElementById('volumeslider');
const volume = document.getElementById('volume');
const fullscreen = document.getElementById('fullscreen');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const circlePlayIcon = document.querySelector('.poster-icon');

// Play & pause video====================
function toggleVideoStatus() {
    if (video.paused) {
      video.play();
      circlePlayIcon.classList.add('hide');
    }else {
        video.pause();
    }
}
  
// update play/pause icon================
function updatePlayIcon() {
    if (video.paused) {
      play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
      play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}
  
  // Update progress & timestamp===================
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
  
    // Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
  
    // Get seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }
    timestamp.innerHTML = `${mins}:${secs}`;
}
  

// Set video time to progress=============
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}
  

// Stop video==========================
function stopVideo() {
    video.currentTime = 0;
    video.pause();
    circlePlayIcon.classList.remove('hide');
}


// video backward &forward ============
let intervalFwd;
let intervalRwd;

function videoBackward() {
    clearInterval(intervalFwd);
    forward.classList.remove('active');

    if(backward.classList.contains('active')) {
        backward.classList.remove('active');
        clearInterval(intervalRwd);
        video.play();
    } else {
        backward.classList.add('active');
        video.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function videoForward() {
    clearInterval(intervalRwd);
    backward.classList.remove('active');
  
    if(forward.classList.contains('active')) {
        forward.classList.remove('active');
      clearInterval(intervalFwd);
      video.play();
    } else {
      forward.classList.add('active');
      video.pause();
      intervalFwd = setInterval(windForward, 200);
    }
}

function windBackward() {
    if(video.currentTime <= 3) {
      backward.classList.remove('active');
      clearInterval(intervalRwd);
      stopVideo();
    } else {
      video.currentTime -= 3;
    }
}

function windForward() {
    if(video.currentTime >= video.duration - 3) {
      forward.classList.remove('active');
      clearInterval(intervalFwd);
      stopVideo();
    } else {
      video.currentTime += 3;
    }
}


// set volume=======================
function setVolume(){
    video.volume = volumeslider.value / 100;
}

function showVolumslider(){
    volumeslider.classList.toggle('show');
}

// show fullscreen=====================
function openFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
    }
}

// hide circle poster icon===============
function hideCircleIcon(){
    circlePlayIcon.classList.add('hide');
    video.play();
}

 
// Event listeners==================================
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('ended', stopVideo);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
  

forward.addEventListener('click',videoForward);
backward.addEventListener('click',videoBackward);

volumeslider.addEventListener('change',setVolume);
volumeslider.addEventListener('input',setVolume);
volume.addEventListener('click',showVolumslider);

fullscreen.addEventListener('click',openFullscreen);

circlePlayIcon.addEventListener('click',hideCircleIcon);
