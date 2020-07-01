// Get elements
// Build functions
// Hook event listeners

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen__button");

function togglePlay() {
  // .play() or .pause() on video
  // another way to write it is: video[method](video.paused ? 'play': 'pause')
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset);
  video.currentTime += Number(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  //   console.log(this.name);
  //   console.log(this.value);
}

function handleProgress() {
  //   console.log(this);
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log(e);
  // where did he get offsetWidth on progress?
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullScreen() {
  console.log(video.requestFullscreen);
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("click", handleRangeUpdate));
// ranges.forEach((range) =>
//   range.addEventListener("mousemove", handleRangeUpdate)
// );

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
fullscreen.addEventListener("click", toggleFullScreen);
