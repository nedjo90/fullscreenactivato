let isFullScreen = false;

toggleFullscreenButton = document.getElementById("toggleFullscreenButton");
targetFullScreen = document.getElementById("item");
console.log("targetFullScreen :>> ", targetFullScreen);
toggleFullscreenButton.addEventListener("click", () => {
  if (!isFullScreen) {
    targetFullScreen.classList.add("fullscreen");
    document.documentElement.requestFullscreen();
  } else {
    targetFullScreen.classList.remove("fullscreen");
    document.exitFullscreen();
  }
  isFullScreen = !isFullScreen;
});
const video = document.getElementById("camera");
const quitButton = document.getElementById("quit");
toggleCameraButton = document.getElementById("toggleCameraButton");
toggleCameraButton.addEventListener("click", (e) => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        width: {
          min: screen.width,
        },
        height: {
          min: screen.height,
        },
      },
    })
    .then((stream) => {
      console.log(screen.width);
      console.log(screen.height);
      video.srcObject = stream;
      video.style.visibility = "visible";
      quitButton.style.visibility = "visible";
      document.documentElement.requestFullscreen();
    })
    .catch((error) => {
      console.log("error accessing the camera", error);
    });
});

// Gérer l'arrêt de la caméra avec "Quit"
quitButton.addEventListener("click", () => {
  const stream = video.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop()); // Arrêter la caméra
  video.srcObject = null;
  video.style.visibility = "hidden";
  quitButton.style.visibility = "hidden"; // Cacher le bouton
  document.exitFullscreen();
});
