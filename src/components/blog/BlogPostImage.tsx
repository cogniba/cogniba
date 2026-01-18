"use client";

import Image from "next/image";

type BlogPostImageProps = {
  src: string;
  alt: string;
}

export default function BlogPostImage({ src, alt }: BlogPostImageProps) {
  return (
    <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-md">
      <Image src={src} alt={alt} fill className="object-cover" priority />
    </div>
  );
}
