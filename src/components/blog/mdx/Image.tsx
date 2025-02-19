import Image from "next/image";
import { ComponentProps } from "react";

type ImageComponentProps = ComponentProps<typeof Image> & {
  alt?: string;
  src?: string;
};

export const ImageComponent = ({
  alt,
  src,
  ...props
}: ImageComponentProps) => (
  <Image
    alt={alt || "Blog image"}
    src={src || ""}
    className="rounded-lg"
    width={800}
    height={400}
    {...props}
  />
);
ImageComponent.displayName = "ImageComponent";