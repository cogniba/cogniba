export default function enterFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement
      .requestFullscreen()
      .catch((err) =>
        console.error(
          `Error attempting to enter fullscreen mode: ${err.message}`,
        ),
      );
  }
}
