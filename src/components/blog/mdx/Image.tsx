import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function ImageComponent(props: ImageProps) {
  const { src, alt } = props;

  if (typeof src !== "string") {
    return null;
  }

  return (
    <div className="my-8 overflow-hidden rounded-md">
      <Image
        src={src}
        alt={alt || ""}
        width={1200}
        height={630}
        className="object-cover"
      />
    </div>
  );
}
ImageComponent.displayName = "ImageComponent";
