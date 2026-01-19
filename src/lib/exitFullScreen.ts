export default function exitFullScreen() {
  if (document.fullscreenElement) {
    void document.exitFullscreen();
  }
}
