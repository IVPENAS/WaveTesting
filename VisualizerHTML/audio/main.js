// Create a timeline plugin instance with custom options
/* const topTimeline = TimelinePlugin.create({
  height: 20,
  insertPosition: 'beforebegin',
  timeInterval: 0.2,
  primaryLabelInterval: 5,
  secondaryLabelInterval: 1,
  style: {
    fontSize: '20px',
    color: '#2D5B88',
  },
})

// Create a second timeline
const bottomTimline = TimelinePlugin.create({
  height: 10,
  timeInterval: 0.1,
  primaryLabelInterval: 1,
  style: {
    fontSize: '10px',
    color: '#6A3274',
  },
}) */

/* Wavesurfer Layout */
const audioTrack = WaveSurfer.create({
  container: '.audio',
  waveColor: '#eee',
  progressColor: 'red',
  url: '/audio.mp3',
  barWidth: 2,
  minPxPerSec: 100,
  /* plugins: [topTimeline, bottomTimline], */
  })

/* Display Waveform of Audio */
  audioTrack.load('audio.mp3')

/* Audio Settings */
const playBtn = document.querySelector(".play-btn");
const stopBtn = document.querySelector(".stop-btn");
const muteBtn = document.querySelector(".mute-btn");
const volumeSlider = document.querySelector(".volume-slider");
const forwardBtn = document.querySelector('.forward-btn')
const backBtn = document.querySelector('.back-btn')


/* Playing and Pause Condition */
playBtn.addEventListener("click", () => {
  audioTrack.playPause();
  
  if (audioTrack.isPlaying()){
    playBtn.classList.add("playing");
  } else {
    playBtn.classList.remove("playing");
  }
});

/* Stop Restart */
stopBtn.addEventListener("click", () => {
  audioTrack.stop();
  playBtn.classList.remove("playing");
});

/* Volume Settings */
volumeSlider.addEventListener("mouseup", () => {
  changeVolume(volumeSlider.value);
});

/* Setting Audio Intensity */
const changeVolume = (volume) => {
  if (volume == 0){
    muteBtn.classList.add("muted");
  } else {
    muteBtn.classList.remove("muted");
  }
  audioTrack.setVolume(volume);
};

/* Mute Condition */
muteBtn.addEventListener("click", () => {
  if (muteBtn.classList.contains("muted")){
    muteBtn.classList.remove("muted");
    audioTrack.setVolume(0.5);
    volumeSlider.value = 0.5;
  } else {
    audioTrack.setVolume(0);
    muteBtn.classList.add("muted");
    volumeSlider.value = 0;
  }
});

/* Forward 5s */
forwardBtn.addEventListener("click", () =>{
  audioTrack.skip(5);
});

backBtn.addEventListener("click", () =>{
  audioTrack.skip(-5);
});
