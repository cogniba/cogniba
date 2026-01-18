export default function enterFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((error: unknown) => {
      if (error instanceof Error) {
        console.error(
          `Error attempting to enter fullscreen mode: ${error.message}`,
        );
      } else {
        console.error("Error attempting to enter fullscreen mode");
      }
    });
  }
}
