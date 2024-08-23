"use client";

import { useEffect } from "react";

export default function FullScreenProvider() {
  useEffect(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  }, []);

  return <></>;
}
