export default function exitFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}
