import Image from "next/image";
import { ImgHTMLAttributes } from "react";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string;
};

export function ImageComponent(props: ImageProps) {
  return (
    <div className="my-8 overflow-hidden rounded-md">
      <Image
        src={props.src || ""}
        alt={props.alt || ""}
        width={1200}
        height={630}
        className="object-cover"
      />
    </div>
  );
}
ImageComponent.displayName = "ImageComponent";
